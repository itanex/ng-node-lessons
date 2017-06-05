# Install instructions

After cloning be sure to run the following commands.
```BASH
 $ npm i
 $ bower i
```

# Data Validation

## Client Validation
Angular comes with a built in validation process that really only needs you to update your views. It is very extensible and there are plenty of alternatives if you need more controller or special behaviors.

The most important pieces to AngularJS validation is that you need a `<form>` element,  each `<input>` needs to have a `name` attribute and you need to disable browser HTML5 validation by using the `novalidate` attribute on the `<form>` element. The rest of the validation process relies on various other validation friendly directives.

```HTML
<form name="CarForm" novalidate>
    <div class="form-group">
        <label for="make">Make</label>
        <input type="text" class="form-control" 
            id="make" 
            name="AutoMake" 
            placeholder="Make" 
            ng-model="vm.auto.make" 
            ng-required="true">

        <p class="help-block text-danger" 
            ng-show="CarForm.AutoMake.$touched && CarForm.AutoMake.$error.required">
            Make is required</p>
    </div>
    <div class="form-group">
        <label for="model">Model</label>
        <input type="text" class="form-control" 
            id="model" 
            name="AutoModel" 
            placeholder="Model" 
            ng-model="vm.auto.model" 
            ng-required="true">
        
        <p class="help-block text-danger" 
            ng-show="CarForm.AutoModel.$touched && CarForm.AutoModel.$error.required">
            Model is required</p>
    </div>
    <div class="form-group">
        <label for="year">Year</label>
        <input type="text" class="form-control" 
            id="year" 
            name="AutoYear" 
            placeholder="Year" 
            ng-model="vm.auto.year"
            ng-required="true" 
            ng-pattern="/^\d+$/">
        
        <p class="help-block text-danger" 
            ng-show="CarForm.AutoYear.$touched && CarForm.AutoYear.$error.required">
            Year is required</p>
        <p class="help-block text-danger" 
            ng-show="CarForm.AutoYear.$touched && CarForm.AutoYear.$error.pattern">
            Year must be a number</p>
    </div>
        <button ng-click="vm.create()">Create</button>
        <button ng-click="vm.cancel()">Cancel</button>
</form>
```
Notice how the `<p>` tag is using the `ng-show` directive to check the validity conditions. The syntax for checking into each field is `{form.name}.{input.name}.{validationState+details}` and everything is case sensitive. Knowing that, to check a field in this form we start with `CarForm`, and to check the 'make' field using `AutoMake` and finally checking the required field using `$required` which is applied by AngularJS. 

> **DEMO** `CarForm.AutoMake.$required`

> **Documentation** Check the [AngularJS Documentation](https://docs.angularjs.org/api/ng/directive/input) for more of these 'magical' properties/methods

## Server Validation
Express has an extension library that we can leverage to validate our code. Simply install `express-validator`. It comes with it's own type definition `.d.ts` file so you won't need to install it yourself.
```BASH
npm install --save express-validator
```
And then install the validation system into our app

```Typescript
import * as express from 'express';
import expressValidator = require('express-validator');
// ...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));
// ...
```

### Define our object validation schema

For the auto object we need to make sure certain fields are as we expect. The validation system allows us to define everything down to the message based on the unacceptable field.
```Typescript
export let AutoValidationSchema: ExpressValidator.ValidationSchema = {
        'id': {
            optional: true,
            isInt: {
                errorMessage: '`id` is not a number'
            }
        },
        'make': {
            notEmpty: {
                errorMessage: '`make` cannot be empty'
            }
        },
        'model': {
            notEmpty: {
                errorMessage: '`make` cannot be empty'
            }
        },
        'year': {
            isInt: {
                errorMessage: '`year` is not a number'
            }
        },
    };
```

> **BEST PRACTICE** The model that will be received and sent over our endpoints should be defined.

### Implement Validation Request Handlers
We want to create a reusable method that handles the validation so we need to create a method that adheres to the `Express.RequestHandler` interface.

Our endpoints are RESTful so the proper response when a user has supplied data to the server and it does not adhere to what is expected, results in a status code of `400 - Bad Request` and should include information for the user to correct their mistakes.

If the result of our validation is good we will call the `next()` method to invoke the next middleware in the request pipeline.

```Typescript
export function ValidateAuto(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.checkBody(AutoValidationSchema);
    
    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors).end();
    }

    return next();
}
```
### Invoking the Validation handlers/middleware
Each route definition takes one mandatory string parameter and an indeterminate number of `RequestHandler` methods. These methods are invoked left to right in the order they are provided.

```Typescript
import * as express from 'express';

import * as Autos from '../data/auto.db';
import { ValidateAuto } from '../utitlities/auto.validator';
import { ValidateId } from '../utitlities/id.validator';

let router = express.Router();

// ...

router.get('/:id', ValidateId, (request, response) => {
    // ...
});
router.post('/', ValidateAuto, (request, response) => {
    // ...
});

router.put('/:id', ValidateId, ValidateAuto, (request, response) => {
    // ...
});

router.delete('/:id', ValidateId, (request, response) => {
    // ...
});

```
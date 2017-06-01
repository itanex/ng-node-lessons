# Install instructions

After cloning be sure to run the following commands.
```BASH
 $ npm i
 $ bower i
```

# Implement API with Full CRUD support

CRUD, **C**reate **R**ead **U**date **D**elete, is an acronym that is used to describe the full lifecycle interaction of a piece of data. When working with a RESTful API we will create endpoints that will support the specific needs of CRUD.

## Server CRUD
The server side of this CRUD API will leverage the built in features of Express to define the endpoints and all we need to do is wire the code up for performing the required actions on the data.

1. Create a folder called `API` at the root of your application. Here we will store all the endpoint definitions that deal with only performing API tasks.

2. We will need to import the express node module and establish the router object to build endpoints with.

```js
import * as express from 'express';

let router = express.Router();
```

3. Next we will create two endpoints that **READ** the data back to the user. The first serves as a `getAllRecords` and the second will provide `getById`.

```js
router.get('/', (request, response) => {
    ...
});

router.get('/:id', (request, response) => {
    ...
});
```

4. Now to **Create** new records in our data. We will use the HTTP Verb Post.

```js
router.post('/', (request, response) => {
    ...
});
```

5. Now to **Update** any record we currently have we will use the HTTP Verb Put.

```js
router.put('/:id', (request, response) => {
    ...
});
```

6. Finally, to **Delete** a specific record we will use the HTTP Verb Delete.

```js
router.put('/:id', (request, response) => {
    ...
});
```
7. And lastly we will export the router object

```js
export default router;
```

8. In the app.js file at the root of our NodeJS project we just need to import our new API and bring it online.

```js
...
import Autos from './api/auto.api';
...
app.use('/api/autos', Autos);
```

> **Reflection** Each part of CRUD has a corresponding HTTP Verb to be used. There is no need to make special URLs that represent actions. The REST approach says that each URL represents a collection or instance of a specific resource.

> **Note** The code in this lesson is lacking security features such as validation and authentication which would be leveraged to make sure that not just anyone could call our endpoints and modify our data.
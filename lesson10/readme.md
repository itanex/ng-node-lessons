# Install instructions

After cloning be sure to run the following commands.
```BASH
 $ npm i
 $ bower i
```

# Add Mongo DB support to store and retrieve data

## Mongo DB
This example uses [MLAB](https://mlab.com) as the location where data is stored. The functional difference between MLAB and hosting MongoDB locally is purely on version and connection URL.

An MLAB URL looks like `mongodb://<dbuser>:<dbpassword>@<assetId>.mlab.com:<port>/<database>` and a local URL looks like `mongodb://<dbuser>:<dbpassword>@localhost:<port>/<database>`

## NodeJS Modules
To use Mongo in NodeJS we need to bring a new package online.

```BASH
npm install --save mongoose bluebird
npm install --save-dev @types/mongoose @types/bluebird
```

**Mongoose** is the library for interacting with a mongoDB

**Bluebird** is a promise library, Mongoose is deprecating their promise library and Bluebird is one of the more commonly used NodeJS promise libraries.

## Establishing the Mongoose configuration
To access the database and prepare mongoose for our use we just need to establish a db config file and wire it into our application.

mongo.db.ts
```Typescript
import * as mongoose from 'mongoose';
import Bluebird = require("bluebird");

(<any>mongoose).Promise = Bluebird;

mongoose.connect('mongodb://admin:admin@ds028540.mlab.com:28540/ng-node-lessons');
```
app.jts
```Typescript

// Create the App
const app = express();

// Establish DB connection
require('./data/mongo.db');
```

## Establishing our DB Model
Mongo needs to have a few things to get things working for us.

1. Create an extended definition of the mongoose.Document with the model fields that are needed
```Typescript
export interface IAuto extends mongoose.Document {
    make: string;
    modelOfCar: string;
    year: number;
}
```
> **Note** Because the word `model` is part of `mongoose.Document` we must use another term in our definition.

2. Create a Schema definition to define how the object will be stored in the DB.
```Typescript
let autoSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    modelOfCar: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
});
```

3. Define the Object Model in Mongoose and establish all relationships

```Typescript
export let Auto = mongoose.model<IAuto>('Auto', autoSchema, 'autos');
```

## Calling the Mongo from the API route
`Mongoose.Document` added tons of functional aspects to our data model. We just need to import the `Auto` object from the model file and call various methods on it to upgrade our CRUD scenario.

```Typescript
import { Auto } from '../models/auto';
```

**Getting All Records**
> **READ** - Gets all the records from the database
```Typescript
Auto.find()
    .then(autos => {
        // Resolve success...
    });
```
**Getting Specific Record**
> **READ** - Gets the specific record from the database
```Typescript
Auto.findById(id)
    .then(auto => {
        // Resolve success...
    })
    .catch(reason => {
        // Resolve failure...
    });
```
**Creating a new record**
> **CREATE** - Creates and stores a new record in the database
```Typescript
let auto = new Auto(request.body);

auto.save()
    .then(auto => {
        // Resolve success...
    })
    .catch(reason => {
        // Resolve failure...
    });
```
**Updating a specific record**
> **UPDATE** - Updates the specified record in the database
```Typescript
let id = request.params.id;
let auto = new Auto(request.body);

auto._id = id;

Auto.findByIdAndUpdate(id, auto)
    .then(auto => {
        // Resolve success...
    })
    .catch(reason => {
        // Resolve failure...
    });
```
**Getting all records**
> **DELETE** - Removes/Deletes the specific record from the database
```Typescript
Auto.findByIdAndRemove(id)
    .then(() => {
        // Resolve success...
    })
    .catch(reason => {
        // Resolve failure...
    });
```
# Install instructions

After cloning be sure to run the following commands.
```BASH
 $ npm i
 $ bower i
```
Up until now we have been leveraging `lite-server` to run our projects. Now we will actually build out the actual server and give it the ability to do what we want instead.

# NodeJS Backend, Express scaffold
NodeJS is just the linguistic interpretation of JavaScript from the perspective of an operating system instead of a Web Browser. This means that the execution context is much different and infers a need to create a client and server architecture in our files. This architecture becomes very opinionated between developers and various scaffolding tools.

## Express Scaffold
This lesson leverages the Express scaffolding. To use it just install the npm package and run it.

```
$ npm install -g express-generator
$ express myapp
```

This command will generate all the files needed under a folder called `myapp`.

```
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade

7 directories, 9 files
```

By default, the generator uses the Jade view engine, and you can specify the specific view engine and other aspects to the application through various flags on the `express` command. The lesson used the command `express --view=ejs`.

> **Note** The `routes` folder was removed from the example as it is not part of this lesson.

The `public` folder is where we will move all our `src` folder contents. This folder is the convention location that is generated into the `app.js` file for the location of static files

> The exception to this move, is the `index.html` file which has become the `index.ejs` file..

```js
app.use(express.static(path.join(__dirname, 'public')));
```

The remaining folders are all related to the operation of our NodeJS application. Specifically `bin` which holds the configuration of the server interface to keep the `app.js` file a the root clean.

To run the application we just leverage the npm commands that have been set up for us.

```bash
npm start
```

Once started open your browser and point it to `http://localhost:3000` and the NodeJS server will answer and execute the catch all route.

```js
app.get('/*', function(req, res, next) {
    res.render('index');
});
```
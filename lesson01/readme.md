# Install instructions

After cloning be sure to run the following commands.
```BASH
 $ npm i
 $ bower i
```

# Basic Module and Databinding

## Create an Application module
Create a module to represent the application
```JavaScript
    angular
        // Create the App Module
        .module('app', [])
```
## Bind the application
Attach the application to the HTML node that will be the root of your application
```HTML
    <html ng-app="app">
```
## Create a controller and variables
Define a typescript class to a controller.
```TypeScript
    class ApplicationController {
        public message: string = 'Hello World';
        public name: string = 'Visitor';
    }
```
## Bind the controller
Attach the controrller to the HTML that it will govern.
```HTML
<body ng-controller="ApplicationController as vm">
```
## Bind variables using inline template and ng-model
Attach fields of the controller to the HTML to render out experiences.
```HTML
    <h1>{{vm.message}}</h1>

    <h2>Welcome {{vm.name}}</h2>
    <label>
        Enter your name: <input type="text" ng-model="vm.name">
    </label>
```
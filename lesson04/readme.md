# Install instructions

After cloning be sure to run the following commands.
```BASH
 $ npm i
 $ bower i
```

# Routing and Views
Routing and Views allow us to create a Single Application out of a single page request. This is called a **SPA** - **S**ingle **P**age **A**pplication. The benefit of a SPA is that we can reduce the amount of loading and rendering that a browser endures in a standard page request. This reduction in load and rendering gives the End User the feeling that your application is fast. Which it is!

## Routing
Routing is the system we will define the locations or "pages" that the user will experience. Each route in AngularJS is called a **State** and each state has various principles but ultimately the bare minimum is a URL path and a string of html to render.

```js
$stateProvider
    .state('Home', {
        url: '/',
        template: '<h1>Hello World</h1>'
    });
```

But most of the time we will be using controllers and external templates to render out our pages so we will commonly write the following. it includes the injectable name of the controller, the controller as syntax the view contains and the path to the view file to render.

```js
$stateProvider
    .state('Home', {
        url: '/',
        controller: 'HomeController',
        controllerAs: 'vm',
        templateUrl: 'js/views/home/home.html'
    });
```

## Views
While this seems like a complex topic, Views are just HTML files that are used to render content. They can contain anything that is needed for the controller to interact with the view or they can contain just static html content. 

```html
<h1>{{vm.message}}</h1>
```

> One thing that should be clear though. View files must not contain the HTML HEAD or BODY elements as they will cause rendering issues in your application.

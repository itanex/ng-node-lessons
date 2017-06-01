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

### Route presentation

Routing displays the path a user is at in the browsers address bar. By default, AngularJS displays its path as follows for the home route `http://example.com/#!/`. This is not a clean presentation and is ignored by search engines. We can enable a cleaner presentation and make our site search engine friendly with the following code added to our AngularJS module config method.

```js
$locationProvider.html5Mode({
    enabled: true
});
```

This fixes that minor issue, now what happens in our application when we want to render a Route that doesn't exist? We have a simple line of code to add to the same Config method that will keep users in the bounds of our application.

```js
$urlRouterProvider.otherwise('/');
```

## Views
While this seems like a complex topic, Views are just HTML files that are used to render content. They can contain anything that is needed for the controller to interact with the view or they can contain just static html content. 

```html
<h1>{{vm.message}}</h1>
```

> One thing that should be clear though. View files must not contain the HTML HEAD or BODY elements as they will cause rendering issues in your application.

### Where to render the view
The routing library includes a bunch of directives to use. We now need to tell our page where to render the view when it is requested. All we need to do is add the `<ui-view></ui-view>` element to the body of our index page.

```html
<body>
    <h1>Routing Lesson</h1>
    ...
    <ui-view></ui-view>
    ...
</body>
```

Now that the router knows where to render each view that is needed, we need an easy way to create links on our pages. The routing library provides us the directive `ui-sref` which will render out the proper path where ever it is used.

```html
<a ui-sref="Home">Home</a>
```

The benefit of using this directive is that you can change the URL property of the state and all your pages will adapt naturally to it. However, we still have the issue that if we change the name of the route we still need to change all that code. Well, keep the name clear.

> **TIP** Keeping a consistent naming convention for your routes will help keep your application resistant to errors.

> **TIP** Because many developers consider states to be similar to an objects, State names adhere to Pascal casing.

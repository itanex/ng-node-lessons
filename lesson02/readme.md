# Install instructions

After cloning be sure to run the following commands.
```BASH
 $ npm i
 $ bower i
```

# Modules, NG-Repeat and NG-Events 

## Listing Dependent Module
When creating a module to represent the application, you just include an array as the second parameter to the module method call. These do not have any specific order, but ordering this a bit will help you find the modules quickly.
```JavaScript
angular
    // Create the App Module
    .module('app', [
        /* Third Party Modules */
        'ngResource',

        /* Application Modules */
        'app.view'
    ])
```

## NG-Repeat
You are evetually going to need to print an array of something into your HTML in some manner. When you do there are plenty of things that you can do with `ng-repeat` but it is also slow when you start to throw large datasets against it.

The first part of the syntax is the identity you give the iterators item, what each loop references, in this case, each iteration refers to a single auto in the autos collection. What you name it is up to you. However, when working with collections they are the plural of the type of item it contains and each item is the singular of that item.

```html
<tr ng-repeat="auto in vm.autos">
  <td>{{auto.make}}</td>
  <td>{{auto.model}}</td>
  <td>{{auto.year}}</td>
</tr>
```
Eventually you need to filter the presentation in some way. This example shows filtering with a hard coded value.
```html
<tr ng-repeat="auto in vm.autos | filter: 'Dodge'">
  <td>{{auto.make}}</td>
  <td>{{auto.model}}</td>
  <td>{{auto.year}}</td>
</tr>
```
This example shows filtering with a field from your controller which allows you to bind that to a input field to allow the user to filter.
```html
<tr ng-repeat="auto in vm.autos | filter: vm.filter">
  <td>{{auto.make}}</td>
  <td>{{auto.model}}</td>
  <td>{{auto.year}}</td>
</tr>
```

## NG-Events

There are plenty of events that angular is aware of and there are many more you can add, such as touch events. Event handling is simply the process of saying `do this` process `when this event happens`.

Event Handling functions normally follow the following syntax because the method result does not go anywhere, nor does it get invoke later.

```Typescript
function eventHandler(...params...): void {
    // stuff to do 
}
```
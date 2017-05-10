# Install instructions

After cloning be sure to run the following commands.
```BASH
 $ npm i
 $ bower i
```

# LIFT, Explicit Angular, and Strongly Typed Typescript

## LIFT
[LIFT](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#application-structure-lift-principle) defines a way of sorting out each piece and file of an application so that it is easy to find code we need to work with.

**Before**
```
  /src
    /js
     app.ts
     view.ts
```
**After**
```
  /src
    /js
      /view
        view.controller.ts
        view.ts
     app.controller.ts
     app.ts
```

## Explicit Angular
Angular functions allow you to chain them to no end. This can get messy trying to read through long files so you should consider writing code in a readable way. Arguments against this can be resolved by using a build step that chains methods of contiguous lines.

**Before**
```TypeScript
namespace Lesson03.View {
    let module: ng.IModule = angular
        // Create the App.View Module
        .module('app.view', []);
        // Add the View Controller to the App.View Module
        .controller('ViewController', View.ViewController);
}
```
**After**
```TypeScript
namespace Lesson03.View {
    // Create the App.View Module
    let module: ng.IModule = angular.module('app.view', []);

    // Add the View Controller to the App.View Module
    module.controller('ViewController', View.ViewController);
}
```

## Strongly Typed Typescript
If you are using Typescript, it is reasonable to expect that all your code has a type other than Object and any. One of the purposes of using Typescript is the support around types. Leverage it as often as you can to help build the integrety of your code. Yes this does increase the file size, but your not serving typescript to a brower nor are you going to distribute the typescript node application.

**Before**
```TypeScript
namespace Lesson03.View {
    export class ViewController {
        public autoViews: Models.Auto[] = [];
        public autos: Models.Auto[] = [];

        constructor(
            $resource: ng.resource.IResourceService
        ) {
            this.autoResource = $resource('data/autos.json');

            this.autos = this.autoResource.query();
            this.autoViews = this.autos;
        }
    }
}
```
**After**
```TypeScript
namespace Lesson03.View {
    export class ViewController {
        private autoResource: ng.resource.IResourceClass<Models.Auto>;

        public autoViews: Models.Auto[] = [];
        public autos: Models.Auto[] = [];

        constructor(
            $resource: ng.resource.IResourceService
        ) {
            this.autoResource = $resource<Models.Auto>('data/autos.json');

            this.autos = this.autoResource.query();
            this.autoViews = this.autos;
        }
    }
}
```

# References
[John Papa AngularJS Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)
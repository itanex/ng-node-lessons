# Install instructions

After cloning be sure to run the following commands.
```BASH
 $ npm i
 $ bower i
```

# Angular to Node API endpoint, Services


## Client CRUD
The client side of an AngularJS will leverage AJAX to make these specific HTTP calls. There are several AngularJS Services that you can use, however, `$http` and `$resource` are the most commonly used. For this lesson we will use `$resource`.

1. Install the `angular-resource` library from bower

```bash
bower install --save angular-resource
```

2. Declare the module dependency for your app module

```js
angular.module('app', ['ngResource']);
```

3. Inject the `$resource` object into the service that will make the requests to the server.

```js
 class AutoService {        
    constructor($resource) {
        ...
    }
 }
```

4. Once we have the service being injected we need to set it up to get an object that reflects actions against the data we want to use.

```js
this.autoResource = $resource('/api/autos/:id', null, {
    'update': { method:'PUT' }
});
```
> $resource does not have a native update method. We have to create define it ourselves.

5. Now that everything is set up we can invoke the autoResource object that we created to perform the activities that we want.

```js

getAutos() {
    return this.autoResource.query();
}

getAuto(id) {
    return this.autoResource.get({id: id});
}

createAuto(auto) {
    return this.autoResource.save(auto);
}

updateAuto(auto) {
    this.autoResource['update']({id: auto.id}, auto);
}

deleteAuto(id) {
    this.autoResource.delete({id: id});
}
``` 


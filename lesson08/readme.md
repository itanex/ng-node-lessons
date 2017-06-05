# Install instructions

After cloning be sure to run the following commands.
```BASH
 $ npm i
 $ bower i
```

# Edit and Create Forms

## Create Record View
1. Add a new HTML file called `create.record.html`
```html
<ul>
    <li>
        Make: <input type="text" ng-model="vm.auto.make">
    </li>
    <li>
        Model: <input type="text" ng-model="vm.auto.model">
    </li>
    <li>
        Year: <input type="text" ng-model="vm.auto.year">
    </li>
    <li>
        <button ng-click="vm.create()">Create</button>
        <button ng-click="vm.cancel()">Cancel</button>
    </li>
</ul>
```
2. Add a new Typescript file called `create.controller.ts`
```Typescript
export class CreateRecordController {
    public auto: Models.Auto;

    constructor(
        private $state: ng.ui.IStateService,
        $stateParams: ng.ui.IStateParamsService,
        private AutoService: Lesson08.Services.AutoService
    ) {
        let id = $stateParams['id'];

        this.auto = this.AutoService.getAuto(id);
    }

    // event handlers

    public create(): void {
        this.AutoService.createAuto(this.auto);
        this.$state.go('Auto');
    }

    public cancel(): void {
        this.$state.go('AutoRecord', { id: this.auto.id });
    }
}
```
3. Update `auto.ts` with the angular controller binding
```Typescript
    module.controller('AutoController', Auto.AutoController);
>   module.controller('CreateRecordController', Auto.CreateRecordController);
    module.controller('RecordController', Auto.RecordController);
```
4. Add a new route to `auto.config.ts`
```Typescript
$stateProvider
    // ...
    .state('AutoCreate', <ng.ui.IState>{
        url: '/auto/create',
        controller: 'CreateRecordController',
        controllerAs: 'vm',
        templateUrl: 'js/view/auto/create.record.html',
        data: {
            requiresAuthentication: true
        }
    })
```

## Edit Record View
1. Add a new HTML file called `edit.record.html`
```html
<ul>
    <li>
        Make: <input type="text" ng-model="vm.auto.make">
    </li>
    <li>
        Model: <input type="text" ng-model="vm.auto.model">
    </li>
    <li>
        Year: <input type="text" ng-model="vm.auto.year">
    </li>
    <li>
        <button ng-click="vm.create()">Create</button>
        <button ng-click="vm.cancel()">Cancel</button>
    </li>
</ul>
```
2. Add a new Typescript file called `edit.controller.ts`
```Typescript
export class EditRecordController {
    public auto: Models.Auto;

    constructor(
        private $state: ng.ui.IStateService,
        $stateParams: ng.ui.IStateParamsService,
        private AutoService: Lesson08.Services.AutoService
    ) {
        let id = $stateParams['id'];

        this.auto = this.AutoService.getAuto(id);
    }

    // event handlers

    public update(): void {
        this.AutoService.updateAuto(this.auto);
        this.$state.go('AutoRecord', { id: this.auto.id });
    }

    public cancel(): void {
        this.$state.go('AutoRecord', { id: this.auto.id });
    }
}
```
3. Update `auto.ts` with the angular controller binding
```Typescript
    module.controller('AutoController', Auto.AutoController);
    module.controller('CreateRecordController', Auto.CreateRecordController);
>   module.controller('EditRecordController', Auto.EditRecordController);
    module.controller('RecordController', Auto.RecordController);
```
4. Add a new route to `auto.config.ts`
```Typescript
$stateProvider
    // ...
    .state('AutoEdit', <ng.ui.IState>{
        url: '/auto/edit/:id',
        controller: 'EditRecordController',
        controllerAs: 'vm',
        templateUrl: 'js/view/auto/edit.record.html',
        data: {
            requiresAuthentication: true
        }
    })
```

## Server side *MOCK* Database
Create a folder called data which is where we will put objects and functionality related to direct or indirect database work.

Remove all the hard coded data from the `auto.api.ts` file and move it into a file in data called `auto.db.ts`.

Finally we will want to create and fill out methods to call as if we were calling into a database. 

```Typescript
export function getAll(): any[] {
    // ...
}
export function getById(id: number): any {
    // ...
}

export function addAuto(auto: any): any {
    // ...
}

export function updateAuto(id: number, auto: any): boolean {
    // ...
}

export function deleteAuto(id: number): boolean {
    // ...
}
```
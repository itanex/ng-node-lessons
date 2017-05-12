namespace Lesson06 {
    // Create the App Module
    let module: ng.IModule = angular.module('app', [
        /* Third Party Modules */
        'ngResource',
        'ui.router',
        'ui.router.state.events',

        /* Application Modules */
        'app.view'
    ]);

    module.config(Lesson06.Configuration);

    module.service('AccountService', Lesson06.Services.AccountService);

    module.run(Lesson06.Run);
}
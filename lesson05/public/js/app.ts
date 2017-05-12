namespace Lesson05 {
    // Create the App Module
    let module: ng.IModule = angular.module('app', [
        /* Third Party Modules */
        'ngResource',
        'ui.router',
        'ui.router.state.events',

        /* Application Modules */
        'app.view'
    ]);

    module.config(Lesson05.Configuration);

    module.service('AccountService', Lesson05.Services.AccountService);

    module.run(Lesson05.Run);
}
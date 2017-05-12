namespace Lesson08 {
    // Create the App Module
    let module: ng.IModule = angular.module('app', [
        /* Third Party Modules */
        'ngResource',
        'ui.router',
        'ui.router.state.events',

        /* Application Modules */
        'app.view'
    ]);

    module.config(Lesson08.Configuration);

    module.service('AccountService', Lesson08.Services.AccountService);
    module.service('AutoService', Lesson08.Services.AutoService);

    module.run(Lesson08.Run);
}
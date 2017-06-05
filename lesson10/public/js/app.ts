namespace Lesson10 {
    // Create the App Module
    let module: ng.IModule = angular.module('app', [
        /* Third Party Modules */
        'ngResource',
        'ui.router',
        'ui.router.state.events',

        /* Application Modules */
        'app.view'
    ]);

    module.config(Lesson10.Configuration);

    module.service('AccountService', Lesson10.Services.AccountService);
    module.service('AutoService', Lesson10.Services.AutoService);

    module.run(Lesson10.Run);
}
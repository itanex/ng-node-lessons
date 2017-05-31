namespace Lesson09 {
    // Create the App Module
    let module: ng.IModule = angular.module('app', [
        /* Third Party Modules */
        'ngResource',
        'ui.router',
        'ui.router.state.events',

        /* Application Modules */
        'app.view'
    ]);

    module.config(Lesson09.Configuration);

    module.service('AccountService', Lesson09.Services.AccountService);
    module.service('AutoService', Lesson09.Services.AutoService);

    module.run(Lesson09.Run);
}
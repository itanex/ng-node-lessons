namespace Lesson11 {
    // Create the App Module
    let module: ng.IModule = angular.module('app', [
        /* Third Party Modules */
        'ngResource',
        'ui.router',
        'ui.router.state.events',

        /* Application Modules */
        'app.view'
    ]);

    module.config(Lesson11.Configuration);

    module.service('AccountService', Lesson11.Services.AccountService);
    module.service('AutoService', Lesson11.Services.AutoService);

    module.controller('ApplicationController', Lesson11.ApplicationController);

    module.run(Lesson11.Run);
}
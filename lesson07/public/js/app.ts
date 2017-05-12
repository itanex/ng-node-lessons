namespace Lesson07 {
    // Create the App Module
    let module: ng.IModule = angular.module('app', [
        /* Third Party Modules */
        'ngResource',
        'ui.router',
        'ui.router.state.events',

        /* Application Modules */
        'app.view'
    ]);

    module.config(Lesson07.Configuration);

    module.service('AccountService', Lesson07.Services.AccountService);
    module.service('AutoService', Lesson07.Services.AutoService);

    module.run(Lesson07.Run);
}
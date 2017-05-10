namespace Lesson03 {
    // Create the App Module
    let module: ng.IModule = angular.module('app', [
        /* Third Party Modules */
        'ngResource',

        /* Application Modules */
        'app.view'
    ]);

    // Add the Application Controller to the App Module
    module.controller('ApplicationController', Lesson03.ApplicationController);
}
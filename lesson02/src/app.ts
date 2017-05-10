namespace Lesson02 {
    class ApplicationController {

    }

    angular
        // Create the App Module
        .module('app', [
            /* Third Party Modules */
            'ngResource',

            /* Application Modules */
            'app.view'
        ])
        // Add the Application Controller to the App Module
        .controller('ApplicationController', ApplicationController);
}
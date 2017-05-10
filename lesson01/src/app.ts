namespace Lesson01 {
    class ApplicationController {
        public message: string = 'Hello World';
        public name: string = 'Visitor';
    }

    angular
        // Create the App Module
        .module('app', [])
        // Add the Application Controller to the App Module
        .controller('ApplicationController', ApplicationController);
}
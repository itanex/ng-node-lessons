namespace Lesson04.View.Home {
    // Create the view.home Module
    let module: ng.IModule = angular.module('view.home', []);

    // Define a Configuration for this module
    module.config(Home.Configuration);

    // Establish the HomeController for this module
    module.controller('HomeController', Home.HomeController);
}
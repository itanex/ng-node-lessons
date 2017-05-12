namespace Lesson05.View.Home {
    // Create the view.home Module
    let module: ng.IModule = angular.module('view.home', []);

    // Define a Configuration for this module
    module.config(Home.Configuration);

    module.controller('HomeController', Home.HomeController);
}
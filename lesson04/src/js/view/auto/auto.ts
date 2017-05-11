namespace Lesson04.View.Auto {
    // Create the view.about Module
    let module: ng.IModule = angular.module('view.auto', []);

    // Define a Configuration for this module
    module.config(Auto.Configuration);

    // Establish the AboutController for this module
    module.controller('AutoController', Auto.AutoController);
}
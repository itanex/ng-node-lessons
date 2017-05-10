namespace Lesson03.View {
    // Create the App.View Module
    let module: ng.IModule = angular.module('app.view', []);

    // Add the View Controller to the App.View Module
    module.controller('ViewController', View.ViewController);
}
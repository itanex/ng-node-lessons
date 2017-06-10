namespace Lesson11.View {
    // Create the App.View Module
    let module: ng.IModule = angular.module('app.view', [
        'view.home',
        'view.auto',
        'view.account'
    ]);
}
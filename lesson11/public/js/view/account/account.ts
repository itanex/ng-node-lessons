namespace Lesson11.Views.Account {
    let module: ng.IModule = angular.module('view.account', []);

    module.config(Account.Configuration);
    
    module.controller('LoginController', Account.LoginController);
    module.controller('RegistrationController', Account.RegistrationController);
}
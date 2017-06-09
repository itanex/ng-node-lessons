namespace Lesson11.Views.Account {
    let module: ng.IModule = angular.module('account.view', []);

    module.config(Account.Configuration);
    
    module.controller('LoginController', Account.LoginController);
    module.controller('RegistrationController', Account.RegistrationController);
}
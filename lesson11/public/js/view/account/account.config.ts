namespace Lesson11.Views.Account {
    Configuration.$inject = [
        '$stateProvider'
    ];

    export function Configuration(
        $stateProvider: ng.ui.IStateProvider
    ) {
        $stateProvider
            .state('Register', <ng.ui.IState>{
                url: '/register',
                templateUrl: 'js/views/account/register.html',
                controller: 'RegistrationController',
                controllerAs: 'vm'
            })
            .state('Login', <ng.ui.IState>{
                url: '/login',
                templateUrl: 'js/views/account/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            });
    }
}
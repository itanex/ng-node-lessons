namespace Lesson10.View.Home {
    export function Configuration(
        $stateProvider: ng.ui.IStateProvider
    ) {
        $stateProvider
            .state('Home', <ng.ui.IState>{
                url: '/',
                controller: 'HomeController',
                controllerAs: 'vm',
                templateUrl: 'js/view/home/home.html'
            });
    }
}
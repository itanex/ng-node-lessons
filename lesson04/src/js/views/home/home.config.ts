namespace Lesson04.View.Home {
    export function Configuration(
        $stateProvider: ng.ui.IStateProvider
    ) {
        $stateProvider
            .state('Home', <ng.ui.IState>{
                url: '/',
                controller: 'HomeController',
                controllerAs: 'vm',
                templateUrl: 'js/views/home/home.html'
            });
    }
}
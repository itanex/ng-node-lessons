namespace Lesson07.View.Auto {
    export function Configuration(
        $stateProvider: ng.ui.IStateProvider
    ) {
        $stateProvider
            .state('Auto', <ng.ui.IState>{
                url: '/auto',
                controller: 'AutoController',
                controllerAs: 'vm',
                templateUrl: 'js/view/auto/auto.html',
                data: {
                    requiresAuthentication: true
                }
            })
            .state('AutoRecord', <ng.ui.IState>{
                url: '/auto/:id',
                controller: 'RecordController',
                controllerAs: 'vm',
                templateUrl: 'js/view/auto/auto.record.html',
                data: {
                    requiresAuthentication: true
                }
            });
    }
}
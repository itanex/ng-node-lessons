namespace Lesson08 {
    export function Run(
        $rootScope: ng.IRootScopeService,
        $state: ng.ui.IStateService,
        AccountService: Lesson08.Services.AccountService
    ) {
        $rootScope.$on('$stateChangeStart', (e, to) => {
            // protect non-public views
            if (to.data && to.data.requiresAuthentication) {
                if (!AccountService.isLoggedIn()) {
                    e.preventDefault();
                    $state.go('Home');
                }
            }
        });
    }
}
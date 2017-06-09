namespace Lesson11 {
    export function Run(
        $rootScope: ng.IRootScopeService,
        $state: ng.ui.IStateService,
        AccountService: Lesson11.Services.AccountService
    ) {
        $rootScope.$on('$stateChangeStart', (e, to) => {
            // protect non-public views
            if (to.data && to.data.requiresAuthentication) {
                if (!AccountService.isAuthenticated) {
                    e.preventDefault();
                    $state.go('Home');
                }
            }
        });
    }
}
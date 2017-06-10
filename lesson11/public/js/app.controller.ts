namespace Lesson11 {
    export class ApplicationController {
        public get isAuthenticated():boolean {
            return this.AccountService.isAuthenticated;
        }

        static $inject = [
            '$state',
            'AccountService'
        ];

        constructor(
            private $state: ng.ui.IStateService,
            private AccountService: Services.AccountService
        ) {

        }

        public logout(): void {
            this.AccountService.logout();
            this.$state.go('Home');
        }
    }
}
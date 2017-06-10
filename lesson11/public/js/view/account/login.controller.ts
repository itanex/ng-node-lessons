namespace Lesson11.Views.Account {
    export class LoginController {
        public user: Models.LoginUser;

        static $inject = [
            '$state',
            'AccountService'
        ];

        constructor(
            private $state: ng.ui.IStateService,
            private AccountService: Services.AccountService
        ) {

        }

        public login(): void {
            this.AccountService.login(this.user)
                .then((result) => {
                    if (result) {
                        this.$state.go('Auto');
                    }
                });
        }
    }
}
namespace Lesson11.Views.Account {
    export class RegistrationController {
        public user: Models.RegisterUser;

        static $inject = [
            '$state',
            'AccountService'
        ];

        constructor(
            private $state: ng.ui.IStateService,
            private AccountService: Services.AccountService
        ) {

        }

        public register(): void {
            this.AccountService.register(this.user)
                .then(()=>{
                    this.$state.go('Login');
                });
        }
    }
}
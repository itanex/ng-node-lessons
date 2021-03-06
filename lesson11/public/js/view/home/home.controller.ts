namespace Lesson11.View.Home {
    export class HomeController {
        public message: string = 'Hello World!';

        constructor(
            private AccountService: Lesson11.Services.AccountService
        ) {

        }

        public isLoggedIn(): boolean {
            return this.AccountService.isAuthenticated;
        }

        // event handlers
    }
}
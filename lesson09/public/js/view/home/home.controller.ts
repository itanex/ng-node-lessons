namespace Lesson09.View.Home {
    export class HomeController {
        public message: string = 'Hello World!';

        constructor(
            private AccountService: Lesson09.Services.AccountService
        ) {

        }

        public isLoggedIn(): boolean {
            return this.AccountService.isLoggedIn();
        }

        // event handlers

        public logUserIn(): void {
            this.AccountService.logUserIn();
        }

        public logUserOut(): void {
            this.AccountService.logUserOut();
        }
    }
}
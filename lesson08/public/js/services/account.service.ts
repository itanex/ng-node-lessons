namespace Lesson08.Services {
    export class AccountService {
        private isUserLoggedIn: boolean = false;

        public isLoggedIn(): boolean {
            return this.isUserLoggedIn;
        }

        public logUserIn(): void {
            this.isUserLoggedIn = true;
        }

        public logUserOut(): void {
            this.isUserLoggedIn = false;
        }
    }
}
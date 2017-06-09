namespace Lesson11.Services {
    export class AccountService {
        public get isAuthenticated(): boolean {
            return this.getItem<boolean>('authenticated') || false;
        }

        public get user(): Models.User {
            return this.getItem<Models.User>('user') || null;
        }

        public get AuthenticationToken(): string {
            return this.getItem<string>('authtoken') || '';
        }

        private getItem<T>(key: string): T {
            return JSON.parse(this.$window.sessionStorage.getItem(key));
        }

        private setItem(key: string, data: any): void {
            this.$window.sessionStorage.setItem(key, JSON.stringify(data));
        }

        private initializeSession() {
            this.setItem('user', new Models.User());
            this.setItem('authtoken', null);
            this.setItem('authenticated', false);
        }

        static $inject = [
            '$http',
            '$window'
        ];

        constructor(
            private $http: ng.IHttpService,
            private $window: ng.IWindowService
        ) {
            this.setItem('authenticated', false);
        }

        public logout(): void {
            this.initializeSession();
            this.$http.post('/api/users/logout', null);
        }

        public loginUser(user: Models.LoginUser): ng.IPromise<boolean> {
            return this.$http.post<any>('/api/users/login', user)
                .then((result) => {
                    if (result.status === 200) {
                        let user = new Models.User();
                        user.username = result.data.username;
                        user.email = result.data.email;

                        this.setItem('user', user);
                        this.setItem('authtoken', result.data.token);
                        this.setItem('authenticated', true);

                        return true;

                    }
                    return false;
                })
                .catch(() => {
                    return false;
                });
        }

        public registerUser(user: Models.RegisterUser): ng.IPromise<boolean> {
            return this.$http.post('/api/users/register', user)
                .then((result) => {
                    return true;
                })
                .catch(() => {
                    return false;
                });
        }
    }
}
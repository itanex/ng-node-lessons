namespace Lesson11.Services {
    export class TestService {
        public result: boolean = false;

        static $inject = [
            '$http',
            'AccountService'
        ];

        constructor(
            private $http: ng.IHttpService,
            private AccountService: Services.AccountService
        ) {

        }

        public testEndpoint(): ng.IPromise<boolean> {
            return this.$http.get('/api/profile', {
                headers: {
                    "Authorization": `Bearer ${this.AccountService.AuthenticationToken}`
                }
            })
	        .then(() => {
	            return true;
	        })
	        .catch(() => {
	            return false;
	        });
        }
    }
}
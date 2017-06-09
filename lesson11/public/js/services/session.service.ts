namespace Lesson11.Services {
    export class SessionService {
        public get length(): number {
            return this.$window.sessionStorage.length;
        }

        static $inject = [
            '$window'
        ];

        constructor(
            private $window: ng.IWindowService
        ) {

        }
        
        /**
         * Set Specific Value in Session Storage
         * @param key string identity of element to set
         * @param data data to store in element being set
         */
        public setItem(key: string, data: any): void {
            this.$window.sessionStorage.setItem(key, JSON.stringify(data));
        }

        /**
         * Get Specific Value from Session Storage
         * @param key string identity of element to return
         */
        public getItem<T>(key: string): T {
            return JSON.parse(this.$window.sessionStorage.getItem(key));
        }
        
        /**
         * Remove specific item from Session Storage
         * @param key string identity of element to remove from Session Storage
         */
        public removeItem(key: string): void {
            this.$window.sessionStorage.removeItem(key);
        }

        /**
         * Remove all content from Session Storage
         */
        public clear(): void {
            this.$window.sessionStorage.clear();
        }
    }
}
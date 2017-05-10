namespace Lesson02.View {
    class ViewController {
        public autoViews: any = [];
        public autos: any = [];
        public filter: string = '';
        public message: string = 'Hello World'

        constructor(
            $resource: ng.resource.IResourceService
        ) {
            let autoResource = $resource('data/autos.json');

            this.autos = autoResource.query();
            this.autoViews = this.autos;
        }

        // event handlers

        /**
         * Filter Method to bind to filter control
         */
        public filterAutos(): void {
            this.autoViews = this.autos.filter((item) => {
                return item.make.includes(this.filter);
            })
        }

        /**
         * Bindable input method to log something to the console
         */
        public showIndex(index: number): void {
            console.log(`The index is: ${index}`);
        }
    }

    angular
        // Create the App.View Module
        .module('app.view', [])
        // Add the View Controller to the App.View Module
        .controller('ViewController', ViewController);
}
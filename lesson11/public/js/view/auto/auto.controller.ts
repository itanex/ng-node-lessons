namespace Lesson11.View.Auto {
    export class AutoController {
        public filter: string = '';
        public message: string = 'Hello World';

        public autoViews: Models.Auto[] = [];
        public autos: Models.Auto[] = [];

        constructor(
            private AutoService: Lesson11.Services.AutoService
        ) {
            this.autos = this.AutoService.getAutos();
            this.autoViews = this.autos;
        }

        // event handlers

        /**
         * Filter Method to bind to filter control
         */
        public filterAutos(): void {
            this.autoViews = this.autos.filter((item: Models.Auto): boolean => {
                return item.make.indexOf(this.filter) > -1;
            })
        }
    }
}
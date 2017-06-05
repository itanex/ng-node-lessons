namespace Lesson08.View.Auto {
    export class CreateRecordController {
        public auto = new Models.Auto();

        constructor(
            private $state: ng.ui.IStateService,
            private AutoService: Lesson08.Services.AutoService
        ) {
        }

        // event handlers

        public create(): void {
            this.AutoService.createAuto(this.auto);
            this.$state.go('Auto');
        }

        public cancel(): void {
            this.$state.go('Auto');
        }
    }
}
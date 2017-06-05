namespace Lesson08.View.Auto {
    export class CreateRecordController {
        public auto: Models.Auto;

        constructor(
            private $state: ng.ui.IStateService,
            $stateParams: ng.ui.IStateParamsService,
            private AutoService: Lesson08.Services.AutoService
        ) {
            let id = $stateParams['id'];

            this.auto = this.AutoService.getAuto(id);
        }

        // event handlers

        public create(): void {
            this.AutoService.createAuto(this.auto);
            this.$state.go('Auto');
        }

        public cancel(): void {
            this.$state.go('AutoRecord', { id: this.auto.id });
        }
    }
}
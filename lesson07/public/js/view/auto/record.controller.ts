namespace Lesson07.View.Auto {
    export class RecordController {
        
        public auto: Models.Auto;

        constructor(
            private $state: ng.ui.IStateService,
            $stateParams: ng.ui.IStateParamsService,
            private AutoService: Lesson07.Services.AutoService
        ) {
            this.auto = this.AutoService.getAuto($stateParams['id']);
        }

        // event handlers

        public deleteAuto(id: number): void {
            this.AutoService.deleteAuto(id);

            this.$state.go('Auto');
        }
    }
}
namespace Lesson11.View.Auto {
    export class EditRecordController {
        public auto: Models.Auto;

        private _isCreate: boolean = true;
        public get isCreate(): boolean {
            return this._isCreate;
        }

        constructor(
            private $state: ng.ui.IStateService,
            $stateParams: ng.ui.IStateParamsService,
            private AutoService: Lesson11.Services.AutoService
        ) {
            let id = $stateParams['id'];

            if (id) {
                this._isCreate = false;
                this.auto = this.AutoService.getAuto(id);
            }
        }

        // event handlers

        public create(): void {
            this.AutoService.createAuto(this.auto);
            this.$state.go('Auto');
        }

        public update(): void {
            this.AutoService.updateAuto(this.auto);
            this.$state.go('AutoRecord', { id: this.auto._id });
        }

        public cancel(): void {
            this.$state.go('AutoRecord', { id: this.auto._id });
        }
    }
}
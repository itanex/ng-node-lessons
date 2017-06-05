namespace Lesson09.View.Auto {
    // Crea
    let module: ng.IModule = angular.module('view.auto', []);

    module.config(Auto.Configuration);

    module.controller('AutoController', Auto.AutoController);
    module.controller('CreateRecordController', Auto.CreateRecordController);
    module.controller('EditRecordController', Auto.EditRecordController);
    module.controller('RecordController', Auto.RecordController);
}
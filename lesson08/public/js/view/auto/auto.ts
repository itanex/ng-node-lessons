namespace Lesson08.View.Auto {
    // Crea
    let module: ng.IModule = angular.module('view.auto', []);

    module.config(Auto.Configuration);

    module.controller('AutoController', Auto.AutoController);
    module.controller('EditRecordController', Auto.EditRecordController);
    module.controller('RecordController', Auto.RecordController);
}
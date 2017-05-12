namespace Lesson07.View.Auto {
    // Crea
    let module: ng.IModule = angular.module('view.auto', []);

    module.config(Auto.Configuration);

    module.controller('AutoController', Auto.AutoController);
    module.controller('RecordController', Auto.RecordController);
}
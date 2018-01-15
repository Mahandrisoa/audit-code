class auditShowCtrl {
    constructor($scope){

    }
}

angular.module('app')
    .component('auditShow', {
        templateUrl: '/components/audit-show/audit-show.html',
        controller: auditShowCtrl,
        bindings: {
            audit : '<',
        },
    })
function tableCtrl($scope, $element, $attrs, tableService) {
    var ctrl = this;

    this.$onInit = function () {
        tableService
            .getTables(ctrl.audit.DIVISION, ctrl.date, 'table')
            .then(function (response) {
                ctrl.tables = response.data;
            }, function (reason) {
                console.warn('ERROR :' + reason);
            });
    }
}

angular.module('app')
    .component('tableComponent', {
        templateUrl: '/components/table-component/table-component.html',
        controller: tableCtrl,
        bindings: {
            audit: '<',
            date: '<',
        },
    })
    .service('tableService', function ($http) {
        this.getTables = function (division, date, objType) {
            return $http.get('/api/objet_details?division=' + division + '&date=' + date + '&objet=' + objType + '');
        };
    });
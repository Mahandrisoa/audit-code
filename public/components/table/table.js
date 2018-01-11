function tableCtrl($scope, $element, $attrs, tableService) {
    var ctrl = this;

    this.$onInit = function () {
        tableService
            .getTables(ctrl.audit.DIVISION, 'table')
            .then(function (response) {
                ctrl.tables = response.data;
            }, function (reason) {
                console.warn('ERROR :' + reason);
            });
    }
}

angular.module('app')
    .component('table', {
        templateUrl: '/components/table/table.html',
        controller: tableCtrl,
        bindings: {
            audit: '<'
        },
    })
    .service('tableService', function ($http) {
        this.getTables = function (division, objType) {
            return $http.get('/api/objet_details?division=' + division + '&date=05/01/2018&objet=' + objType + '');
        };
    });
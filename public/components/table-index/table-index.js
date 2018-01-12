function tableIndexCtrl($scope, $element, $attrs, indexService) {
    var ctrl = this;
    this.$onInit = function () {
        indexService
            .getIndexes(ctrl.audit.DIVISION, 'index')
            .then(function (response) {
                ctrl.indexes = response.data;
            }, function (reason) {
                console.warn('ERROR :' + reason);
            });
    }
}

angular.module('app')
    .component('tableIndex', {
        templateUrl: '/components/table-index/table-index.html',
        controller: tableIndexCtrl,
        bindings: {
            audit: '<'
        }
    })
    .service('indexService', function ($http) {
        this.getIndexes = function (division, objType) {
            return $http.get('/api/objet_details?division=' + division + '&date=05/01/2018&objet=' + objType + '');
        }
    });
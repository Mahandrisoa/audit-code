function tablespaceCtrl($scope, $element, $attrs, tablespaceService) {
    var ctrl = this;    
    this.$onInit = function () {        
        tablespaceService.getTablespaces(ctrl.audit.DIVISION, 'tablespace')
            .then(function (response) {
                ctrl.tablespace = response.data;
            });
    }
}

angular.module('app')
    .component('tablespace', {
        templateUrl: '/components/tablespace/tablespace.html',
        controller: tablespaceCtrl,
        bindings: {
            audit: '<'
        }
    }).service('tablespaceService', function ($http) {
        this.getTablespaces = function (division, objType) {
            return $http.get('/api/objet_details?division=' + division + '&date=05/01/2018&objet=' + objType + '');
        }
    });
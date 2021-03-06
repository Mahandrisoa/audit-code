function tableIndexCtrl($scope, $element, $attrs, indexService) {
    var ctrl = this;
    this.$onInit = function () {
        indexService
            .getIndexes(ctrl.audit.DIVISION, ctrl.date, 'index')
            .then(function (response) {
                ctrl.indexes = response.data;
                ctrl._backup = response.data;
                ctrl._temp = response.data;
            }, function (reason) {
                console.warn('ERROR :' + reason);
            });
    }

    function total(array) {
        var sum = 0;
        ctrl.tables.forEach(element => {
            sum += element.TAILLE_OBJET;
        });
        return sum;
    }

    this.handleChange = function (e) {
        console.log('onchange');
        switch (e.indexModel) {
            case 'biggest':
                ctrl.indexes = ctrl._temp.filter(function (element) {
                    return element.TAILLE_OBJET > 102400;
                });
                break;
            case 'mostDeffed': // les plus defragmentés                
                ctrl.indexes = ctrl._backup;
                break;
        }
    }
}

angular.module('app')
    .component('tableIndex', {
        templateUrl: '/components/table-index/table-index.html',
        controller: tableIndexCtrl,
        bindings: {
            audit: '<',
            date: '<',
        }
    })
    .service('indexService', function ($http) {
        this.getIndexes = function (division, date, objType) {
            return $http.get('/api/objet_details?division=' + division + '&date=' + date + '&objet=' + objType + '');
        }
    });
function auditCtrl($scope, $http, $element, $attrs, auditService) {
    var ctrl = this;

    this.$onInit = function () {
        var converted = this.convertDate(new Date().toDateString());
        ctrl.dateAudit = converted;
        $scope.datePicker = new Date();
        auditService
            .getAudits(converted)
            .then(function (response) {
                response.data.forEach(element => {
                    var cache = parseFloat(element.CACHE_HIT_RATIO).toFixed(3);
                    element.CACHE_HIT_RATIO = cache;
                });
                ctrl.audits = response.data;
                ctrl._temp = response.data; // temp is used for backing up data
                ctrl._backup = response.data;
            }, function (reason) {
                console.log('error :' + reason);
            });
    }

    this.handlePickerChange = function () {
        var converted = this.convertDate($scope.datePicker);
        auditService
            .getAudits(converted)
            .then(function (response) {
                response.data.forEach(element => {
                    var cache = parseFloat(element.CACHE_HIT_RATIO).toFixed(3);
                    element.CACHE_HIT_RATIO = cache;
                });
                ctrl.audits = response.data;
                ctrl._temp = response.data; // temp is used for backing up data
                ctrl._backup = response.data;
                ctrl.dateAudit = converted;
                $scope.typeModel = 'Tout';
            });
    }

    this.handleTypeChange = function (e) {
        if ($scope.typeModel === 'Tout') {
            ctrl.audits = ctrl._backup;
        } else {
            ctrl.audits = ctrl._temp.filter(function (element) {
                return element.DIVISION_TYPE === $scope.typeModel;
            });
        }
    }
    this.convertDate = function (inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
    }

    this.handleSearch = function(e) {
        console.log($scope.searchModel);
        //ctrl.audits.match()
    }
}

angular.module('app')
    .component('audit', {
        templateUrl: '/components/audit/audit.html',
        controller: auditCtrl,
    })
    .service('auditService', function ($http) {
        this.getAudits = function (date) {
            return $http.get('/api/audits?date=' + date);
        }
    });

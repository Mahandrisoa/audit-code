function auditCtrl($scope, $http, $element, $attrs) {
    var ctrl = this;
    var today = new Date();
    today.setDate(5);
    var day = today.getDate();
    if ((today.getDate() - 10) < 0) {
        day = '0' + day;
    };
    var nextFormat = day + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    ctrl.dateAudit = nextFormat;

    this.$onInit = function () {
        $http.get('/api/audits?date=' + nextFormat).then(function (response) {
            ctrl.audits = response.data;
            ctrl.audits.forEach(element => {
                var cache = parseFloat(element.CACHE_HIT_RATIO).toFixed(3);
                element.CACHE_HIT_RATIO = cache;
            });
        });
    }
}

angular.module('app')        
    .component('audit', {
        templateUrl: '/components/audit/audit.html',
        controller: auditCtrl,        
    });

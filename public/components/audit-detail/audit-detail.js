function auditDetailCtrl($scope, $http, $element, $attrs) {
    var ctrl = this;
    
}
angular.module('app')
    .component('auditDetail', {
        templateUrl: '/components/audit-detail/audit-detail.html',
        controller: auditDetailCtrl,
        bindings: {
            audit: '<',            
        }
    });    
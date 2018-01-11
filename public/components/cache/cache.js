function cacheCtrl($scope, $http, $element, $attrs) {
    var ctrl = this;

}
angular.module('app')
    .component('cache', {
        templateUrl: '/components/cache/cache.html',
        controller: cacheCtrl,
        bindings: {
            cacheValue: '<'
        }
    })
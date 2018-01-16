angular.module('app', [
    'ngComponentRouter',
])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    })

    .value('$routerRootComponent', 'app')
    .component('app', {
        templateUrl: '/components/app/app.html',
        controller: appCtrl,
    });
function appCtrl($scope, $http, $attrs) {
    var ctrl = this;
    this.$onInit = function () {
        ctrl.selected = false;
    }

    this.setSelected = function (elem) {
        ctrl.selected = !ctrl.selected;
        ctrl.selectedObj = elem;
    }
}

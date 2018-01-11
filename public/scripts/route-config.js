angular
    .module('app')
    .config(config);

function config($routeProvider) {
    $routeProvider
        .when('/tablespace?division=:division&objet=tablespace&date=:date', {
            templateUrl: '',
            controller: '',
            controllerAs: 'vm'
        })
}
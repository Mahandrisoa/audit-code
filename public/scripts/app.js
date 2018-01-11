angular.module('app', [
    'ngComponentRouter'
])    
    .config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    })
    .value('$routerRootComponent', 'app')
    .component('app',{
        template : 
        '<nav>\n' +
        '<a ng-link="[\'CrisisCenter\']">Crisis Center</a>\n' +
        '<a ng-link="[\'Heroes\']">Heroes</a>\n' +
        '</nav>\n' +
        '<ng-outlet></ng-outlet>\n',
    $routeConfig:  [{ path : '/...', name : 'Audits', component : 'audit', useAsDefault : true },]
    });  
angular.module('app', [
    'ngComponentRouter'
])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    })
    .value('$routerRootComponent', 'appComponent')
    .component('appComponent', {
        template:
            '<nav>\n' +
            '  <a ng-link="[\'Audits\']">Audits</a>\n' +
            '  <a ng-link="[\'Audits\']">Details</a>\n' +
            '</nav>\n' +
            '<ng-outlet></ng-outlet>\n',
        $routeConfig: [
            { path: '/', name: 'Audits', component: 'audit', useAsDefault: true },
            { path: '/audit/:audit_id', name: 'AuditsShow', component: 'auditShow' }
        ]
    });  
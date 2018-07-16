var app = angular.module('State', [
    'ui.router',
    'ngMaterial',
    'ngMessages'
]);

app.config(routeConfig);

routeConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true); //html5Mode with the Capital case
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('any', {
            url: "/",
            templateUrl : "views/main.html",
            controller: function($state) {
                $state.go("main");
            }
        })
        .state('main', {
            url: "/",
            templateUrl : "views/main.html"
        })
        .state('home', {
            url: '/home',
            templateUrl: "views/home.html",
            controller : "HomeCtrl",
            controllerAs : 'vm'
        })
        .state('report', {
            url: '/home/:report',
            templateUrl: "views/report.html",
            controller : "ReportCtrl",
            controllerAs : 'vm'
        })
        .state('item', {
            url: '/home/:report/:item',
            templateUrl: "views/item.html",
            controller : "ItemCtrl",
            controllerAs : 'vm'
        })

}


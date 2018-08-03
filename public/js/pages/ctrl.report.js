var app = angular.module('Report', []);

app.controller('ReportCtrl', function($http, $state, $scope) {
    var vm = this;
    $scope.report = JSON.parse($state.params.report);
    $scope.groups = $scope.report.groups;
    console.log($scope.groups);
    console.log($scope.report);
    // Используй group id чтобы сделать переход
    //filter for the year
    vm.years = [
        {
            year: 2018
        },
        {
            year: 2017
        },
        {
            year: 2016
        },
        {
            year: 2015
        }
    ];

    vm.changeDate = function() {

    }

});

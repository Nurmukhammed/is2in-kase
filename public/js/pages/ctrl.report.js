var app = angular.module('Report', []);

app.controller('ReportCtrl', function($http, $state, $scope) {
    var vm = this;
    $scope.report = JSON.parse($state.params.report);
    $scope.groups = $scope.report.groups;

    // Используй group id чтобы сделать переход

    // for (var i = 0; i <= $scope.report.groups.length; i++) {
    //     vm.iterrator = $scope.report.groups[i];
    // }

    // vm.click = function(index) {
    //     vm.index = index;
    //     console.log(index);
    //     if (vm.index === $scope.report.groups[0].id) {
    //         console.log('id');
    //         $state.go('item');
    //     }
    // }

});

var app = angular.module('Main', []);

app.controller('MainCtrl', function($http, $scope, $state) {
    var vm = this;
    // $scope.email = 'is2in@kase.kz';
    // $scope.password = '123';
    $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    $scope.passwordFormat = /^\d+$/;

    vm.send = function () {
        console.log($scope.email, $scope.password);
        var login = {
            email: $scope.email,
            password: $scope.password
        };

        // console.log(login); data to be sent to the backend for validation
        if ($scope.email === 'is2in@kase.kz' && $scope.password === '123' && $scope.firstChecked === true) {
            $state.go('home');
            // console.log('valid');
        }

        $scope.checked = function () {
            console.log($scope.firstChecked);
        }
    };
});
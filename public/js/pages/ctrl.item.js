var app = angular.module('Item', []);

app.directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) { //scope сохраняем его в глобальную переменную vm.img это и есть
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                    console.log(element[0].files[0])
                });
            });
        }
    };
}]);

app.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
        return moment(date).format('DD-MM-YYYY');
    };
});

app.controller('ItemCtrl', function($http, $scope, $state, $log) {
    var vm = this;
    $scope.item = JSON.parse($state.params.item);
    console.log(JSON.parse($state.params.item));
    vm.year = null;
    vm.years = [];

    for(var i = 1940; i <= 2018; i++) {
        vm.years.push(i);
    }

    //Select Date

    vm.myDate = new Date();

    vm.minDate = new Date(
        vm.myDate.getFullYear(),
        vm.myDate.getMonth() - 2,
        vm.myDate.getDate()
    );

    vm.maxDate = new Date(
        vm.myDate.getFullYear(),
        vm.myDate.getMonth() + 2,
        vm.myDate.getDate()
    );

    vm.dataChanged = function() {
        $log.log('Update Date: ', vm.myDate);
        console.log(vm.myDate);
    };

    vm.form = function() {
        vm.item = {
            quarter: vm.quarter,
            year: vm.year,
            date: vm.myDate
        };
        console.log(vm.item);
        //если данные не выбраны, то приходит сообщение
        if(!vm.item.quarter && !vm.item.year) {
            vm.quarter = 'Выберите квартал';
            vm.year = 'Выберите год';
        }

        if(vm.item.quarter && vm.item.year) {
            $state.go('home');
        }

        //Для сохранения файлов

        // var fd = new FormData();
        // fd.append('pdf', vm.pdf); // сохраняется в виде о    бъекта

        // $state.go('report', JSON.parse(vm.item));

        // $http.post('/api/upload', fd, {
        //     headers: {'Content-Type' : undefined}
        // }).success(function(response){
        //     console.log(response);
        // }).error(function(error){
        //     console.log(error);
        // })
    };

});

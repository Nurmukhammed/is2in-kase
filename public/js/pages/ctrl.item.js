var app = angular.module('Item', []);

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) { //scope сохраняем его в глобальную переменную vm.img это и есть
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                    console.log(element[0].files[0])
                });
            });
        }
    };
}]);

app.config(function ($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function (date) {
        return moment(date).format('DD.MM.YYYY');
    };
});

app.controller('ItemCtrl', function ($http, $scope, $state, $log) {
    var vm = this;
    $scope.item = JSON.parse($state.params.item);
    console.log($scope.item);
    $scope.text = $scope.item.text;
    $scope.role = $scope.item.template;
    $scope.issueNumber = /[0-9]/g;
    $scope.issueCode = new RegExp("^[a-zA-Z0-9\\s]+$");
    if ($scope.item.template === 1) {
        vm.item = true;
    } else if ($scope.item.template === 2) {
        vm.report = true;
    } else if ($scope.item.template === 3) {
        vm.meeting = true;
    } else if ($scope.item.template === 4) {
        vm.equity = true;
    } else if ($scope.item.template === 5) {
        vm.release = true;
    } else if ($scope.item.template === 6) {
        vm.message = true;
    }

    console.log($scope.item.role);
    vm.year = null;
    vm.years = [];

    for (var i = 1940; i <= 2018; i++) {
        vm.years.push(i);
    }

    //Select Date
    vm.myDate = new Date();

    vm.dataChanged = function () {
        $log.log('Update Date: ', vm.myDate);
    };

    vm.form = function () {
        vm.item = {
            quarter: vm.quarter,
            year: vm.year,
            date: vm.myDate
        };
        console.log(vm.item);
        //если данные не выбраны, то приходит сообщение
        if (!vm.item.quarter || !vm.item.year || vm.consCheck === false || vm.quarterCheck === false) {
            vm.reply = {
                msgQuarter: 'Выберите квартал',
                msgYear: 'Выберите год',
                msgCheck: 'Поставьте галочку'
            };
        }

        if (vm.item.quarter && vm.item.year && vm.item.date && vm.consCheck === true && vm.quarterCheck === true) {
            $state.go('home');
        }

        // // Для сохранения файлов
        // var fd = new FormData();
        // fd.append('pdf', vm.fileItem); // сохраняется в виде объекта

        // $http.post('/api/item', fd, {
        //     headers: {'Content-Type' : undefined}
        // }).success(function(response){
        //     console.log(response);
        // }).error(function(error){
        //     console.log(error);
        // })
    };
    //For edit pages
    vm.changeShow = false;
    vm.recordDate = new Date();
    vm.recordChanged = function () {
        $log.log('Update Date: ', vm.recordDate);
    };
    vm.record = function () {
        vm.send = {
            change: vm.change,
            date: vm.recordDate,
            register: vm.register
        };
        console.log(vm.send);
        if (!vm.change || !vm.register) {
            vm.response = {
                msgType: 'Вебирите тип изменения'
            };
        }
        if (vm.change && vm.recordDate && vm.register) {
            $state.go('home');
        }
    };

    vm.protocols = [{
        id: 1,
        label: "внеочерднего"
    }, {
        id: 2,
        label: "созываемое"
    }];

    vm.types = [{
        id: 1,
        label: 'Выписка из протокола'
    }, {
        id: 2,
        label: 'Выписка из протокола 2'
    }];

    vm.holders = [{
        id: 1,
        label: 'Акционеров'
    }, {
        id: 2,
        label: 'Акционеров 2'
    }];

    vm.board = function () {
        if (!vm.protocol || !vm.type || !vm.holder) {
            vm.msgProtocol = 'Выбирите тип собрания';
            vm.msgType = 'Выбирите тип документа';
            vm.msgHolders = 'Выбирите тип владельца';
        }
        vm.send = {
            protocol: vm.protocol,
            type: vm.type,
            holder: vm.holder,
            boardDate: vm.boardDate,
            publishDate: vm.publishDate
        };
        console.log(vm.send);
        if (vm.protocol && vm.type && vm.holder) {
            $state.go('home');
        }
    };

    vm.equityChanges = [{
        id: 1,
        label: 'Изменения и дополнения '
    }, {
        id: 1,
        label: 'Изменения и дополнения 2'
    }];

    vm.equityIssues = [{
        id: 1,
        label: '1'
    }, {
        id: 2,
        label: '2'
    }];

    vm.bondChanges = [{
        id: 1,
        label: '1'
    }, {
        id: 2,
        label: '2'
    }, {
        id: 3,
        label: '3'
    }];

    vm.stock = function () {
        vm.send = {
            equityChange: vm.equityChange,
            equityNumber: vm.equityNumber,
            equityCode: vm.equityCode,
            equityIssue: vm.equityIssue,
            bondChange: vm.bondChange,
            equityNin: vm.equityNin,
            equityIsin: vm.equityIsin
        };
        console.log(vm.send);
        if (!vm.equityChange || !vm.equityIssue || !vm.bondChange || vm.bondCheck === false) {
            vm.response = {
                msgEquity: "Выберите тип",
                msgIssue: 'Выберите номер выпуска',
                msgBond: 'Выберите номер облигации',
                msgCheck: 'Поставьте галочку'
            };
        }
        if (vm.equityChange && vm.equityIssue && vm.bondChange && vm.bondCheck === true) {
            $state.go('home');
        }
    };

    vm.press = function () {
        vm.release = {
            pressDate: vm.pressDate,
            pressIssuer: vm.pressIssuer,
            releaseDate: vm.releaseDate
        };
        console.log(vm.release);
        if (vm.pressIssuer) {
            $state.go('home');
        }
    };

    vm.typesInfo = [{
        id: 1,
        label: 'купонным'
    }, {
        id: 2,
        label: 'купонным 2'
    }];

    vm.catsInfo = [{
        id: 1,
        label: "первая подкатегория категории 'Долговые ценные бумаги без рейтинговой оценки'"
    }, {
        id: 2,
        label: 'первая подкатегория категории \'Долговые ценные бумаги без рейтинговой оценки 2'
    }];

    vm.infoNumbers = [{
        id: 1,
        label: '1'
    }, {
        id: 2,
        label: '2'
    }, {
        id: 3,
        label: '3'
    }, {
        id: 4,
        label: '4'
    }];

    vm.infoCurrencies = [{
        id: 1,
        label: 'тенге'
    }, {
        id: 2,
        label: 'доллар'
    }, {
        id: 3,
        label: 'рубль'
    }];

    vm.info = function () {
        vm.process = {
            typeInfo: vm.typeInfo,
            catInfo: vm.catInfo,
            infoNin: vm.infoNin,
            infoSum: vm.infoSum,
            infoCurrency: vm.infoCurrency,
            infoNumber: vm.infoNumber,
            infoIsin: vm.infoIsin,
            infoCode: vm.infoCode
        };
        console.log(vm.process);
        if (!vm.typeInfo || !vm.catInfo || vm.infoNumber) {
            vm.reply = {
                msgType: 'Выберите тип',
                msgCat: 'Выберите категорию',
                msgCurrency: 'Выберите валюту',
                msgNumber: 'Выберите номер'
            }
        }
        if (vm.typeInfo && vm.catInfo && vm.infoNumber) {
            $state.go('home');
        }
    };
});

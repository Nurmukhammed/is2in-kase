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
    $scope.text = $scope.item.title;
    $scope.role = $scope.item.template;
    console.log($scope.role);
    $scope.trim = $scope.item.trim;
    $scope.document = $scope.item.document;
    $scope.issueNumber = /[0-9]/g;
    $scope.issueCode = new RegExp("^[a-zA-Z0-9\\s]+$");
    $scope.data = {};
    $scope.data.consCheck = false;
    if ($scope.item.template === 1) {
        vm.item = true;
    } else if ($scope.item.template === 1.1) {
        vm.itemSelect = true;
    }
    else if ($scope.item.template === 2) {
        vm.report = true;
    } else if ($scope.item.template === 3) {
        vm.meeting = true;
    } else if ($scope.item.template === 4) {
        vm.equity = true;
    } else if ($scope.item.template === 5) {
        vm.release = true;
    } else if ($scope.item.template === 6) {
        vm.message = true;
    } else if ($scope.item.template === 7) {
        //some template
    }
    console.log($scope.item.role);

    $scope.dates = {};
    vm.years = [{ val: 'Год', disabled: true }];
    for(var i = 1993; i <= 2024; i++) {
        vm.years.push({val: i});
    }
    $scope.dateToday = new Date();
    $scope.getYearToday = function() {
        var date = new Date();
        var today = date.getFullYear();
        $scope.dates.currentYear = today;
    };
    // vm.year = null;
    // vm.years = [];
    //
    // for (var i = 1993; i <= 2018; i++) {
    //     vm.years.push(i);
    // }
    // vm.currentYear = vm.years.slice(-1)[0];

    //Select Date
    vm.myDate = new Date();

    vm.dataChanged = function () {
        $log.log('Update Date: ', vm.myDate);
    };

    vm.form = function () {
        vm.item = {
            quarter: vm.quarter,
            year: vm.year,
            date: vm.myDate,
            comment: vm.comments
        };
        console.log(vm.item);
        //если данные не выбраны, то приходит сообщение
        if (!vm.item.quarter || !vm.item.year || $scope.data.consCheck === false || !vm.comments) {
            vm.reply = {
                msgQuarter: 'Выберите квартал',
                msgYear: 'Выберите год',
                msgCheck: 'Поставьте галочку',
                msgComment: 'Оставьте комментарий'
            };
        }

        if (vm.item.quarter && vm.item.date && $scope.data.consCheck === true && vm.comments) {
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
    vm.itemOne = function () {
        vm.sendOne = {
            month: vm.month,
            year: vm.year,
            comments: vm.comments
        };
        if (!vm.month || !vm.year || $scope.data.consCheck === false || vm.quarterCheck === false || !vm.comments) {
            vm.response = {
                msgCheck: 'Выберите галочку',
                msgMonth: 'Выберите месяц',
                msgYear: 'Выберите год',
                msgComment: 'Оставьте комментарий'
            }
        }
        if ($scope.data.consCheck === true && vm.quarterCheck === true) {
            $state.go('home');
        }
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

    vm.months = [{
        id: 1,
        label: 'январь-март',
        position: 1
    },
    {
        id: 2,
        label: 'январь-июнь',
        position: 2
    },
    {
        id: 3,
        label: 'январь-сентябрь',
        position: 3
    },
    {
        id: 4,
        label: 'январь-декабрь',
        position: 4
    }];

    vm.allMonths = [{
        id: 1,
        label: 'январь'
    },
    {
        id: 2,
        label: 'январь-февраль'
    },
    {
        id: 3,
        label: 'январь-март'
    },
    {
        id: 4,
        label: 'январь-апрель'
    },
    {
        id: 5,
        label: 'январь-май'
    },
    {
        id: 6,
        label: 'январь-июнь'
    },
    {
        id: 7,
        label: 'январь-июль'
    },
    {
        id: 8,
        label: 'январь-август'
    },
    {
        id: 9,
        label: 'январь-сентябрь'
    },
    {
        id: 10,
        label: 'январь-октябрь'

    },
    {
        id: 10,
        label: 'январь-ноябрь'

    },
    {
        id: 10,
        label: 'январь-декабрь'
    }];

    vm.threeMonths = [{
        id: 1,
        label: 'январь-март',
    },
    {
        id: 2,
        label: 'январь-июнь'
    },
    {
        id: 3,
        label: 'январь-сентябрь'
    }];

    vm.quarters = [{
        id: 1,
        label: '3 месяца'
    },
    {
        id: 2,
        label: '6 месяцев'
    },
    {
        id: 3,
        label: '9 месяцев'
    }];

});

var app = angular.module('Home', []);

app.config(function(treeConfig) {
    treeConfig.defaultCollapsed = true; // collapse nodes by default
    treeConfig.appendChildOnHover = true; // append dragged nodes as children by default
});

app.controller('HomeCtrl', function($http, $scope, $state, $rootScope) {
    var vm = this;
    vm.report = [
        {
            id: 1,
            title: 'Периодичная отчетность',
            groups : [
                {
                    id: 1,
                    title: 'Квартальная финансовая отчетность',
                    template: 1.1
                },
                {
                    id: 2,
                    title: 'Пояснительная записка к квартальной финансовой отчетности',
                    template: 1
                },
                {
                    id: 3,
                    title: 'Неполная периодическая финансовая отчетность для организаций членов Биржи',
                    template: 1
                },
                {
                    id: 4,
                    title: 'Отчет по обзору финансовой отчетности',
                    template: 1
                },
                {
                    id: 5,
                    title: 'Квартальная финансовая отчетность (для нерезидентов с нестандартными отчетными периодами)',
                    template: 1
                },
                {
                    id: 6,
                    title: 'Полугодовая финансовая отчетность (для нерезидентов с нестандартными отчетными периодами)',
                    template: 1
                },
                {
                    id: 7,
                    title: 'Годовая финансовая отчетность',
                    template: 1
                },
                {
                    id: 8,
                    title: 'Пояснительная записка к годовой финансовой отчетности',
                    template: 1
                },
                {
                    id: 9,
                    title: 'Аудиторский отчет',
                    template: 1
                },
                {
                    id: 10,
                    title: 'Годовой отчет',
                    template: 1
                },
                {
                    id: 10,
                    title: 'Отчет об устойчивом развитии',
                    template: 1
                },
                {
                    id: 11,
                    title: 'Публичный отчет по запасам',
                    template: 1
                },
                {
                    id: 12,
                    title: 'Периодический отчет об остатках на балансовых и внебалансовых счетах',
                    template: 1.1
                }
            ]
        },
        {
            id: 2,
            title: 'проспекты',
            groups: [
                {
                    id: 1,
                    title: 'Проспект выпуска акций в новой редакции',
                    template: 1
                },
                {
                    id: 2,
                    title: 'Проспект выпуска облигаций в новой редакции',
                    template: 1
                },
                {
                    id: 3,
                    title: 'Проспект выпуска облигационной программы в новой редакции',
                    template: 1
                },
                {
                    id: 4,
                    title: 'Изменения и дополнения в проспект выпуска акций',
                    template: 4
                },
                {
                    id: 5,
                    title: 'Изменения и дополнения в проспект выпуска облигаций',
                    template: 4
                },
                {
                    id: 5,
                    title: 'Изменения и дополнения в проспект выпуска облигационной программы',
                    template: 4
                }
            ]
        },
        {
            id: 3,
            title: 'учредительные документы',
            groups: [
                {
                    id: 1,
                    title: 'Устав компании в новой редакции',
                    template: 1
                },
                {
                    id: 2,
                    title: 'Изменения и дополнения в устав компании',
                    template: 2
                },
                {
                    id: 3,
                    title: 'Кодекс корпоративного управления в новой редакции',
                    template: 1
                },
                {
                    id: 4,
                    title: 'Изменения и дополнения в кодекс корпоративного управления.',
                    template: 2
                }
            ]
        },
        {
            id: 4,
            title: 'протоколы',
            groups: [
                {
                    id: 1,
                    title: 'Решение',
                    template: 1
                },
                {
                    id: 2,
                    title: 'Протокол общего собрания',
                    template: 3
                },
                {
                    id: 3,
                    title: 'Протокол заседания Совета директоров',
                    template: 3
                }
            ]
        },
        {
            id: 5,
            title: 'корпоративные события',
            groups: [
                {
                    id: 1,
                    title: 'Пресс-релиз',
                    template: 5
                },
                {
                    id: 2,
                    title: 'Календарь корпоративных событий',
                    template: 5
                }
            ]
        },
        {
            id: 6,
            title: 'новости',
            groups: [
                {
                    id: 1,
                    title: 'Изменение ставки вознаграждения',
                    template: 6
                },
                {
                    id: 2,
                    title: 'Выплата купонного вознаграждения',
                    template: 6
                },
                {
                    id: 3,
                    title: 'Выплата основного долга',
                    template: 6
                },
                {
                    id: 4,
                    title: 'Невыплата купонного вознаграждения',
                    template: 6
                },
                {
                    id: 5,
                    title: 'Проведение общего собрания',
                    template: 6
                },
                {
                    id: 6,
                    title: 'Совершение крупной сделки',
                    template: 6
                },
                {
                    id: 7,
                    title: 'Смена регистратора',
                    template: 6
                },
            ]
        }
    ];

    vm.docs = [{
        id: 1,
        title: 'Пресс-релиз',
        publishDate: '10.08.2018'
    }, {
        id: 2,
        title: 'Информация об аресте имущества организации',
        publishDate: '22.08.2018'
    }];

    $scope.remove = function(scope) {
        scope.remove();
    };

    $scope.toggle = function(scope) {
        scope.toggle();
    };

    $scope.moveLastToTheBeginning = function() {
        var a = $scope.data.pop();
        $scope.data.splice(0, 0, a);
    };

    $scope.addSubItem = function(scope) {
        var nodeData = scope.$modelValue;
        nodeData.groups.push({
            id: nodeData.id * 10 + nodeData.groups.length,
            title: nodeData.title + '.' + (nodeData.groups.length + 1),
            groups: []
        });
    };

    $scope.collapseAll = function() {
        $scope.$broadcast('angular-ui-tree:collapse-all');
    };

    $scope.expandAll = function() {
        console.log('Some way');
        $scope.$broadcast('angular-ui-tree:expand-all');
    };

    $scope.startScanner = function() {
        $rootScope.$broadcast('scanner-started');
    };
    $scope.$on('scanner-started', function(event, args) {
        console.log('scanner received');
    });

    $scope.$parentNodeScope = function() {
        if (isChild()) {
            console.log('I have a child');
        }
    };

    $scope.$childNodesScope = function() {
        console.log("I'm a child");
    }


});

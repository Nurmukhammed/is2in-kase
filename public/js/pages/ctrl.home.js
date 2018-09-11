var app = angular.module('Home', []);

app.controller('HomeCtrl', function($http, $scope, $state, $rootScope) {
    var vm = this;
    vm.report = [
        {
            id: 1,
            title: 'Периодичная отчетность',
            status: 0,
            groups : [
                {
                    id: 1,
                    title: 'Квартальная финансовая отчетность',
                    template: 1.1,
                    trim: 1,
                    document: 1,
                    quarterSelected: null,
                    period: null,
                    semiAnnual: null
                },
                {
                    id: 2,
                    title: 'Пояснительная записка к квартальной финансовой отчетности',
                    template: 1.1,
                    trim: 1.1,
                    document: 0,
                    quarterSelected: null,
                    period: null,
                    semiAnnual: null
                },
                {
                    id: 3,
                    title: 'Неполная периодическая финансовая отчетность для организаций членов Биржи',
                    template: 1.1,
                    trim: 1.2,
                    document: 1,
                    quarterSelected: null,
                    period: null,
                    semiAnnual: null
                },
                {
                    id: 4,
                    title: 'Отчет по обзору финансовой отчетности',
                    template: 1.1,
                    trim: 1.3,
                    document: 0,
                    quarterSelected: null,
                    period: null,
                    semiAnnual: null
                },
                {
                    id: 5,
                    title: 'Квартальная финансовая отчетность (для нерезидентов с нестандартными отчетными периодами)',
                    template: 1,
                    trim: null,
                    document: 0,
                    quarterSelected: 1,
                    period: 1,
                    semiAnnual: null,
                    consolidate: 1
                },
                {
                    id: 6,
                    title: 'Полугодовая финансовая отчетность (для нерезидентов с нестандартными отчетными периодами)',
                    template: 1,
                    document: 0,
                    quarter: 0,
                    quarterSelected: null,
                    period: 2,
                    annual: null,
                    semiAnnual: 1,
                    consolidate: 1
                },
                {
                    id: 7,
                    title: 'Годовая финансовая отчетность',
                    template: 1,
                    document: 0,
                    quarter: 0,
                    quarterSelected: null,
                    semiAnnual: 0,
                    annual: 1,
                    period: 0,
                    consolidate: 1
                },
                {
                    id: 8,
                    title: 'Пояснительная записка к годовой финансовой отчетности',
                    template: 1,
                    document: 0,
                    quarter: 0,
                    quarterSelected: null,
                    semiAnnual: 0,
                    annual: 1,
                    period: 0,
                    consolidate: 1
                },
                {
                    id: 9,
                    title: 'Аудиторский отчет',
                    template: 1,
                    document: 0,
                    quarter: 0,
                    quarterSelected: null,
                    semiAnnual: 0,
                    annual: 1,
                    period: 0,
                    audit: 1,
                },
                {
                    id: 10,
                    title: 'Годовой отчет',
                    template: 1
                },
                {
                    id: 11,
                    title: 'Отчет об устойчивом развитии',
                    template: 1
                },
                {
                    id: 12,
                    title: 'Публичный отчет по запасам',
                    template: 1
                },
                {
                    id: 13,
                    title: 'Периодический отчет об остатках на балансовых и внебалансовых счетах',
                    template: 1.1
                },
                {
                    id: 14,
                    title: 'Годовой отчет об остатках на балансовых и внебалансовых счетах',
                    template: 1.1
                },
                {
                    id: 15,
                    title: 'Расчет коэффициента достаточности собственного капитала',
                    template: 1.1
                },
                {
                    id: 16,
                    title: 'Отчет о выполнении пруденциальных нормативов',
                    template: 1
                },
                {
                    id: 17,
                    title: 'Сведения о заключенных договорах комиссии',
                    template: 1
                },
                {
                    id: 18,
                    title: 'Отчет об остатках денег по торговым счетам каждого клиента',
                    template: 1
                },
                {
                    id: 19,
                    title: 'Отчет о валютных позициях',
                    template: 1
                },
                {
                    id: 20,
                    title: 'Сведения о DMA-клиентах',
                    template: 1
                },
                {
                    id: 21,
                    title: 'Сведения об акциях и акционерах',
                    template: 1
                },
                {
                    id: 22,
                    title: 'Сведения о паях',
                    template: 1
                },
                {
                    id: 23,
                    title: 'Сведения по количеству акций в свободном обращении',
                    template: 1
                },
                {
                    id: 24,
                    title: 'Сведения об аффилиированных лицах',
                    template: 1
                },
                {
                    id: 25,
                    title: 'Сведения о лицах, имеющих доступ к инсайдерской информации',
                    template: 1.1
                },
                {
                    id: 26,
                    title: 'Информация о сделках по первичному размещению ценных бумаг, зарегистрированных в системе учета Центрального депозитария',
                    template: 1.1
                },
                {
                    id: 27,
                    title: 'Письмо-заверение о соответствии минимальным требованиям к организации систем управления рисками и внутреннего контроля',
                    template: 1
                },
                {
                    id: 28,
                    title: 'Отчет по оценке выполнения требований к системам управления рисками',
                    template: 1
                },
                {
                    id: 29,
                    title: 'Анкета по вопросам организации противодействия легализации (отмыванию) доходов, полученных преступным путем, и финансированию терроризма',
                    template: 1.1
                },
                {
                    id: 30,
                    title: 'Анкета члена биржи — юридического лица Республики Казахстан',
                    template: 1
                },
                {
                    id: 31,
                    title: 'Анкета члена Биржи — иностранного юридического лица',
                    template: 1
                },
                {
                    id: 32,
                    title: 'План мероприятий',
                    template: 1
                },
                {
                    id: 33,
                    title: 'Сведения о выполнении мероприятий, предусмотренных планом мероприятий',
                    template: 1.1
                },
                {
                    id: 34,
                    title: 'Отчет представителя держателей облигаций',
                    template: 1
                },
                {
                    id: 35,
                    title: 'Акт проверки финансового состояния',
                    template: 1.1
                }
            ]
        },
        {
            id: 2,
            title: 'проспекты',
            status: 1,
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
            status: 1,
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
            status: 1,
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
            status: 1,
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
            status: 1,
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

});



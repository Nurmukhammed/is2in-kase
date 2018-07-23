#Администрирование

    __Периодическая отчетность__
        - Финансовая отчетность
            /home/:report
                /home/report/:item



##TODO list::
     - Выплата купонного вознаграждения
     - Refactor code for validation

###Update Date format

```
app.filter('formatDate', function(dateFilter) {
    var formattedDate = '';
    return function(dt) {
        console.log(new Date(dt.split('-').join('/')));
        formattedDate = dateFilter(new Date(dt.split('-').join('/')), 'd/M/yyyy');
        return formattedDate;
    }
});
app.controller('ItemCtrl', function($scope) {
    //select date with formatted data
    $scope.dt = '2015-09-21 18:30:00';
});
```

>Should be added when sending data with data format

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 9090);
app.use(express.static(path.join(__dirname, 'public'), {maxAge: 1}));
app.use(bodyParser.json({limit: '50mb'})); //middleware парсит данные
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('*', function (req, res, next) {
    res.redirect('/#' + req.originalUrl);
});

var server = app.listen(app.get('port'), function(){
    console.log('Express server listening on ' + app.get('port'));
});

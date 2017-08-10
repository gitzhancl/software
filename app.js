/**
 * Created by zhangke on 15/12/6.
 */
var express = require('express');
var path = require('path');

//var HTTP = require('./utils/HTTP');

var app = express();

app.set('port', 8000);


app.use(express.static(path.join(__dirname, 'app')));
//app.use(express.static(path.join(__dirname, 'dist')));

module.exports = app;

var startServer = function () {
    app.listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
}
if (!module.parent) {
    startServer();
} else {
    module.exports.startServer = startServer
}
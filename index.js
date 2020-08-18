const express = require("express");
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var moment = require('moment');
const SettingsBill = require('./settingsBill');


const app = express();


const settingsBill = SettingsBill();

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
        "momentDate": function () {
          return moment(this.timestamp).fromNow()
        }
      }
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())



app.get('/', function (req, res) {
    res.render('index', {
        "data": settingsBill.settingsBillTotals(),
        "values": settingsBill.settingsBillCosts(),
        "color": settingsBill.getColorString()
    })
});


app.post('/settings', function (req, res) {


    settingsBill.updateValues({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel,
    })
    res.redirect('/');
});

app.post('/action', function (req, res) {
    settingsBill.addFunction(req.body.actionType)
    res.redirect('/');
});

app.get('/actions/:type', function (req, res) {

    res.render('actions', {
        actions: settingsBill.getActions(req.params.type)
    });
});

let PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log('http://localhost:' + PORT);
});
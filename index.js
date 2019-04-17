var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

var fortune = require('./lib/fortune.js')

app.set('port',process.env.PORT||3000);

app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
    res.render('home');
});
app.get('/about',function(req,res){
    res.render('about',{fortune: fortune.getFortune()});
});


app.use(function(req,res,next){
    res.type('text/plain');
    res.status(404);
    res.end('404-Not Found');
});

app.use(function(err,req,res,next){
    res.type('text/plain');
    res.status(500);
    res.end('500-Server Error');
});

app.listen(app.get('port'),function(){
    console.log('Server is on port ....'+app.get('port'))
});
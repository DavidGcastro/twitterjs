//require in Express 
var express = require("express");
//require in nunjucks templating
var nunjucks = require('nunjucks')
//initialize an instance of express
const app = express();
//require in routes in our routes/index.js file, remember express using this file name as the default
const routes = require('./routes');

//the context for our templating system
var locals = {
    title: 'An Example',
    people: [
        {
            name: 'Gandalf'
        },
        {
            name: 'Frodo'
        },
        {
            name: 'Hermione'
        }
    ]
};
nunjucks.configure('views', {
    noCache: true
});

nunjucks.render('index.html', locals, function (err, output) {
    //    console.log(output);
});

app.set('view engine', 'html'); // have res.render work with html files

app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks

nunjucks.configure('views'); // point nunjucks to the proper directory for templates

nunjucks.configure('views', {
    noCache: true
})

app.use(function (req, res, next) {
    // do your logging here
    console.log("logs for every page")
    next()
})

app.use('/public/styles.css', (req, res, next) => {
    res.sendFile('./public/styles.css');
})

app.use(express.static('public'))

app.use('/', routes);

app.listen(3000, () => console.log('Example app listening on port 3000!'))

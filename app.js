var express = require("express");
var nunjucks = require('nunjucks')
const app = express();

const routes = require('./routes');
app.use('/', routes);

const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];

// in some file that is in the root directory of our application... how about app.js?
var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};
nunjucks.configure('views', {noCache: true});
nunjucks.render('index.html', locals, function (err, output) {
    console.log(output);
});
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views'); // point nunjucks to the proper directory for templates
nunjucks.configure('views', { noCache: true })

app.use(function (req, res, next) {
    // do your logging here
    console.log("logs for every page")
    next()
})

// app.get('/',function(req, res,next) {
// 	var news = {
// 		title: 'News',
// 		people: [
// 			{ name: 'Article 1'},
// 			{ name: 'Article 2' },
// 			{ name: 'Article 3'}
// 		]
// 	};
// 	console.log("status: ", res.statusCode)
// 	res.render( 'index', news );
// 	next();
// })

// app.get('/news', function(req, res, next) {
// 	 console.log("status: ", res.statusCode)
//      res.render( 'index', {title: 'News articles', people: people} );
//      next();

// })

// app.use("/news/", function(req, res, next){
// 	//why is this logging 304?
// 	res.render( 'index', {title: 'Hall of Fame', people: people} );
// 	console.log("status: ", res.statusCode)
// 	next();
// })

app.listen(3000, () => console.log('Example app listening on port 3000!'))




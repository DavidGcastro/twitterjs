//require in Express 
var express = require("express");
//require in nunjucks templating
var nunjucks = require('nunjucks')
//initialize an instance of express
const app = express();
//require in routes in our routes/index.js file, remember express using this file name as the default
const routes = require('./routes');

//the context for our templating system, passed in as the second parameter in render. 
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

//where our templates are, and some additional options. 
nunjucks.configure('views', {
    noCache: true
});

//nunjucks.render(name, [context], [callback])
nunjucks.render('index.html', locals, function (err, output) {
    //    console.log(output);
});



app.set('view engine', 'html'); // have res.render work with html files

//app.engine('html', require('ejs').renderFile);
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks

//allows us to have a folder of files become public. Provides routes for every specific file.
app.use(express.static('public'))

//when we hit this url, use what we stored in in the routes variable above. 
app.use('/', routes);

//listen on port 30000
app.listen(3000, () => console.log('Example app listening on port 3000!'))


//===============================================================================
//NOTES
//===============================================================================
////lets our server listen on port 3000
//// under the hood using node's native http handler
////express is built on top of it
//
////will feed the request to app, and app will route it to the proper function with the method and proper uri. 
//**********************************
//app.listen(3000, function () {
//    console.log("listening on port 3000")
//})
//
////lets do more analysis of our request before we do anything with them.
//// use is supposed to take in a middleware function
//************************************
//app.use(function (req, res, next) {
//    // "/" by default
//    //FOR ANY REQUEST DO THIS
//    console.log("You made a request")
//
//    //when we are done with this response do this.
//    res.on("finish", function () {
//        console.log(req.method, req.path, res.statusCode)
//    })
//
//
//    //EVERYTIME YOU ARE DONE WITH A MIDDLEWARE FUNCTION YOU HAVE TO SPECIFY THAT YOU ARE DONE 
//    // AND THAT YOU WANT TO MOVE ON!
//    //use the third parameter
//
//    //why?
//    //lets say you have an async function (getTimeOut, readFile, readDir etc)
//    // if we were to move on to the next function, we wouldnt have waited for the response of those calls.
//    //express makes it so you HAVE to explicitly say youre done, in order to stop the function from moving on prematurely. 
//    //you can now control how it goes from middleware function to middleware function. 
//    next()
//
//})
//
////route for getting root
//*************************************
//app.get("/", function (request, response) {
//    res.render("index", locals) //render index using the locals object from here. 
//
//})
//
////route for news 
//*****************************************
//app.get("/news", function (request, response) {
//    response.send("you got the news page back")
//    //without this we will never hit our use, since it returns after sending our response
//    next()
//})
//
//
//*****************************************
//app.use(function (request, response) {
//    //what we are sending to request
//    response.send("Here is what are are sending back, we will be sending HTML")
//    next();
//})
//
//
////AFTER OUR ROUTES DO THIS
//******************************
//app.use(function (req, res) {
//    console.log("response: ", res.statusCode);
//})
//
//

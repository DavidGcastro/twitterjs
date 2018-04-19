var express = require("express");

const app = express();

app.use(function (req, res, next) {
    // do your logging here
    console.log("logs for every page")
    next()
})

app.get('/',function(req, res,next) {
	console.log("status: ", res.statusCode)
	res.send('Hello World!')
	next();
})

app.get('/news', function(req, res, next) {
	console.log("status: ", res.statusCode)
     res.send('This is news')
     next();

})

app.use("/news/", function(req, res, next){
	//why is this logging 304?
	  res.send("this is a subpage of news");
	  console.log("status: ", res.statusCode)
	  next();
})







app.listen(3000, () => console.log('Example app listening on port 3000!'))
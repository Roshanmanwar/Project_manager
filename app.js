const express=require('express');
const mongoose=require('mongoose');
const BasicRouter=require('./routes/Basic.routes');
const session=require("express-session");
const app=express();
const port=3040;

//add express-session
app.use(session({
    secret: '3riTech',
    resave: true,
    saveUninitialized: true,
  }));

//to enable post data
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// set routes
app.use('/',BasicRouter);

//add static file --to send  a file from server to browser..
app.use(express.static('public'));

// set views and pug
app.set('views','./views');
app.set('view engine','pug')

//set database
const URI='mongodb://localhost:27017';

mongoose.connect(URI).then(()=>
{
    app.listen(port,()=>{
        console.log("server is start on port no ",port);
        console.log("db is conncet...,!")
    });
})
.catch(()=>
{
    process.exit(1);
});



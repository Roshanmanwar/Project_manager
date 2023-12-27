const Basiccontroller=require('../controllers/Basic.controllers');
const BasicRouter=require('express').Router();

//add multer it support multipart form data --use file up-loading --help to submit form data...
const multer = require('multer');
const upload = multer();

//set url to pages...
BasicRouter.get('/',Basiccontroller.home); //dashboard
BasicRouter.get('/login',Basiccontroller.login); //login page
BasicRouter.get('/new',Basiccontroller.newUser);// registration page
BasicRouter.get('/removeUser',Basiccontroller.removeUser); // remove all user from database
BasicRouter.get('/log-out',Basiccontroller.logOut);//log out user
BasicRouter.get('/api/get-product',Basiccontroller.getProduct); // to get the product

//post method
BasicRouter.post('/save',Basiccontroller.save); //save the user
BasicRouter.post('/login-user',Basiccontroller.userLogin); //log-in the user
BasicRouter.post('/api/save-new-product',upload.none(),Basiccontroller.saveProduct); //api save-product...

//delete method
BasicRouter.delete('/api/remove-product/:id',Basiccontroller.removeProduct);
//:id is said as it a dyanamic...






//export modules...
module.exports=BasicRouter;
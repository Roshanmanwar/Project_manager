const mongoose=require('mongoose');


//to create structure of module...
const UserSchema=new mongoose.Schema({
    name:{type:String},
    mobile:{type:String},
    email:{type:String},
    password:{type:String},
});

const UserModel=mongoose.model("user", UserSchema,"user");
//first user is models name  and second "user" is database collection name



//exports models...
module.exports=UserModel;
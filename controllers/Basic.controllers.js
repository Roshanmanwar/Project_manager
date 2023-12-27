const { isRequired } = require("nodemon/lib/utils");
const UserModel = require("../models/user.models");
const productModel = require('../models/product.models');

//set controllers to pages...
const Basiccontroller={

    //home page...
    home(req,res)
    {
			if(req.session.login === undefined)
			{
				res.redirect('/login');
				return false;
			}
        res.render('dashbord.pug',{
					login:req.session.login,
				})   
    },

    //login page...
    login(req,res)
    {
			if(req.session.login !== undefined)
			{
				res.redirect('/');
				return false;
			}
			let message=
			req.session.message!== undefined ? req.session.message : "";
			delete req.session.message;
        res.render('login.pug',{
					message:message,
				})   
    },

    //new_regi page...
    newUser(req,res)
    {
			if(req.session.login !== undefined)
			{
				res.redirect('/');
				return false;
			}

        let message=req.session.message!== undefined ? req.session.message :"";
        delete req.session.message;

         res.render('new_regi',{
            message:message,
						new_User:{...req.session.new_User},
						
        });
        
    },


		// to save the user....
   async save(req,res)
    {
        let data=req.body;
      try
        {
            let newUser=UserModel
						({
                name:data.fullName,
                mobile:data.mobile,
                email:data.email,
                password:data.password,
            });

						//check email and password 
            let isUserExists= await UserModel.findOne(
							{email: { $regex: "^" + data.email + "$", $options: 'i'} });

							if(isUserExists)
							{
									req.session.message="email already taken..";
									req.session.new_User={...data}; 
									res.redirect('/new');
							}
							else
							{
								let result= await newUser.save(); // save() to save the new user
								if(result)
								{
										req.session.message="success,you can login "
										req.session.newUser={};
										res.redirect('/login');
								}
								else
								{
										req.session.message="fail";
										req.session.new_User={...data};
										res.redirect('/new');	
								}
							}
      }  
      catch(error)
        {
            req.session.message="fail";  
            res.redirect('/new');
						req.session.new_User={...data};
        }
    },

		//to remove all user from database....
		async removeUser(req,res)
		{
			let result=await UserModel.deleteMany({});
			res.json({
				status:true,
				result,
			});
		},

		//login User...
		async userLogin(req,res)
		{
			let data=req.body; // to get the data from url...
		try
			{
			let user=await UserModel.findOne(
				{
				email:{$regex: "^" + data.email+ "$", $options:"i"},
				password:data.password,
			  },{password:0});

			if(user)
			{
				req.session.login={user};
				res.redirect('/');
			}
			else
			{
				req.session.message="wrong";
				res.redirect('/login');
			}		
		} 
		catch (error)
		{
			req.session.message="wrong";
			res.redirect('/login');
		}	
	},

	//User logout.....
	logOut(req,res)
	{
		delete req.session.login; //to delete the session and redirect to login page...
		res.redirect('/login');
	},


	//Save--product...
	async saveProduct(req,res)
	{
		let data = req.body;
	try
		{
			
		let newProduct = new productModel
		({
			productName : data.productName,
			qty : data.qty,
			price : data.price,
			mdate : data.mdate
		});
		let result = await newProduct.save();
		if(result)
		{
			res.json({
				status:true,
				message:'product saved successfully...'
			})
		}
		else
		{
			res.json({
				status:false,
				message:'unable to save product...'
			})
		}	

	} 
	catch (error)
		{
				res.json({
					status:false,
					message:'server error...'
				})
		}

	},

	//get a product
	async getProduct(req,res)
	{
		try 
		{	
		let result = await productModel.find();
		res.json({
			status:true,
			result:result,
		})
		} 
		catch (error)
		{
			res.json({
				status: false,
				message:"server error..."
			})
		}
	},

	//to delete product...
	async removeProduct(req,res)
	{
		let {id} = req.params
		try
		{
	    await productModel.findByIdAndDelete(id);
		res.json({
			status:true,
			message:"remove"
		});
		}
		catch (error)
		{
			res.json({
				status:false,
				message:'server error'
			})
		}
	
	}
    
};







//export the controller...
module.exports=Basiccontroller;
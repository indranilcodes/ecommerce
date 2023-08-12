const { hashPassword, comparePassword } = require('../helpers/authHelper');
const User = require('../models/userModel');
const orderModel = require('../models/orderModel');


const JWT = require('jsonwebtoken');


const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address , answer } = req.body;

    // Validations of the user
    if (!name) {
      return res.send({ error: 'name is required' });
    }

    if (!email) {
      return res.send({ error: 'email is required' });
    }

    if (!password) {
      return res.send({ error: 'password is required' });
    }

    if (!phone) {
      return res.send({ error: 'phone number is required' });
    }

    if (!address) {
      return res.send({ error: 'address is required' });
    }

    if (!answer) {
      return res.send({ error: 'answer is required' });
    }

    // Check if the user is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: 'Already registered, please login...',
      });
    }

    // Register user
    const hashedPassword = await hashPassword(password);

    const user = new User({ name, email, phone, address, password: hashedPassword , answer });
    await user.save();

    res.status(201).send({
      success: true,
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: 'Error in registration',
      error,
    });
  }
};


//login controller...
const loginController =  async(req , res)=> {
        try{
              const {email , password} = req.body ;

              if(!email || !password)
                {
                    return res.status(404).send({
                        success:false ,
                        message: 'Invalid email or Password'
                    })
                }
        
           const user = await User.findOne({ email });

           if(!user)
              {
                  return res.status(404).send({
                      success:false ,
                      message:'Email is not registered'
                  })
              }

           
          const match = await comparePassword(password , user.password )

          if(!match)
            {
                return res.status(200).send({
                    success:false ,
                    message:'Invalid password'
                })
            }
          
            //token 
            const token = await JWT.sign({_id: user._id} , process.env.JWT_SECRET , {
                 expiresIn:"7d" ,
            });

            res.status(200).send({
                success:true ,
                message:"login successfully" ,

                user: {
                    name: user.name ,
                    email: user.email ,
                    phone: user.phone ,
                    address: user.address ,
                    role:user.role ,        
                } , token ,
            });


        }catch(error){
             console.log(error);

             res.status(500).send({
                success:false,
                message:'Error in login',
                error
             })
        }
}

//forgot Password controller...
const forgotPasswordController = async (req , res)=>{

        try{
            const {email , answer , newPassword} = req.body ;

            if(!email){
              res.status(400).send({message:"Email is required!!"})
            }

            if(!answer){
              res.status(400).send({message:"answer  is required!!"})
            }

            if(!newPassword){
              res.status(400).send({message:"New password  is required!!"})
            }

            //check 
            const user = await User.findOne({ email, answer});

            //validation..
            if(!user)
               {
                  return res.status(404).send({
                    success:false ,
                    message:'wrong email or answer'
                  })
               }


        const hashed = await hashPassword(newPassword);

        await User.findByIdAndUpdate(user._id , {password: hashed});

        res.status(200).send({
             success:true ,
             message: "Password Reset Successfully !!!" ,
        });

      }catch(error){
              console.log("error") ;

              res.status(500).send({
                 success:false ,
                 message: "something went wrong" ,
                 error
              })
          }

        }
      

const testController = (req , res)=> {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
}

//update profile..
const updateProfileController = async (req, res) => {
  try {

    const { name, email, password, address, phone } = req.body;

    const user = await User.findById(req.user._id);

    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};


//orders 
const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//orders
 const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};


//order status
 const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};


module.exports = { registerController , loginController , testController , forgotPasswordController , updateProfileController , getOrdersController ,
  getAllOrdersController , orderStatusController 
};

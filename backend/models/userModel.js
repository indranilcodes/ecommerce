const mongoose = require('mongoose');

const sendEmail = require('../config/emailSend') ;

const otpTemplate = require('../templete/emailTemplete') ;

const userSchema = new mongoose.Schema(
    {
       name:{
          type:String ,
          required:true ,
          trim:true 
       },

       email:{
          type:String ,
          required:true ,
          unique:true ,
       } ,

       password:{
           type:String ,
           required:true ,
       } ,

       address:{
           type:String ,
           required:true 
       } ,
        
       answer:{
             type:String ,
             required:true 
       } ,
 
       role:{
           type:Number ,
           default:0
       }

} , {timestamps : true}) ;

// module.exports = userSchema ;

userSchema.post('save' ,async (docs)=>{
       
    try {
        await sendEmail(docs.email ,otpTemplate()) ;
    } catch (error) {

        console.log('Somethings went wrong in the sending email' ,  error.message) ;
    }

})

const userModel = mongoose.model('User', userSchema);


module.exports = userModel;

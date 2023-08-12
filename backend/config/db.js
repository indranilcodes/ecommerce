const mongoose = require('mongoose');
const dotenv = require('../node_modules/dotenv') ;

const connectDB = async() =>{
      try {     
         const conn = await mongoose.connect('mongodb+srv://admin-rahul:JpmC3Tvb603J5Lmd@cluster0.mf66oxb.mongodb.net/ecommerce-2023');

         console.log(`connected to the database ${conn.connection.host}`) ;

      }  catch(error){
          console.log(`Error in mongodb  ${error} `);
      }
};

module.exports = connectDB;
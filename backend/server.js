const express = require('express') ;
const colors = require('colors') ;
const dotenv = require('dotenv') ;
const JWT = require('jsonwebtoken');

const morgan = require('morgan') ;
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const categoryRoutes = require('./routes/categoryRoutes');

const productRoutes = require('./routes/productsRoutes') ;

const path = require('path') ;


const cors = require('cors') ;

dotenv.config() ;   
const app = express() ;   
     
//database config      
connectDB() ;
        
//middleware...
app.use(cors()) ;
app.use(express.json()) 
app.use(morgan('dev'))       

app.use(express.static(path.join(__dirname ,'./client/build' )))
    
// routes 

//auth routes
app.use('/api/v1/auth' , authRoutes);
      
//category routes   
app.use('/api/v1/category' , categoryRoutes)
            
//product routes
app.use('/api/v1/product' , productRoutes) ;
   
app.use('*' , function(req , res){
     res.sendFile(path.join(__dirname , "./client/build/index.html"));
})
                
const PORT = process.env.PORT || 4000 ;
       
app.listen(PORT , (req , res)=>{
     console.log(`Server is listing on the port ${PORT}`.bgCyan.white);
})     
                     
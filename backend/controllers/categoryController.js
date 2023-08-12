
const slugify = require('slugify');

const Category = require('../models/categoryModel');

//create category....
const createCategoryController = async (req, res) => {

   try {
      const { name } = req.body

      if (!name) {
         return res.status(401).send({
            message: 'Name is required'
         })
      }

      const existingCategory = await Category.findOne({ name });

      if (existingCategory) {
         return res.status(200).send({
            success: true,
            message: 'Category Already Exists'
         })
      }

      const category = await new Category({ name, slug: slugify(name) }).save();

      res.status(201).send({
         success: true,
         message: 'new category created',
         category
      })

   } catch (error) {
      console.log(error);

      res.status(500).send({
         success: false,
         error,
         message: 'Error in the category'
      })
   }

}

//update category....
const updateCategoryController = async (req , res) => {
   try {

      const { name } = req.body;

      const { id } = req.params;

      const category = await Category.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

      res.status(200).send({
         success:true ,
         message:'category Updated Succesfully' ,
         category ,
      });


   }catch(error) {
      console.log(error);

      res.status(500).send({
         success: false,
         error,
         message: 'error while updating category !!'
      })
   }
}

//all category...
const categoryController = async(req , res)=>{
       try{
            const category = await Category.find({});

            res.status(200).send({
                success:true ,
                message:"All category List" ,
                category,
            }) ;
              
       }  
       catch(error){

         console.log(error);
         res.status(500).send({
            success: false,
            error,
            message: 'error while geting all  category !!'
         })       
       }
}

//single category...
const singleCategoryController = async (req , res) =>{
     
   try{        
           const category = await Category.findOne({slug:req.params.slug})

           res.status(200).send({
              success:true ,
              message:'Get Single Category Successfully' ,
              category 
           })
   } catch(error) {
       console.log(error);

       res.status(500).send({
           success:false ,
           error ,
           message: 'Error While getting Single Category' 
       })
   }
};

//delete category controller
const deleteCategoryController =  async(req , res)=>{
         try{
               const {id} = req.params ;

               await Category.findByIdAndDelete(id);

               res.status(200).send({
                  success:true ,
                  message:'Category Deleted Succesfully !!!' 
               })
         } 
         catch(error){
            console.log(error);

            res.status(500).send({
                success:false ,
                message:'error while deleting the product' ,
                error
            })

         }
}


module.exports = { createCategoryController, updateCategoryController , categoryController , singleCategoryController , deleteCategoryController };


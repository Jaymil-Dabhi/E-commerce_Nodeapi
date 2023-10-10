const Category = require("../models/categoryModel");

const addCategory = async(req,res)=>{

   try {

       const category_data = await Category.find();
       if(category_data.length > 0){

          let checking = false;
          for(let i=0;i<category_data.length;i++){
            if(category_data[i]['category'].toLowerCase() === req.body.category.toLowerCase()){
                checking = true;
                break;
            }
          }

          if( checking == false){
            const category = new Category({
                category:req.body.category
            });
       
            const cat_data = await category.save();
            res.status(200).send({success:true, msg:"Category Data",data:cat_data});
          }
          else{
            res.status(200).send({success:true, msg:"This Category ("+req.body.category+") is already exists."});
              
          }
       }
       else{
            const category = new Category({
                category:req.body.category
            });
       
            const cat_data = await category.save();
            res.status(200).send({success:true, msg:"Category Data",data:cat_data});
       }
   } catch (error) {
      res.status(400).send({success:false,msg:error.message});
   }

}

const get_categories = async(req,res)=>{
  try {
    const get_category = await Category.find( req.category_id );
    res.status(200).json(get_category);
      
        return Category.find();
  } catch (error) {
    res.status(400).send({success:false,msg:error.message});
  }
}


const update_categories = async(req,res)=>{

  try {
    // const category_data = await Category.find();
    const category_id = req.body.category_id;
    const category = req.body.category;
  
    const cat_data = await Category.findById(category_id);
  
    if (cat_data) {
      const updatedCategory = await Category.findByIdAndUpdate(
        category_id,
        { category: category }, // Update the 'category' field with the new value
        { new: true } // To return the updated document
      );
  
      res.status(200).send({
        success: true,
        msg: "Your category has been updated",
        data: updatedCategory,
      });
    } else {
      res.status(400).send({ success: false, msg: "Category not found!" });
    }
  } catch (error) {
    res.status(404).send({ success: false, msg: error.message });
  }
  
}

const delete_categories = async(req,res)=>{
  
  try {
    const category_id = req.body.category_id;

    const cat_data = await Category.findById(category_id);

    if (cat_data) {
      const deletedCategory = await Category.findByIdAndDelete(
        category_id,
        
        { new: true } // To return the updated document
      );
  
      res.status(200).send({
        success: true,
        msg: "Your category deleted",
        data: deletedCategory,
      });
    } else {
      res.status(400).send({ success: false, msg: "Category not found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
    addCategory,
    update_categories,
    get_categories,
    delete_categories
}
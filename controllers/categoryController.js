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
      // res.status(200).json(get_category);
        return Category.find();
  } catch (error) {
    res.status(400).send({success:false,msg:error.message});
  }
}


const update_categories = async(req,res)=>{

  try {
    const { category } = req.body;

    const updateCategory = await Category.findByIdAndUpdate(
      req.category_id,
      { category },
      { new: true }
    );
    if(!updateCategory){
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(updateCategory);
  
    
    
    // const cat_data = await category.save();
    // res.status(200).send({success:true, msg:"Category Updated",data:cat_data});
  } catch (error) {
    res.status(404).send({success:false,msg:error.message});
  }
  
}

const delete_categories = async(req,res)=>{
  try {
    const categoryId = req.category_id;

    // Find the category by ID and delete it
    const deletedCategory = await Category.findByIdAndRemove(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
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
const Subcategory = require("../models/subCategoryModel");

const create_subcategory = async(req,res)=>{

    
    try {
      const check_sub = await Subcategory.find();
      if (check_sub.some(sub => sub.sub_category.toLowerCase() === req.body.sub_category.toLowerCase())) {
          res.status(400).send({ success: false, msg: "This Sub-Category(" + req.body.sub_category + ") already exists." });
      } else {
          const subCategory = new Subcategory({
              category_id: req.body.category_id,
              sub_category: req.body.sub_category
          });
          const sub_cat_data = await subCategory.save();
          res.status(200).send({ success: true, msg: "Sub-Category details", data: sub_cat_data });
      }
      
        
    } catch (error) {
        res.status(400).send({ success:false,msg:error.message });
    }
}

const get_subcategories = async(req,res)=>{
    try {
      const get_subcategory = await Subcategory.find( req.category_id );
      res.status(200).json(get_subcategory);
        // res.status(200).json(get_category);
        //   return Category.find();
    } catch (error) {
      res.status(400).send({success:false,msg:error.message});
    }
}

const update_subcategories = async(req,res)=>{
    try {
        // const category_data = await Category.find();
        const subCategory_id = req.body.subCategory_id;
        const sub_category = req.body.sub_category;
      
        const sub_cat_data = await Subcategory.findById(subCategory_id);
      
        if (sub_cat_data) {
          const updatedSubCategory = await Subcategory.findByIdAndUpdate(
            subCategory_id,
            { sub_category: sub_category }, // Update the 'category' field with the new value
            { new: true } // To return the updated document
          );
      
          res.status(200).send({
            success: true,
            msg: "Your Subcategory has been updated",
            data: updatedSubCategory,
          });
        } else {
          res.status(400).send({ success: false, msg: "Subcategory not found!" });
        }
      } catch (error) {
        res.status(404).send({ success: false, msg: error.message });
      }
}

const delete_subcategories = async(req,res)=>{
    try {
        const sub_category_id = req.body.sub_category_id;
    
        const cat_data = await Subcategory.findById(sub_category_id);
    
        if (cat_data) {
          const deletedSubCategory = await Subcategory.findByIdAndDelete(
            sub_category_id,
            
            { new: true } // To return the updated document
          );
      
          res.status(200).send({
            success: true,
            msg: "Your subcategory deleted",
            data: deletedSubCategory,
          });
        } else {
          res.status(400).send({ success: false, msg: "subcategory not found!" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = {
   create_subcategory,
   get_subcategories,
   update_subcategories,
   delete_subcategories
}
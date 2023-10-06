const Subcategory = require("../models/subCategoryModel");

const create_subcategory = async(req,res)=>{

    
    try {
        const check_sub = await Subcategory.find({ category_id:req.body.category_id, sub_category: req.body.sub_category }).count();
        if(check_sub === 0){
            let checking = false;
            for(let i=0;i<check_sub.length;i++){
                if(check_sub[i]['sub_category'].toLowerCase() === req.body.sub_category.toLowerCase()){
                    checking = true;
                    break;
                }
            }

            if(checking === false){
                const subCategory = new Subcategory({
                    category_id:req.body.category_id,
                    sub_category:req.body.sub_category
                });
                const sub_cat_data = await subCategory.save();
                res.status(200).send({ success:true,msg:"Sub-Category details",data:sub_cat_data });
            }
            else{
                res.status(200).send({ success:true,msg:"This Sub-Category("+req.body.sub_category+") is already exits."});
                
            }
        }
        else{
            const subCategory = new Subcategory({
                category_id:req.body.category_id,
                sub_category:req.body.sub_category
            });
        }
        
        // const sub_cat_data = await Subcategory.save();
        // res.status(200).send({ success:true,msg:"Sub-Category details",data:sub_cat_data });

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
        const update_subcategory = await Subcategory.findById(req.category_id);
        if(!update_subcategory){
          res.status(400).send({success:false,msg:"Subcategory not found"});
        }
        if(update_subcategory.category_id.toString() !== req.category_id){
           res.status(403);
           throw new Error("Don't update the other subcategory");
        }
      
        const updateSubCategory = await Category.findByIdAndUpdate(
          req.category_id,
          req.body,
          { new: true }
        );
        res.status(200).json(updateSubCategory);
        // const cat_data = await category.save();
        // res.status(200).send({success:true, msg:"Category Updated",data:cat_data});
      } catch (error) {
        res.status(404).send({success:false,msg:error.message});
      }
}

const delete_subcategories = async(req,res)=>{
    try {
        const delete_subcategory = await Subcategory.findById(req.category_id);
        if(!delete_subcategory) {
            res.status(404);
            throw new Error("Category not found");
        }
        if(delete_subcategory.category_id.toString() !== req.category_id) {
            res.status(403);
            throw new Error("Don't have the permission to delete the category");
        }
        await Subcategory.remove();
    
        res.status(200).json(delete_subcategory);
      } catch (error) {
        res.status(404).send({success:false,msg:error.message});
      }
}

module.exports = {
   create_subcategory,
   get_subcategories,
   update_subcategories,
   delete_subcategories
}
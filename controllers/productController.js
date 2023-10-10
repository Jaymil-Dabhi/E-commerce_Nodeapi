const Product = require("../models/productModel");
const Category_controller = require("../controllers/categoryController");
const Store_controller = require("../controllers/storeController");


const add_product = async(req,res)=>{
    try {

        const product_data = await Product.find();
        if(product_data.length > 0){
            let checking = false;
            for(let i=0;i<product_data.length;i++){
              if(product_data[i]['name'].toLowerCase() === req.body.name.toLowerCase()){
                checking = true;
                break;
              }
            }

            if(checking == false){
              var arrImages = [];
              for(let i=0;i<req.files.length;i++){
                  arrImages[i] = req.files[i].filename;
              }
      
              var product = new Product({
                  vendor_id: req.body.vendor_id,
                  store_id: req.body.store_id,
                  name: req.body.name,
                  price: req.body.price,
                  discount: req.body.discount,
                  category_id: req.body.category_id,
                  sub_cat_id: req.body.sub_cat_id,
                  images: arrImages
              });
      
              const prod_data = await product.save();
      
              res.status(200).send({ success:true, msg:"product Details",data:prod_data });
            }
            else {
              res.status(400).send({ success:false, msg: "This Product ("+req.body.name+") is already exists."})
            }
        }

        else {
          var arrImages = [];
          for(let i=0;i<req.files.length;i++){
              arrImages[i] = req.files[i].filename;
          }
  
          var product = new Product({
              vendor_id: req.body.vendor_id,
              store_id: req.body.store_id,
              name: req.body.name,
              price: req.body.price,
              discount: req.body.discount,
              category_id: req.body.category_id,
              sub_cat_id: req.body.sub_cat_id,
              images: arrImages
          });
  
          const prod_data = await product.save();
  
          res.status(200).send({ success:true, msg:"product Details",data:prod_data });
        }
        

    } catch (error) {
        res.status(400).send({ success:false,msg:error.message });
    }
}

//get products method

const get_products = async(req,res)=>{
    try {
        var send_data = [];
        var cat_data = await Category_controller.get_categories();
        if (cat_data.length > 0) {
            for(let i=0; i<cat_data.length; i++){
                var product_data = [];
                var cat_id = cat_data[i]['_id'].toString();
                var cat_pro = await Product.find({category_id:cat_id});
                if(cat_pro.length > 0){
                    for(let j=0; j<cat_pro.length;j++){
                        var store_data = await Store_controller.get_store(cat_pro[j]['store_id']);
                        product_data.push(
                            {
                                "product_name":cat_pro[j]['name'],
                                "images":cat_pro[j]['images'],
                                "store_address":store_data['address']
                            }
                        )
                    }
                }
                send_data.push({
                    "category":cat_data[i]['category'],
                    "product":product_data
                });
            }
            res.status(200).send({success:true, msg:"Product Details",data:send_data});
        } else {
            res.status(400).send({ success:false,msg:"Product Details",data:send_data });
        }
    } catch (error) {
        res.status(400).send({ success:false,msg:error.message });
    }
}

const update_product = async(req,res)=>{
   try {
      const product_id = req.body.product_id;
      const name = req.body.name;
      const price = req.body.price;
      const discount = req.body.discount;

      const product_data = await Product.findById(product_id);
     if(product_data){
      const updatedProduct = await Product.findByIdAndUpdate(
        product_id,
        {
           name: name,
           price: price,
           discount: discount,
        },
        { new: true }
      );

      if(!updatedProduct){
        return res.status(404).json({ success: false, msg: 'Product not found' });
      }

      return res.status(200).json({
        succes: true,
        msg: "Product updated successfully",
        data: updatedProduct,
      });
    } else {
        res.status(400).send({ success: false, msg: "product not found!" });
    }
   } catch (error) {
      res.status(400).send({ success:false,msg:error.message });
   }
}

const delete_product = async(req,res)=>{
  
    try {
        const product_id = req.body.product_id;
  
      const product_data = await Product.findById(product_id);
  
      if (product_data) {
        const deletedProduct = await Product.findByIdAndDelete(
            product_id,
          
          { new: true } // To return the updated document
        );
    
        res.status(200).send({
          success: true,
          msg: "Your product deleted",

          
          data: deletedProduct,
        });
      } else {
        res.status(400).send({ success: false, msg: "Product not found!" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // serach product

  const searchProduct = async(req,res)=>{
     try {
        var search = req.body.search;
        var product_data = await Product.find({ $text: { $search: search } } && { "name":{ $regex: ".*"+search+".*", $options:'i'}} && { name: { $regex: search }});

        if(product_data.length > 0 ){
            res.status(200).send({ success:true,msg:"Product details", data:product_data });
        }
        else {
          res.status(400).send({ success:false, msg:"products not found! "});
        }
     } catch (error) {
       res.status(400).send({ success:false, msg:error.message });
     }
  }

module.exports = {
   add_product,
   get_products,
   update_product,
   delete_product,
   searchProduct
}
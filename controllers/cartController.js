const Cart = require("../models/cartModel");
const User = require("../models/userModel");

const add_to_cart = async(req,res)=>{
   try {
        // const userId = req.body.user_id;

        // Query the cart data for the user
        // const cartData1 = await Cart.find({ vendor_id: userId });
       
    //    const product_id = req.body.product_id;
    //    const price = req.body.price;
    //    const user_id = req.body.user_id;
    //    const user_name = req.body.user_name;

    const { product_id, price } = req.body;
    const user_id = req.body.user_id;



       const user = await User.findById(user_id);

       if(!user){
        return res.status(404).json({  success: false, msg: "User not found" });
       }
        console.log('User name:', user.name);

        const cart_obj = new Cart({
           product_id,
           price,
           user_id,
           name: user.name,
        
       });
       const cartData = await cart_obj.save();

       console.log('Cart Data:', cartData);
    
       res.status(200).send({ success:true ,msg:"Cart Product detail",data:cartData});
   } catch (error) {
       res.status(400).send({ success:false,msg:error.message });
   }
}

module.exports = {
    add_to_cart
}
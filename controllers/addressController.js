const Address = require("../models/addressModel");

const add_address = async(req,res)=>{
     try {
        const data = await Address.findOne({ user_id:req.body.user_id });

        if(data){
             
            var addAddress = [];
            for(let i=0; i<data.address.length; i++){
                addAddress.push(data.address[i]);
            }
            addAddress.push(req.body.address);
            const updated_data = await Address.findOneAndUpdate(
                {user_id:req.body.user_id},
                {$set:{ address:addAddress }},
                {returnDocument:"after"}     
            );
            
            res.status(200).send({ success:true,msg:"address details",data:updated_data });

        }
        else{
            const address = new Address({
                user_id:req.body.user_id,
                address:req.body.address
            });
    
            const address_data = await address.save();
    
            res.status(200).send({ success:true,msg:"address details",data:address_data });
        }

        
     } catch (error) {
        res.status(400).send({ success:false,msg:error.message });
     }
}

module.exports = {
    add_address
}
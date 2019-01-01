const mongoose=require('mongoose');
var zipCode=mongoose.model('zipcode',{
    pincode:
    {
        type:String,
        require:true
     }


});
module.exports={zipCode};

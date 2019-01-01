const mongoose=require('mongoose');
var geoLocation=mongoose.model('geoLocation',{
    latitude:
    {
        type:Number,
        require:true,  },
    longitude:
    {
        type:Number,
        require:true  },

});
module.exports={geoLocation};

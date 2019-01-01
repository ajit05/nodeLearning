const mongoose=require('mongoose');
var temperature=mongoose.model('temperature',{
    currentTemperatue:
    {
        type:Number,
        require:true,
    },
    apperentTemperture:
    {
        type:Number,
        require:true
    },
    humidity:
    {
      type:Number,
    }

});
module.exports={temperature};

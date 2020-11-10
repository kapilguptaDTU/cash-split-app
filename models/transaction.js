  
var mongoose = require("mongoose");

var transactionSchema = new mongoose.Schema({
   
    value:{
        type:Number,
        default:0
    },
    from:String,
    to:String,
    doneBy:String,
    fromID:Number,
    toID:Number,
    doneByID:Number,
    
  
});

module.exports = mongoose.model("Transaction", transactionSchema);


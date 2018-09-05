var mongoose=require('../configs/db_config.js');

var adminSchema=new mongoose.Schema({
	username:String,
	password:String,
	tel:String
});

var adminModel=mongoose.model('admin',adminSchema);

module.exports=adminModel;

var mongoose=require('../configs/db_config.js');

var articleSchema=new mongoose.Schema({
	itemId:{
		type:'ObjectId',
		//关联的集合
		ref:'item'
	},
	title:String,
	author:String,
	keywords:String,
	description:String,
	imgurl:String,
	content:String,
	ctime:{
		type:Date,
		default:new Date()
	}
})

var articleModel=mongoose.model('article',articleSchema);

//暴露articleModel
module.exports=articleModel;
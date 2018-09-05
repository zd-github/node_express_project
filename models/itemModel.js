//引入数据库的配置文件
var mongoose=require('../configs/db_config.js');

//2.定义一个item集合的骨架（用来约束集合的，告诉集合需要存储哪些属性）
var itemSchema=new mongoose.Schema({
	name: String,
	info: String,
	ctime:{
		type: Date,
		default: new Date()
	},
	order: Number
});

//3.创建数据库模型  在数据库里会变成 复数  item-->items
var itemModel=mongoose.model('item',itemSchema);





//暴露itemModel
module.exports=itemModel;

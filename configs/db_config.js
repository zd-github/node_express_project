//引入mongoose模块
var mongoose=require('mongoose');

//数据库地址
var DBURL='mongodb://localhost:27017/sanwen';

//1.链接 数据库
mongoose.connect(DBURL,function(err){
	if(err){
		console.log('数据库连接失败');
	}else{
		console.log('数据库链接成功');
	}
});


//暴露mongoose
module.exports=mongoose;

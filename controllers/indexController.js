//引入item数据库模型
var itemModel=require('../models/itemModel.js');
//引入article数据库模型
var articleModel=require('../models/articleModel.js');

//前台控制器对象
var indexController={};

//首页  sort排序  exec查询结束后调用回调函数
indexController.Index=function(req,res,next){
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			res.send('数据插入失败');
		}else{
			
			getItemArticles(0);
			function getItemArticles(i){
				articleModel.find({itemId:data[i]._id}).limit(5).exec(function(err,articles){
					data[i].articleList=articles;
					if(i<data.length-1){
						getItemArticles(++i);
					}else{
						res.render('index',{items:data});
					}
				})
			}


			// articleModel.find({},function(error,articleData){
			// 	if(error){
			// 		console.log('查询数据失败');
			// 	}else{
			// 		res.render('index',{items:data,articles:articleData});
			// 	}
			// })
		}
	})
}


module.exports=indexController;
//管理员控制器
var adminController={};
//引入item数据库模型
var itemModel=require('../models/itemModel.js');
//引入item 数据库模型
var articleModel=require('../models/articleModel.js');
//引入admin数据库模型
var adminModel=require('../models/adminModel.js');
//引入md5模块 用来加密密码
var md5=require('md5');


//管理员首页
adminController.Index=function(req,res){
	//判断用户是否登录 看session 里面有没有 user 属性 ;如果用户没有登录  就跳转到登录页面
	if(!req.session.user) res.redirect('/admin/login');

	//多页面共享session ,res.locals.user 
	console.log(res.locals.user); //登录成功的用户信息 存在session中

	res.render('admin/index');
}
//添加栏目页面
adminController.ItemAdd=function(req,res){
	//判断用户是否登录 看session 里面有没有 user 属性 ;如果用户没有登录  就跳转到登录页面
	if(!req.session.user) res.redirect('/admin/login');

	res.render('admin/itemAdd');
}
//插入栏目数据
adminController.ItemInsert=function(req,res){
	itemModel.create(req.body,function(err){
		if(err){
			console.log('插入数据失败');
		}else{
			res.redirect('/admin/itemList');
		}
	})
}
//栏目列表页面
adminController.ItemList=function(req,res){
	//判断用户是否登录 看session 里面有没有 user 属性 ;如果用户没有登录  就跳转到登录页面
	if(!req.session.user) res.redirect('/admin/login');

	itemModel.find({},function(err,data){
		if(err){
			console.log('读取数据失败');
		}else{
			res.render('admin/itemList',{data:data});
		}
	})
}
//编辑栏目页面
adminController.ItemEdit=function(req,res){
	//判断用户是否登录 看session 里面有没有 user 属性 ;如果用户没有登录  就跳转到登录页面
	if(!req.session.user) res.redirect('/admin/login');

	itemModel.find({_id:req.params._id},function(err,data){
		if(err){
			console.log('读取数据失败');
		}else{
			res.render('admin/itemEdit',{data:data[0]});
		}
	})
}
//更新栏目数据
adminController.ItemUpdate=function(req,res){
	itemModel.update({_id:req.body._id},req.body,function(err){
		if(err){
			console.log('更新数据失败');
		}else{
			res.redirect('/admin/itemList');
		}
	})
}
//删除栏目
adminController.ItemDel=function(req,res){
	itemModel.remove({_id:req.params._id},function(err){
		if(err){
			console.log('删除数据失败');
		}else{
			res.redirect('/admin/itemList');
		}
	})
}

//发布文章
adminController.ArticleAdd=function(req,res){
	//判断用户是否登录 看session 里面有没有 user 属性 ;如果用户没有登录  就跳转到登录页面
	if(!req.session.user) res.redirect('/admin/login');

	itemModel.find({},function(err,data){
		if(err){
			console.log('读取数据失败');
		}else{
			res.render('admin/articleAdd',{items:data});
		}
	})
}
//插入文章数据
adminController.ArticleInsert = function(req,res){
	var imgType = ['image/jpeg','image/png','image/gif'];
	var fileSize = 1024 * 1024 * 5;
	var imgPath = 'uploads';
	var imgUpload = require('../configs/imgUpload_config.js');
	
	var upload = imgUpload(imgPath,imgType,fileSize).single('imgurl');  //imgurl 表单中文件上传input的name属性值
	upload(req,res,function(err){
		if(err){
			res.send('图片上传失败');
		}else{
			// 获取上传图片的名称  给 req.body
			req.body.imgurl =  req.file.filename;
			// 插入数据
			articleModel.create(req.body,function(error){
				if(error){
					res.send('数据插入失败');
				}else{
					res.redirect('/admin/articleList');
				}
			})
		}
	})
}

//文章列表
adminController.ArticleList=function(req,res){
	//判断用户是否登录 看session 里面有没有 user 属性 ;如果用户没有登录  就跳转到登录页面
	if(!req.session.user) res.redirect('/admin/login');

	// console.log(req);
	var page=req.query.page?req.query.page:1;  //当前页码
	var pageSize=4;

	articleModel.find().count(function(err,total){
		var maxPageNumber=Math.ceil(total/pageSize);
		if(page<1) page=1;
		if(page>maxPageNumber) page=maxPageNumber;

		var offsetPage=pageSize*(page-1);  //数据偏移量skip  当前页面从哪条数据开始读取

		//populate  跨表查询  article集合(ref)关联了item集合itemId
		//exec()  查询结束之后调用回调函数
		articleModel.find({}).limit(pageSize).skip(offsetPage).populate('itemId',{name:1}).exec(function(err,data){
			if(err){
				res.send('查询数据失败');
			}else{
				// console.log(data);
				res.render('admin/articleList',{articles:data,maxPageNumber:maxPageNumber,page:page});
			}
		})
	})
}

//编辑文章页面
adminController.ArticleEdit=function(req,res){
	//判断用户是否登录 看session 里面有没有 user 属性 ;如果用户没有登录  就跳转到登录页面
	if(!req.session.user) res.redirect('/admin/login');

	articleModel.find({_id:req.params._id},function(err,data){
		if(err){
			console.log('读取数据失败');
		}else{
			itemModel.find({},function(err,itemsdata){
				if(err){
					console.log('读取数据失败');
				}else{
					res.render('admin/articleEdit',{data:data[0],items:itemsdata});
				}
			})
		}
	})
}

//更新文章数据  
adminController.ArticleUpdate=function(req,res){
	req.body.ctime=new Date();
	articleModel.update({_id:req.body._id},req.body,function(err){
		if(err){
			console.log('更新数据失败');
		}else{
			res.redirect('/admin/articleList');
		}
	})
}

//更新文章封面
adminController.ArticleImgUpdate=function(req,res){
	var imgType = ['image/jpeg','image/png','image/gif'];
	var fileSize = 1024 * 1024 * 5;
	var imgPath = 'uploads';
	var imgUpload = require('../configs/imgUpload_config.js');
	
	var upload = imgUpload(imgPath,imgType,fileSize).single('imgurl');  //imgurl 表单中文件上传input的name属性值
	upload(req,res,function(err){
		if(err){
			res.send('图片上传失败');
		}else{
			articleModel.update({_id:req.body._id},{$set:{imgurl:req.file.filename}},function(error){
				if(error){
					res.send('数据插入失败');
				}else{
					res.redirect('/admin/articleList');
				}
			})
		}
	})
}

//删除文章
adminController.ArticleRemove=function(req,res){
	articleModel.remove({_id:req.params._id},function(err){
		if(err){
			console.log('删除失败');
		}else{
			//跳转  page??

			res.redirect('/admin/articleList');
		}
	})
}

//添加管理员
adminController.AdminAdd=function(req,res){
	//判断用户是否登录 看session 里面有没有 user 属性 ;如果用户没有登录  就跳转到登录页面
	if(!req.session.user) res.redirect('/admin/login');

	res.render('admin/adminAdd');
}
//插入管理员数据
adminController.AdminInsert=function(req,res){
	//判断验证码
	if(req.session.code!=req.body.code){
		console.log('验证码不正确');
		return;
	}
	//判断密码
	if(req.body.password!=req.body.password1){
		res.send('两次输入的密码不一致');
	}

	//去除用户名两端的空白字符
	var username=req.body.username.trim();

	//获取管理员数据
	var userdata={
		username:username,
		password:md5(req.body.password),
		tel:req.body.tel
	}

	adminModel.create(userdata,function(err){
		if(err){
			res.send('添加管理员失败');
		}else{
			res.send('添加管理员成功');
		}
	})

}
//验证码
adminController.Code=function(req,res){
	//引入验证码模块
	var captchapng=require('captchapng');
	//验证码
	var code=parseInt(Math.random()*9000+1000);
	//把验证码存入session
	req.session.code=code;

	var p=new captchapng(80,30,code);
	p.color(0,0,0,0);
	p.color(80,80,80,255);

	var img=p.getBase64();
	var imgbase64=new Buffer(img,'base64');
	res.send(imgbase64);

}
//登录页面
adminController.Login=function(req,res){
	res.render('admin/login',{err:''});
}
//管理员登录验证
adminController.AdminLogin=function(req,res){
		//判断验证码
	if(req.session.code!=req.body.code){
		console.log('验证码不正确');
		res.redirect('/admin/login');
		return;
	}

	//去除用户名和密码两端的空白字符
	var username=req.body.username.trim();
	var password=req.body.password.trim();
	//加密密码
	var psd=md5(password);

	adminModel.findOne({username:username},function(err,data){
		if(data==null){
			console.log('用户不存在');
			res.redirect('/admin/login');
		}else{ 
			if(psd==data.password){
				//将登录成功的用户信息存入session
				req.session.user=data;

				res.redirect('/admin');
			}else{
				console.log('用户名或者密码错误');
				res.redirect('/admin/login');
			}
		}
	})
}

//退出登录
adminController.Logout=function(req,res){
	//清除sessionxinxi
	req.session.user=null;

	res.redirect('/admin/login');
}



//暴露adminController控制器
module.exports=adminController;
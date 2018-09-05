var path=require('path');
var timestamp=require('time-stamp');
var uid=require('uid');
var multer=require('multer');

/*
*功能：图片上传
*参数：
	imgPath---string  图片保存路径
	imgType---array   允许上传图片的类型  例：['image/jpeg','image/png','image/gif']
	fileSize---number  允许上传图片的大小 单位：字节
*返回值：upload---object   文件上传的对象
*作者：simon
*版本：1.0
日期：2018-07-12
*/

function imgUpload(imgPath,imgType,fileSize){
	var storage=multer.diskStorage({
		destination:function(req,file,cb){
			cb(null,imgPath);
		},
		filename:function(req,file,cb){
			// console.log(file);
			// { fieldname: 'imgurl',
			//   originalname: 'IMG_0074.JPG',
			//   encoding: '7bit',
			//   mimetype: 'image/jpeg' }
			
			var extname=path.extname(file.originalname);
			cb(null,file.fieldname+'-'+timestamp('YYYYMMDD')+'-'+uid()+extname);
		}
	})

	function fileFilter(req,file,cb){
		if(imgType.indexOf(file.mimetype)==-1){
			cb(null,false);
			cb(new Error('文件格式不正确'));
		}else{
			cb(null,true);
		}
	}

	var upload=multer({
		storage:storage,
		fileFilter:fileFilter,
		limits:{
			fileSize:fileSize
		}
	})

	return upload;

}


//暴露上传图片
module.exports=imgUpload;
var express = require('express');
var router = express.Router();

//引入admin的控制器
var adminController=require('../controllers/adminController.js');

/* 管理员首页 */
router.get('/', adminController.Index);
//添加栏目页面
router.get('/itemAdd',adminController.ItemAdd);
//插入栏目数据
router.post('/itemInsert',adminController.ItemInsert);
//栏目列表页面
router.get('/itemList',adminController.ItemList);
//栏目编辑页面
router.get('/itemEdit/:_id',adminController.ItemEdit);
//更新栏目数据
router.post('/itemUpdate',adminController.ItemUpdate);
//删除栏目
router.get('/itemDel/:_id',adminController.ItemDel);
//发布文章页面
router.get('/articleAdd',adminController.ArticleAdd);
//插入文章
router.post('/articleInsert',adminController.ArticleInsert);
//文章列表
router.get('/articleList',adminController.ArticleList);
//编辑文章页面
router.get('/articleEdit/:_id',adminController.ArticleEdit);
//更新文章数据
router.post('/articleUpdate',adminController.ArticleUpdate);
//更新文章封面
router.post('/articleImgUpdate',adminController.ArticleImgUpdate);
//删除文章
router.get('/articleRemove/:_id',adminController.ArticleRemove);


//添加管理员
router.get('/adminAdd',adminController.AdminAdd);
//插入管理员数据
router.post('/adminInsert',adminController.AdminInsert);
//验证码
router.get('/code',adminController.Code);
//登录页面
router.get('/login',adminController.Login);
//管理员登录验证
router.post('/adminLogin',adminController.AdminLogin);
//退出登录
router.get('/logout',adminController.Logout);

//暴露router路由
module.exports = router;

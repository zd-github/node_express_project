var express = require('express');
var router = express.Router();

//引入index的控制器
var indexController=require('../controllers/indexController.js');

/* 前台首页*/
router.get('/',indexController.Index);


module.exports = router;

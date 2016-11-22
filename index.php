<?php
/**
 * ceshop
 * @author: WangLu
 * @email:wanglu@300.cn
 * @create at: 2016/1/6
 * @copyright: 中企动力科技股份有限公司 300.cn All Rights Reserved
 */
header("Content-type: text/html; charset=utf-8");
date_default_timezone_set('Asia/Shanghai');
define('ROOT_PATH',realpath(dirname(__FILE__)));
define('CORE_PATH',ROOT_PATH.'/Core');
define('STORAGE_PATH',ROOT_PATH.'/Storage');
require_once (CORE_PATH.'/Core.php');
require ROOT_PATH . '/vendor/autoload.php';
\Core\Core::start();
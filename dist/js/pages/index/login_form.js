(function(){
	/*
	 * 智能机浏览器版本信息:
	 *
	 */
	var browser = {
		versions: function() {
			var u = navigator.userAgent, app = navigator.appVersion;
			return {
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1
			};
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	}
	var ios_c=browser.versions.iPhone;
	/*
	 功能：获取cookies函数
	 参数：name，cookie名字
	 */
	function getCookie(name){
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		if(arr != null){
			return unescape(arr[2]);
		}else{
			return null;
		}
	}

	//注册登录页面
	var $user=$(".user"),     //首页登陆按钮
		$body=$("body"),      //body
		$user_login=$(".user_login"),   //登录页面  注册按钮
		$us_ad=$(".us_ad"),				//免费试用==注册按钮
		$register_btn=$(".register_btn"),
		$main_last_btn=$(".main_last_btn"),
		$login_user=$("#login_user"),    //整个登录注册大盒子
		$activity_btn=$("#activity_btn"),    //首页活动的立即参与按钮
		$login=$(".login"),             //登录页面
		$signUp=$(".signUp"),            //注册页面
		$user_reg=$(".user_reg"),
		$user_admin=$(".user_admin");     //注册页面下面的登陆按钮

	$user.on("click",function(){     //进入登录页面
		$body.addClass("modal-open");
		if(ios_c){
			$body.css("padding-right","0px");
		}else{
			$body.css("padding-right","17px");

		}
		//var host = window.location.host;
		var url = ucenterUrl+'/index.php/Ucenter/Login/loginCheck';
		var login_name = getCookie('username');
		//console.log('username==',login_name);
		$.ajax(url, {
			data: {
				'username':login_name
			},
			dataType: 'jsonp',
			crossDomain: true,
			success: function(data) {
				if(data.code == 0){
					$login_user.show();
					$login.show();
				}else if(data.code == 1){
					window.location.href=ucenterUrl+"/index.php/Ucenter/Index/index"
				}
			}
		});

	});
	$user_login.on("click",function(){
		show_user();
	});
	$us_ad.on("click",function(){
		show_user();
	});
	$register_btn.on("click",function(){
		show_user();
	});
	$main_last_btn.on("click",function(){
		show_user();
	});
	$user_reg.on("click",function(){
		show_user();
	});
	$activity_btn.on("click",function(){
		show_user();
	});
	//banner  免费试用 登录
	$(".y_banner").on("click",".y_btn",function(){
		show_user();
	})
	function show_user(){         //进入注册页面
		if(!$body.hasClass("modal-open")){
			$body.addClass("modal-open");
			if(ios_c){
				$body.css("padding-right","0px");
			}else{
				$body.css("padding-right","17px");
			}
		}
		$login_user.show();
		$login.hide();
		$signUp.show();

	}
	$user_admin.on("click",function(){
		$login.show();
		$signUp.hide();
	})
	/*$(".denglu").on("click",function(){
	 $body.removeClass("modal-open");
	 $login_user.hide();
	 $login.hide();
	 $signUp.hide();
	 })*/
	//关闭按钮
	$(".login_close").on("click",function(){
		$body.removeClass("modal-open");
		$body.css("padding-right","0px");
		$login_user.hide();
		$login.hide();
		$signUp.hide();
	})
    function login_close(){
		$body.removeClass("modal-open");
		$body.css("padding-right","0px");
		$login_user.hide();
		$login.hide();
		$signUp.hide();
	}
	/*设置默认选中服务条款*/
	init();
function init(){
    var cboxed=$("#boxk").prop("checked"); 
    var tp_box=$("#tp_chebox").prop("checked"); 
    if(cboxed){
        $("#user_submit").attr("disabled",false).css("background","#7ab55c");
    }else{
        $("#user_submit").attr("disabled",true).css("background","#aaa");

    }
    if(tp_box){
    	$(".shap_btn").css("background","#7ab45d").attr("disabled",false);
    }else{
    	$(".shap_btn").css("background","#aaa").attr("disabled",true);
    }
}
$("#boxk").on("click",function(){
	init();
})
$("#tp_chebox").on("click",function(){
	init();
})
$(document).ready(function () { //  滚动加载动画
	    $(window).scroll(function () {
	        var w_top=$(window).scrollTop();     //这个方法是当前滚动条滚动的距离
	        //$(window).height()获取当前窗体的高度
	        //$(document).height()获取当前文档的高度
	      if(w_top<=900){
	      	    $("#fixed_top").hide();
	      }else{
	      	$("#fixed_top").show();
	      }
	    });
	    
	});
	
	$("#fixed_top").on("click","div",function(){
		$('html,body').animate({"scrollTop":0},300);
	});
	/*登录 注册 焦点验证*/

	/*每个页面中固定的联系方式*/
	var $fixed_con=$("#fixed_contact");
	var $fixed_fold_con=$("#fixed_fold_contact");
	$fixed_con.find(".close_con").on("click",function(){
		$fixed_con.hide();
		$fixed_fold_con.show()
	});
	$fixed_fold_con.find(".close").on("click",function(){
		$fixed_fold_con.hide();
		$fixed_con.show()
	});


	
})(jQuery);

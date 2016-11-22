
(function(){
	//首页banner 焦点图
	function banAuto(){
		var i,timer,M,$uls,$lis,$ols,$los;
		i=1;
		timer=null;
		M=$(".ban_uls li").width();
		$uls=$(".ban_uls");
		$lis=$(".ban_uls li");
		$los=$(".ban_nav li");
		li_len=$lis.length;
		lo_len=$los.length;
		//console.log(li_len);  ok
		//console.log(lo_len);   ok
		function change(){
			$uls.stop().animate({"left":-i*M},300,function(){
					if(i>=li_len-1) $uls.css("left",-M+"px");
					$lis.eq(i).find(".lis_con").show();
					if(i==5){
						$lis.eq(1).find(".lis_con").show();
						$lis.eq(1).siblings().find(".lis_con").hide();
					}else{
						$lis.eq(i).find(".lis_con").show();
					    $lis.eq(i).siblings().find(".lis_con").hide();
					}
			});
			for(var j=lo_len-1;j>=0;j--){
				$los.eq(j).attr("class","");
			}
			if(i>=li_len-1){
				$los.eq(0).addClass("cur");
			}else{
				$los.eq(i-1).addClass("cur");
			}
		}
		function autoPlay(){
			timer=setInterval(function(){
				i++;
				if(i>=li_len){
					i=2;
				}
				change();
			},4000);
		}
		function conline(){
			autoPlay();
			for(var j=0;j<lo_len;j++){
				$los.eq(j).index=j;
				$los.eq(j).on("mouseover",function(){
					clearInterval(timer);
					i=$(this).index()+1;
					change();
				}).on("mouseout",function(){
					autoPlay();
				})
			}
		}
		conline();
	}
	/*为了活动暂时让首页的轮播图变为静止*/
	/*banAuto();*/
	//首页精品案例图片轮播
	function IMgAuto(){
	var i,w,case_uls,len;
			i=0;
			$case_uls=$(".case_uls");
			w=$(".lis_case").width();
			case_uls=$('.case_uls').width();
			len=$(".case_uls>li").length;
			$(".ols_left").on("click",function(){
				i++;
				if(i>=len-3){
					i=len-3;
				}
				$case_uls.animate({"margin-left":-i*w+"px"},300);
			})
			$(".ols_right").on("click",function(){
				i--;
				if(i<=0){
					i=0;
				}
				$case_uls.animate({"margin-left":-i*w+"px"},300);
			})
	}
	IMgAuto();
	$(document).ready(function () { //本人习惯这样写了
	    $(window).scroll(function () {
	        var w_top=$(window).scrollTop();     //这个方法是当前滚动条滚动的距离
	        //$(window).height()获取当前窗体的高度
	        //$(document).height()获取当前文档的高度
	       
	      if(w_top>=300){
	      		$(".items").addClass("active");
	      }
	      if(w_top>=1800){
	      	    $(".sp_open_text").addClass("zoomInDown");
	      		$(".sp_open_btn").addClass("bounceInUp");
	      }
	        
	    });
	});
	/*首页鼠标移入的晃动*/
	$(".adv_img1,.adv_img2,.adv_img3,.adv_img4").mouseover(function(){
		$(this).addClass("animated tada")
	}).mouseout(function(){
		$(this).removeClass("animated tada")
	});
	$(".eff_img1").mouseover(function(){
		$(this).addClass("animated shake")
	}).mouseout(function(){
		$(this).removeClass("animated shake")
	});
	
})(jQuery);


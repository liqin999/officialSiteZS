(function(){
    function checkInput(username){
        var regEmail = /(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$)|(^$)/;
        var regPhone = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
        if(regPhone.test(username) || regEmail.test(username)){
            return true
        }else{
            return false;
        }
    }
    function checkPassword(password) {
        var regPassword = /^[a-zA-Z0-9]{6,12}$/;
        if(regPassword.test(password)){
            return true;
        }else{
            return false;
        }
    }
    function checkWeb(url) {
        var regPassword = /^[a-z][a-z0-9]{5,11}$/;
        if(regPassword.test(url)){
            return true;
        }else{
            return false;
        }
    }
    /* 
     功能：保存cookies函数  
     参数：name，cookie名字；value，值 
     */
    function SetCookie(name,value){
        var Days = 30;   //cookie 将被保存一月
        var exp  = new Date();  //获得当前时间
        exp.setTime(exp.getTime() + Days*24*60*60*1000);  //换成毫秒
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }
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
    var ctr = true;
    $("#login_submit").click(function(e){
        var Email = $("#tet").val();
        var password = $("#pasd").val();
        var valid = $("#verify_code").val();
        var $body=$("body"),      //body
            $login_user=$("#login_user"),    //整个登录注册大盒子
            $login=$(".login"),             //登录页面
            $signUp=$(".signUp");         //注册页面

        if(Email == '')
        {
            alert("请输入手机号码");
            $(".Email").focus();
            return false;
        }else
        {
            if(!(checkInput(Email)))
            {
                alert('请输入正确的手机号');
                $(".Email").focus();
                return false;
            }
        }
        if(password == '')
        {
            alert("请输入登录密码");
            $("#pasd").focus();
            return false;
        }
        if(valid == '')
        {
            alert("请输入验证码");
            $("#verify_code").focus();
            return false;
        }
        /*表单提交Ajax提交部分
        $.post(rootUrl+"/Ucenter/Login/islogin",{"Email":Email,"password":password,"valid":valid},function(data){

            if(data.status == "success"){
                alert('登录成功');
                //$(".y_suer").removeClass('disabled').html(Email);
                //$(".user").addClass('disabled');
                location.href = rootUrl+'/Ucenter/Index/index';
                // $body.removeClass("modal-open");
                // $body.css("padding-right","0px");
                // $login_user.hide();
                // $login.hide();
                // $signUp.hide();
                return true;
            }else{
                alert(data.msg);
                $("#tet").focus();
                return false;
            }

        },"json")
        return false;*/
        var login_url = ucenterUrl+"/index.php/Ucenter/Login/islogin";
        $.ajax(login_url, {
            data: {
                "Email":Email,
                "password":password,
                "valid":valid,
            },
            dataType: 'jsonp',
            crossDomain: true,
            success: function(data) {
                if(data.status == "success"){
                    alert('登录成功');
                    SetCookie('username',Email);
                    location.href = ucenterUrl+'/index.php/Ucenter/Index/index';
                    return true;
                }else{
                    alert(data.msg);
                    $("#tet").focus();
                    return false;
                }
            }
        });
        return false;
    });


    /**
     * 刷新验证码
     */
    $(".login_com").click(function () {
        var path = ucenterUrl+"/index.php/Ucenter/Login/verify?id="+new Date().getTime();
        //console.log('111',path);
        $("#verify").attr("src",path);
    });

    /**
     * 发送验证码
     */

    $(".sendSms").click(function () {
        if(ctr){
            var mobile = $("#tetx").val();
            //if(mobile == ''){
            //    alert('请输入手机号');
            //    $("#tetx").focus();
            //    return false;
            //}else {
            //    if (!(checkInput(mobile))) {
            //        alert('请输入正确的手机号');
            //        $("#tetx").focus();
            //        return false;
            //    }
            //}
            if(mobile == ''){
                alert('请输入手机号');
                $("#tetx").focus();
                return false;
            }else if (!(/^1[3|4|5|8]\d{9}$/.test(mobile))) {
                    alert('请输入正确的手机号');
                    $("#tetx").focus();
                    return false;
            }

            validCode();


            /*表单提交Ajax提交发送验证码部分*/
            /*$.post("http://my.shopce.cn/index.php/Ucenter/Login/sendSms",{"mobile":mobile},function(data){
                if(data.status == "success"){
                    alert(data.msg);
                }else{
                    alert(data.msg);
                }
            },"json")*/
            var sms_url = ucenterUrl+"/index.php/Ucenter/Login/sendSms";
            $.ajax(sms_url, {
                data: {
                    "mobile":mobile
                },
                dataType: 'jsonp',
                crossDomain: true,
                success: function(data) {
                    if(data.status == "success"){
                        alert(data.msg);
                    }else{
                        alert(data.msg);

                    }
                }
            });
            return false;
        }
        //alert('1111');


    });



    /*函数部分*/
    function validCode(){
        var curTime=60;
        $(".sendCode").html("60秒后重发");
        ctr = false;
        timer1=window.setInterval(function(){
            //$(".sendCode").removeClass('sendSms');
            curTime--;
            $(".sendCode").html(curTime+"秒后重发");
            if(curTime==0){
                clearInterval(timer1);
                $(".sendCode").html("立即发送验证码");
                ctr = true;
            }
        },1000);
    }


    /*注册提交*/
    /*表单提交部分*/
    $("#user_submit").click(function(){
        var Ephone = $("#tetx").val();
        var valid = $("#valid").val();
        var password = $("#password").val();
        var repassword = $("#pasd_t").val();
        var shopUrl = $("#pasd_scwz").val();
        var name = $("#name").val();
        if(Ephone == ''){
            alert('请输入手机号');
            $("#tetx").focus();
            return false;
        }else {
            if (!(checkInput(Ephone))) {
                alert('请输入正确的手机号');
                $("#tetx").focus();
                return false;
            }
        }

        if(name == ''){
            alert('请输入联系人姓名');
            $("#name").focus();
            return false;
        }
        if(valid == ''){
            alert('请输入验证码');
            $("#valid").focus();
            return false;
        }

        if(password == ''){
            alert('请输入密码');
            $("#password").focus();
            return false;
        }else{
            if(!(checkPassword(password))){
                alert('密码输入格式不正确,请重新输入');
                $("#password").focus();
                return false;
            }
        }

        if(repassword == ''){
            alert('请输入确认密码');
            $("#pasd_t").focus();
            return false;
        }else{
            if(!(checkPassword(repassword))){
                alert('确认密码输入格式不正确,请重新输入');
                $("#pasd_t").focus();
                return false;
            }
        }

        if(password != repassword){
            alert('两次密码匹配不正确');
            $("#pasd_t").focus();
            return false;
        }
        if(shopUrl == ''){
            alert('请输入商城域名');
            $("#pasd_scwz").focus();
            return false;
        }else{
            if(!(checkWeb(shopUrl))){
                alert('请输入正确商城网址');
                $("#pasd_scwz").focus();
                return false;
            }
        }
        if(shopUrl=='ucenter'){
            alert('该网址已被注册，请重新输入');
        }


        /*表单提交Ajax提交部分*/
        /*$.post(rootUrl+"/Ucenter/Register/register",{"Ephone":Ephone,"valid":valid,"password":password,"repassword":repassword,"shopUrl":shopUrl,"name":name},function(data){
            if(data.status == "success"){
                alert(data.msg);
                location.href = rootUrl+'/Ucenter/Index/index';
            }else{
                alert(data.msg);
            }
        },"json")*/
        var reg_url = ucenterUrl+"/index.php/Ucenter/Register/register";
        $.ajax(reg_url, {
            data: {
                "Ephone":Ephone,
                "valid":valid,
                "password":password,
                "repassword":repassword,
                "shopUrl":shopUrl,
                "name":name
            },
            dataType: 'jsonp',
            crossDomain: true,
            success: function(data) {
                if(data.status == "success"){
                    alert(data.msg);
                    location.href = ucenterUrl+'/index.php/Ucenter/Index/index';
                }else{
                    alert(data.msg);

                }
            }
        });
        return false;
    });
})(jQuery)



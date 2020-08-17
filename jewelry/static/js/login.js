function loginAjax(user) {
    $.ajax({
		//几个参数需要注意一下
		type: "POST",//方法类型
		dataType: "json",//预期服务器返回的数据类型
		url: "/login/" ,//url
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(user),
		success :function(data) {
			//alert(data);
            if(data == 9998) {
			    alert("用户未激活！");

                return false;
            }
            else if(data == 9999) {
			    alert("用户名或密码错误！");
                return false;
            }
            else {
                var id = {id:data};
                // $.get('/getUsername/', id, function (user) {
                //     // alert(user.username);
                //     $(".userOperate").remove();
                //
                //     $(".changeLanguage").after('<a class="userOperate logout" href="#"><i class="fa fa-arrow-right"></i>注销 </a>' +
                //         '<p class="userOperate hello">你好，' + user.username + '</p>');
                //     if(user.permission) {
                //         $(".hello").before('<a class="userOperate" href="/item/"><i class="fa fa-cog"></i>管理 </a>');
                //     }
                //     $(".logout").click(function(){
                //         $.get('/logout/', function (data) {
                //             location.reload();
                //         });
                //     });
                // });
                window.location.href="/item/";
            }
		}
	});
}

$(".loginBtn").click(function(){
	if($(".name").val() == "") {
			alert("用户名为空！");
			$(".loginName").focus();
			return false;
	}
	if($(".password").val() == 0) {
			alert("密码为空！");
			$(".loginPsd").focus();
			return false;
	}
	 var user = {'name': $(".name").val(), 'password': $(".password").val()};
	//alert(user.name);
    loginAjax(user);
});
$(function () {
    $.get('/hasLogin/', function (user) {
	    // alert(user.username);
        if(user == 0)
            $(".changeLanguage").after('<a class="userOperate reg" href="#"><i class="fa fa-user-plus"></i>register</a>' +
                 '<a class="userOperate log" href="#"><i class="fa fa-arrow-right"></i>login </a>');
        else {
            $(".changeLanguage").after('<a class="userOperate logout" href="#"><i class="fa fa-arrow-right"></i>logout </a>' +
                '<p class="userOperate hello">Hello，' + user.username + '</p>');
            if(user.permission) {
                $(".hello").before('<a class="userOperate" href="/item/"><i class="fa fa-cog"></i>manage </a>');
            }
        }

        $(".reg").click(function(){
            $('#registerModal').modal('show');
        });
        $(".log").click(function(){
            $('#loginModal').modal('show');
        });
        $(".logout").click(function(){
            $.get('/logout/', function (data) {
                location.reload();
            });
        });

	});
})
$(".optReg").click(function(){
    $('#loginModal').modal('hide');
    $('#registerModal').modal('show');
});
$(".optLog").click(function(){
    $('#registerModal').modal('hide');
    $('#loginModal').modal('show');
});

function registerAjax(user) {
	$.ajax({
		type:'POST',
		data:JSON.stringify(user),
		contentType: "application/json; charset=utf-8",
		dataType:'json',
		url :'/signup/',
		success :function(data) {
			if(data == 1) {
			    alert("register success！please go to your email to identity your account");
            }
			else if(data == 2) {
			    alert("this username is already existed！");
                return false;
            }
            else if(data == 3) {
			    alert("this email is already existed！");
                return false;
            }
		}
	});
}
function isEmail(str){
    //var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return reg.test(str);
}

$(".confirmRegister").click(function(){
	if($(".registerName").val() == "") {
		alert("username is null！")
		$(".registerName").focus();
		return false;
	}
	if($(".registerPsd").val() == 0) {
		alert("password is null！")
		$(".registerPsd").focus();
		return false;
	}
	if($(".registerPsd").val() != $(".confirmPsd").val()) {
		alert("passwords are not same！")
		$(".confirmPsd").focus();
		return false;
	}
	if(!isEmail($(".registerEmail").val())) {
		alert("the format of email is wrong！")
		$(".registerEmail").focus();
		return false;
	}
	var user = {'name': $(".registerName").val(), 'password': $(".registerPsd").val(), 'email':$(".registerEmail").val()};
	registerAjax(user);
});

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
			    alert("this user is not activited！");
                return false;
            }
            else if(data == 9999) {
			    alert("username or password is wrong！");
                return false;
            }
            else {
                var id = {id:data};
                $.get('/getUsername/', id, function (user) {
                    // alert(user.username);
                    $(".userOperate").remove();

                    $(".changeLanguage").after('<a class="userOperate logout" href="#"><i class="fa fa-arrow-right"></i>logout </a>' +
                        '<p class="userOperate hello">Hello，' + user.username + '</p>');
                    if(user.permission) {
                        $(".hello").before('<a class="userOperate" href="/item/"><i class="fa fa-cog"></i>manage </a>');
                    }
                    $(".logout").click(function(){
						$.get('/logout/', function (data) {
							location.reload();
						});
					});
                });
            }
		}
	});
}

$(".confirmLogin").click(function(){
	if($(".loginName").val() == "") {
			alert("username is null！");
			$(".loginName").focus();
			return false;
	}
	if($(".loginPsd").val() == 0) {
			alert("password id null！");
			$(".loginPsd").focus();
			return false;
	}
	 var user = {'name': $(".loginName").val(), 'password': $(".loginPsd").val()};
	//alert(user.name);
    loginAjax(user);
	//$("#login").submit();
});
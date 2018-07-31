function loginAjax() {
	var users = {'name': $(".name").val(), 'password': $(".password").val(), 'email':$(".email").val()};
	alert(users);
	$.ajax({
		type:'POST',
		data:JSON.stringify(users),
		contentType: "application/json; charset=utf-8", 
		dataType:'json',
		url :'/signup/',
		success :function(data) {
			if(data == '1'){
	            alert("您输入的用户名或密码有错！");
	            return false;
	        }else{
	        	alert("登录成功！")
	            window.location.href = "#";//跳转页面
	        }
		}		
	});
	
}

$(".signupBtn").click(function(){
	if($(".name").val() == "") {
			alert("用户名为空！")
			$(".name").focus();
			return false;
	}
	if($(".password").val() == 0) {
			alert("密码为空！")
			$(".password").focus();
			return false;
	}
	loginAjax();
});
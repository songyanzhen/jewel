$(function () {
	function sendEmail(email) {
        $.ajax({
            type:'post',
            data: email,
            url :'/sendEmail/',
            cache: false,
            processData: false,
            contentType: false,
            async: false
        }).done(function(res) {
            if(res == 1)
                alert("发送成功");
        }).fail(function(res) {

        });
    }
    function isEmail(str) {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        return reg.test(str);
    }

    $(".send").click(function(){
        var email = $('.yourEmail').val();
        var title = $('.yourTitle').val();
        var content = $('.content').val();
        if(!isEmail(email)) {
            alert("邮箱格式错误！");
            return false;
        }
        else if(title == "") {
            alert("邮件标题为空！")
            return false;
        }
        else if(content == "") {
            alert("邮件内容为空！")
            return false;
        }
        else {
            var Data = new FormData();
            Data.append("email", email);
            Data.append("title", title);
            Data.append("content", content);
            sendEmail(Data);
        }
        //console.log("haha")
    });
})

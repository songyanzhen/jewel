var self={"intro":"个人简历","exper":"获奖经济"};

$(function () {
	//get
	// $.get('/getOptionIntro/', function (selfjson) {//获取介绍
	// 			//series =  JSON.parse(json)
	// 	var self = selfjson;
	// 	$('.introduction').attr('placeholder',self.intro);
	// 	$('.exper').attr('placeholder',self.exper);
    // })
	
})

function introAjax()
{   
    var Data = new FormData();
    Data.append("intro", $(".introduction").val());
    Data.append("exper", $(".exper").val());
    Data.append("intro_eng", $(".introduction_eng").val());
    Data.append("exper_eng", $(".exper_eng").val());
    Data.append("file", $('#photo')[0].files[0]);
    $.ajax({  
         url: '/setIntro/' ,
         type: 'post',  
         data: Data,  
         cache: false,
         processData: false,
         contentType: false,
         async: false
    }).done(function(res) {
    	alert("修改成功");
        
    }).fail(function(res) {
        
    });
} 
$(".confirmIntro").click(function(){
    if (!$('#photo').val()) {
		alert("请选择上传照片");
		$('#photo').focus();
		return false;
	}
	introAjax();
});
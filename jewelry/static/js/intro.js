var self={"intro":"个人简历","exper":"获奖经济"};

function getFileUrl(sourceId) {
    var url;
    if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
        url = document.getElementById(sourceId).value;
    } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
        url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
        url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    }
    return url;
}
function preImg(sourceId, targetId) {
    var url = getFileUrl(sourceId);
    var imgPre = document.getElementById(targetId);
    imgPre.src = url;
}
$(".photo").change(function(){
	preImg('photo', 'previewImg');
});
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
	introAjax();
	location.reload();
});
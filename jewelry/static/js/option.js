//var series = {"1":"系列1","2":"系列2","3":"系列3"};
//var jobs = {"intro": "系列简介系列简介系列简介系列简介系列简介系列简介系列简介系列简介", jobs:["作品1","作品2","作品3","作品4"]};
//var job={"image": "jewel1.jpg"};

//function jobsAjax(seriesId) {
//	var seriesId={id:seriesId};
//	//alert(seriesId.id);
//	$.ajax({
//		type:'POST',
//		data:JSON.stringify(seriesId),
//		contentType: "application/json; charset=utf-8", 
//		dataType:'json',
//		url :'/sendOptionSeries/',
//	});
//}
//function jobAjax(jobId) {
//	var jobId={id:jobId};
//	//alert(seriesId.id);
//	$.ajax({
//		type:'POST',
//		data:JSON.stringify(jobId),
//		contentType: "application/json; charset=utf-8", 
//		dataType:'json',
//		url :'/sendOptionJob/',
//	});
//}
var delSeries;
var delWork;
var optSeries;
var optWork;
var now;

$(function () {
	//getSeries();
	//get
	
    $.get('/getOptionSeries/', function (seriesjson) {//获取系列
		//series =  JSON.parse(json)
		var series = seriesjson;
		// for(var s in series){//遍历json对象的每个key/value对,p为key
		// 	$('#series').append('<a href="#" id="series'+ s + '" class="list-group-item kind">' + series[s] +'</a>');
		// 	$('.seriesSelect').append('<option value="' + s + '">' + series[s] + '</option>')
		// 	$('.fixSeriesSelect').append('<option value="' + s + '">' + series[s] + '</option>')
		// }
		for(var s in series){//遍历json对象的每个key/value对,p为key
			//$('#series').append('<a href="#" id="series'+ series[s].id + '" class="list-group-item kind">' + series[s].seriesname +'</a>');

            $('#series').append('<div class="ll"><a href="#" class="thumbnail series" id="series' +
                series[s].id +'" name="series' + s +'"><img src="/static/images/series_images/' +
                series[s].seriespic+ '"/><div class=\"mask\">' +
                series[s].seriesname + '</div></a></div>');
			$('.seriesSelect').append('<option value="' + series[s].id + '">' + series[s].seriesname + '</option>')
			$('.fixSeriesSelect').append('<option value="' + series[s].id + '">' + series[s].seriesname + '</option>')

            $(".series").mouseover(function(){
                $(this).children('div').show();
            })
            $(".series").mouseout(function(){
                $(this).children('div').hide();
            })
			console.log(series[s].seriespic);
		}
		$(function () {
        //导航切换
	        $("#series a").click(function () {
	            $("#series a.active").removeClass("active")
	            $(this).addClass("active");
	        })
	    })
		$("#series a").smartMenu(seriesMenu, {
			name: "seriesMenu"
		});
		// $(".kind").click(function(){
        $(".series").click(function(){
			var seriesName = $(this).attr("id");
			var seriesId = seriesName.substring(6);
			//jobsAjax(seriesId);
			var seriesPost = {id:seriesId};
			$('#jobs').html('');
			//$('#intro').html('');
            $.get('/getOneSeries/', seriesPost, function (seriesjson) {//获取介绍
            	var intro = seriesjson;
            	$('#intro').html('');
                $('#intro').append(intro.seriesintro);
            })
			//get
			$.get('/getOptionWorks/', seriesPost,  function (jobsjson) {//获取作品
				//series =  JSON.parse(json)
				var jobs = jobsjson;
				//$('#intro').append(jobs.intro);
				for (var i in jobs) {
					//alert(jobs[i].paths[0]);
					$('#jobs').append('<div class="ll"><a href="#" class="thumbnail job" id="work' +
						jobs[i].id +'" name="work' + i +'"><img src="/static/images/' +
						jobs[i].paths[0]+ '"/><div class=\"mask\">' +
						jobs[i].workname + '</div></a></div>');
				}
				$(".job").mouseover(function(){
					$(this).children('div').show();
				})
				$(".job").mouseout(function(){
					$(this).children('div').hide();
				})

				$(function () {
		        //导航切换
			        $("#series a").click(function () {
			            $("#series a.active").removeClass("active")
			            $(this).addClass("active");
			        })
			    })
	
				$(function () {
			        //导航切换
			        $("#jobs a").click(function () {
			            $("#jobs a.active").removeClass("active")
			            $(this).addClass("active");
			        })
			    })
				$("#jobs a").smartMenu(jobMenu, {
					name: "jobMenu"
				});
				$(".job").click(function(){
					var imgId = $(this).attr("name");
					var img = imgId.substring(4);
					$('#imgList').html("");
					$('.jqueryzoom').html("");
					for(var i=0; i<jobs[img].paths.length; i++) {
						if(i == 0) {
							$('.jqueryzoom').append('<img id="img" class="cloudzoom" src="/static/images/' +
							jobs[img].paths[i] + '"data-cloudzoom="zoomSizeMode:\'lens\', startMagnification:1.2, lensWidth:180, lensHeight:180, zoomImage: \'/static/images/'+
							jobs[img].paths[i] + '\', autoInside: 30, zoomPosition:12"/>');
							$('#imgList').append('<li><img class="cloudzoom-gallery cloudzoom-gallery-active" src="/static/images/' +
							jobs[img].paths[i] + '" data-cloudzoom="useZoom:\'.cloudzoom\',image:\'/static/images/' +
							jobs[img].paths[i] + '\',zoomImage:\'/static/images/' +
							jobs[img].paths[i] + '\'"/></li>');
						}
						else {
							$('#imgList').append('<li><img class="cloudzoom-gallery" src="/static/images/' +
							jobs[img].paths[i] + '" data-cloudzoom="useZoom:\'.cloudzoom\',image:\'/static/images/' +
							jobs[img].paths[i] + '\',zoomImage:\'/static/images/' +
							jobs[img].paths[i] + '\'"/></li>');
						}
					}
					CloudZoom.quickStart();
					//$('#image').append('<img src="'+ src + '" width="100%" />');
				});
			});
		});
    });
})

function addSeriesAjax()
{   
    var Data = new FormData();
    Data.append("seriesName", $(".seriesName").val());
    Data.append("seriesIntro", $(".seriesIntro").val());
    Data.append("seriesName_eng", $(".seriesName_eng").val());
    Data.append("seriesIntro_eng", $(".seriesIntro_eng").val());
    Data.append("file", $('.seriesPhoto')[0].files[0]);
	
    $.ajax({  
         url: '/addSeries/' ,
         type: 'post',  
         data: Data,  
         cache: false,
         processData: false,
         contentType: false,
         async: false
    }).done(function(res) {
    	alert("添加系列成功");
        
    }).fail(function(res) {
        
    });
} 
function addWorkAjax()
{
	var allInput = $('#addPhotoTag').nextAll('input');
	var i = 1;
	var name;
    var Data = new FormData();
    Data.append("seriesSelect", $(".seriesSelect").val());
    // Data.append("jobIntro", $(".jobIntro").val());
    allInput.each(function(){
	    if($(this).val() != "") {
	    	name = "photo" + i;
	    	Data.append(name, $(this)[0].files[0]);
	    	i++
	    }
	});
    $.ajax({
         url: '/addWork/' ,
         type: 'post',
         data: Data,
         cache: false,
         processData: false,
         contentType: false,
         async: false
    }).done(function(res) {
    	alert("添加作品成功");

    }).fail(function(res) {

    });
}

function delSeriesAjax(seriesId) {
	var Data = new FormData();
    Data.append("seriesId", seriesId);
    $.ajax({
         url: '/delSeries/' ,
         type: 'post',
         data: Data,
         cache: false,
         processData: false,
         contentType: false,
         async: false
    }).done(function(res) {
    	alert("删除系列成功");

    }).fail(function(res) {

    });
}
function delWorkAjax(workId) {
	var Data = new FormData();
    Data.append("workId", workId);
	$.ajax({
         url: '/delWork/' ,
         type: 'post',
         data: Data,
         cache: false,
         processData: false,
         contentType: false,
         async: false
    }).done(function(res) {
    	alert("删除作品成功");

    }).fail(function(res) {

    });
}
function fixSeriesAjax(series) {
	$.ajax({
		type:'post',
		data: series,
		url :'/fixSeries/',
        cache: false,
        processData: false,
        contentType: false,
        async: false
    }).done(function(res) {
    	alert("修改系列成功");
    }).fail(function(res) {

    });
}

function fixIndexAjax(index) {
	$.ajax({
		type:'post',
		data: index,
		url :'/fixIndex/',
        cache: false,
        processData: false,
        contentType: false,
        async: false
    }).done(function(res) {
    	alert("设置首页轮播成功");
    }).fail(function(res) {

    });
}

var seriesMenu = [
	[{
		text: "修改系列",
		func: function() {
			optSeries = $(this).attr('id');
			var seriesid = optSeries.substring(6);
			id = {'id': seriesid}
            $.get('/getOneSeries/', id, function (seriesjson) {//获取介绍
                var series = seriesjson;
                $('.fixSeriesName').val(series.seriesname);
                $('.fixSeriesIntro').val(series.seriesintro);
                $('.fixSeriesName_eng').val(series.seriesname_eng);
                $('.fixSeriesIntro_eng').val(series.seriesintro_eng);
            })
			$('#fixSeries').modal('show');
		}
	},
	{
		text: "删除系列",
		func: function() {
			now = $(this);
			delSeries = $(this).attr('id').substring(6);
			//alert(delSeries)
			$('#delSeries').modal('show');
		}
	},{
		text: "上移",
		func: function() {
			var parent = $(this).parent();
			var prev = parent.prev();
			//alert(prev.html());
			prev.before(parent);
			//parent.remove();
		}
	},
	{
		text: "下移",
		func: function() {
			var parent = $(this).parent();
			var next = parent.next();
			//alert(next.html());
			next.after(parent);
		}
	}],
];
var jobMenu = [
	[
	// 	{
	// 	text: "修改作品",
	// 	func: function() {
	// 		var workName = $(this).attr("id");
	// 		optWork = workName.substring(4);
	// 		$('#fixJob').modal('show');
	// 	}
	// },
	{
		text: "删除作品",
		func: function() {
			now = $(this);
			var workName = $(this).attr("id");
			delWork = workName.substring(4);
			$('#delJob').modal('show');
		}
	},{
		text: "上移",
		func: function() {
			var parent = $(this).parent();
			var prev = parent.prev();
			//alert(prev.html());
			prev.before(parent);
			//parent.remove();
		}
	},
	{
		text: "下移",
		func: function() {
			var parent = $(this).parent();
			var next = parent.next();
			//alert(next.html());
			next.after(parent);
		}
	}],
];
//seriesFix indexFix
$(".fixIndex").click(function(){
    $(document).on('click', '.se', function(){
        var img = $(this).find('img').first();
        if(img.hasClass('selectPics')) {
            img.removeClass('selectPics');
        }
        else {
            img.addClass('selectPics');
        }
    });

    $.get('/getAllPics/', function (picsjson) {//获取介绍
				//series =  JSON.parse(json)
		var pic = picsjson;
		var len =pic.length;
		$('.indexFix').html('');
		for(var i=0; i<len; i++) {
			$('.indexFix').append('<li><h5 class="indexSeries' + i +
				'" style="font-weight: bold">' + pic[i].seriesName + '</h5></li>');
		}
		for(var i=0; i<len; i++) {
		    var picLen = pic[i].picIds.length
            var nowPic = pic[i];
		    for(var j=0; j<picLen; j++) {
		        if(nowPic.broadcast[j]) {
                    $('.indexSeries' + i).after('<a href="#" class="se"><img id="indexPic' + nowPic.picIds[j] +
                    '" class="indexPics selectPics" src="/static/images/' + nowPic.picpaths[j] +
                    '"></a>');
                }
                else {
		            $('.indexSeries' + i).after('<a href="#" class="se"><img id="indexPic' + nowPic.picIds[j] +
                    '" class="indexPics" src="/static/images/' + nowPic.picpaths[j] +
                    '"></a>');
                }
            }
		}
    })
// getAllPics
	$('#fixIndex').modal('show');
});

$(".confirmSeries").click(function(){
	if(!$('.seriesPhoto').val()) {
        alert("未选择系列图片！");
        return false;
    }
	addSeriesAjax();
	location.reload();
});

$(".confirmJob").click(function(){
	addWorkAjax();
	location.reload();
});
$(".addSeries").click(function(){
	$('#seriesModal').modal('show');
});
$(".addJob").click(function(){
	$('#jobModal').modal('show');
});

$(".confirmDelSeries").click(function(){
	delSeriesAjax(delSeries);
	now.remove();
	//location.reload();
});
$(".confirmDelJob").click(function(){
	delWorkAjax(delWork);
	now.remove();
	location.reload();
});
$(".confirmFixSeries").click(function(){
	var seriesid = optSeries.substring(6);
	var name = $('.fixSeriesName').val();
	var intro = $('.fixSeriesIntro').val();
	var name_eng = $('.fixSeriesName_eng').val();
	var intro_eng = $('.fixSeriesIntro_eng').val();
	// var fixseries = {'id':seriesid, 'seriesname':name, 'seriesintro':intro}
	var Data = new FormData();
	Data.append("id", seriesid);
    Data.append("seriesname", name);
    Data.append("seriesintro", intro);
    Data.append("seriesname_eng", name_eng);
    Data.append("seriesintro_eng", intro_eng);
	fixSeriesAjax(Data);
	//location.reload();
});

$(".confirmFixIndex").click(function(){
    var id;
    var picIds = [];
    var Data = new FormData();
    $(".selectPics").each(function () {
        id = $(this).attr('id').substring(8)
        //picIds.push(id);
        Data.append(id, id);
    });
    // var ids = {'ids':picIds}
    // $.get('/fixIndex/', ids, function () {
    // 	alert('设置首页轮播成功')
    // })
    // alert(picIds)
	fixIndexAjax(Data);
	location.reload();
});


$(".fixSequence").click(function(){
	var seq = {};
	var i = 1;
	// id key seq value;
	var seqId;
	$(".job").each(function(){
		//alert($(this).attr("id"))
		seqId = $(this).attr("id").substring(4);

		seq[seqId] = i;
		i++;
	});
	$.ajax({
		type:'POST',
		data:JSON.stringify(seq),
		contentType: "application/json; charset=utf-8",
		dataType:'json',
		url :'/workSequence/',
	});
	location.reload();
});
//系列顺序
$(".fixSeriesSequence").click(function(){
	var seq = {};
	var i = 1;
	// id key seq value;
	var seqId;
	$(".series").each(function(){
		//alert($(this).attr("id"))
		seqId = $(this).attr("id").substring(6);

		seq[seqId] = i;
		i++;
	});
	$.ajax({
		type:'POST',
		data:JSON.stringify(seq),
		contentType: "application/json; charset=utf-8",
		dataType:'json',
		url :'/seriesSequence/',
	});
	location.reload();
});
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

function upWorkPhoto(upPhoto) {
	if(upPhoto.next().is('img')) {
		//alert(upPhoto.attr("id") + '  ' +upPhoto.next().attr("id"))
		preImg(upPhoto.attr("id"), upPhoto.next().attr("id"));
	}
	else {
		upPhoto.next().remove();
		upPhoto.next().remove();
		var i = parseInt(upPhoto.attr("id").substr(5));
		var j = i + 1;
		var src = upPhoto.val();
		upPhoto.after('<img id="img' + i + '" style="margin-left: 10%; margin-bottom: 2%;" src="" />' +
		'<button type="button" style="margin-left: 8%;" class="btn btn-primary deleteAddWork">删除</button>' +
		'<input id="photo' + j + '" name="photo" class="photo" type="file" accept="image/*"' +
		'style="width: 50%; margin: 0; height: auto; display: inline;"/>');
		//alert(i)
		preImg(upPhoto.attr("id"), "img" + i);


		$(".deleteAddWork").click(function(){
			$(this).prev().remove();
			$(this).prev().remove();
			$(this).remove();
		});
		$("#photo" + j).change(function(){
			upWorkPhoto($(this));
		});
	}
}


$(".photo").change(function(){
	upWorkPhoto($(this));
});



//confirmSeries
//confirmJob
//confirmFixSeries
//confirmFixJob
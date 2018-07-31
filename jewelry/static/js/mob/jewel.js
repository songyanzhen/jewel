var job = {"intro":"这个作品牛逼","image":"jewel1.jpg"};
$(function () {
	//get
	var id = window.location.search;
	var seriesId = id.substring(1);

	$('.changeLanguage').attr('href', '/index_mob_eng/jewel_mob_eng/?' + seriesId);

	var seriesPost = {id:seriesId};
	var name;

	$.get('/getJewels/', seriesPost, function (jeweljson) {//获取作品
				//series =  JSON.parse(json)
		var jewel = jeweljson;
		for(var i=0; i<jewel.image.length; i++) {
			//alert(job.image)
			if(i == 0) {
				$('.jqueryzoom').append('<img id="img" class="cloudzoom" src="/static/images/' +
				jewel.image[i] + '"data-cloudzoom="zoomSizeMode:\'lens\', animationTime:0, zoomPosition: \'inside\', startMagnification:2, zoomImage: \'/static/images/'+
				jewel.image[i] + '\', autoInside: 30"/>');
				$('#imgList').append('<li><img class="cloudzoom-gallery ' + jewel.seq[i] + ' cloudzoom-gallery-active" src="/static/images/' +
				jewel.image[i] + '" data-cloudzoom="useZoom:\'.cloudzoom\',image:\'/static/images/' +
				jewel.image[i] + '\',zoomImage:\'/static/images/' +
				jewel.image[i] + '\'"/></li>');
			}
			else {
				$('#imgList').append('<li><img class="cloudzoom-gallery ' + jewel.seq[i] + '" src="/static/images/' +
				jewel.image[i] + '" data-cloudzoom="useZoom:\'.cloudzoom\',image:\'/static/images/' +
				jewel.image[i] + '\',zoomImage:\'/static/images/' +
				jewel.image[i] + '\'"/></li>');
			}
		}
		CloudZoom.quickStart();
		var classes = $(".cloudzoom-gallery-active").attr("class");
		var cls = classes.split(' ');
		$('#text').html('<h3>' + jewel.seriesname + '</h3>' +
			// '<h4>' +  jewel.seriesname + '-' + cls[1] + '</h4>' +
			'<pre>' + jewel.seriesintro + '</pre>');
		name = jewel.seriesname;

		$('#main').append('<div id="footer">\n' +
        '             <div class="contact">\n' +
        '                <a class="ins con" href="https://www.instagram.com/yilanliu_lyl/" target="_blank"><i class="fa fa-instagram fa-lg"></i></a>\n' +
        '                <a class="wechat con" href="javascript:void(0);"><i class="fa fa-wechat fa-lg"></i></a>\n' +
        '                <a class="weibo con" href="https://weibo.com/u/5627347173" target="_blank"><i class="fa fa-weibo fa-lg"></i></a>\n' +
        '                <a class="email con" href="javascript:void(0);"><i class="fa fa-envelope-o fa-lg"></i></a>\n' +
        '            </div>\n' +
        '            <p>TEL：13020031705 Copyright © all reserved</p>\n' +
        '        </div>');

        $(".wechat").click(function(){
            $('#wechatModal').modal('show');
        });
        $(".email").click(function(){
            $('#emailModal').modal('show');
        });

   })

	$("#imgList").click(function(){
		var classes = $(".cloudzoom-gallery-active").attr("class");
		var cls = classes.split(' ');
		$('#text h4').html(name + '-' + cls[1]);
	});
})
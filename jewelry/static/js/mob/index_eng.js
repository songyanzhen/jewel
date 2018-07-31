$(function () {
	var len = 0;
	$.get('/getIndexPic/', function (picsjson) {
		var pics = picsjson;
		len = picsjson.length;
		//alert(len)
		var count = 1;

		for(var i in pics){//遍历json对象的每个key/value对,p为key
		    if(count == 1) {
                $("#main").append('<a href="/index_mob_eng/jewel_mob_eng/?' + pics[i].id + '">' +
                '<div class="first pic" style="background-image: url(\'/static/images/' +
                pics[i].picture + '\')"' + '></div></a>');
            }
            else if(count == len) {
                $("#main").append('<a href="/index_mob_eng/jewel_mob_eng/?' + pics[i].id + '">' +
                '<div class="last pic" style="display: none; background-image: url(\'/static/images/' +
                pics[i].picture + '\')"' + '></div></a>');
            }
            else {
                $("#main").append('<a href="/index_mob_eng/jewel_mob_eng/?' + pics[i].id + '">' +
                '<div class="pic" style="display: none; background-image: url(\'/static/images/' +
                pics[i].picture + '\')"' + '></div></a>');
            }
            count++;
		}
		$('#main').append('<div id="footer">\n' +
        '             <div class="contact">\n' +
        '                <a class="ins con" href="https://www.instagram.com/yilanliu_lyl/" target="_blank"><i class="fa fa-instagram fa-lg"></i></a>\n' +
        '                <a class="wechat con" href="javascript:void(0);"><i class="fa fa-wechat fa-lg"></i></a>\n' +
        '                <a class="weibo con" href="https://weibo.com/u/5627347173" target="_blank"><i class="fa fa-weibo fa-lg"></i></a>\n' +
        '                <a class="email con" href="javascript:void(0);"><i class="fa fa-envelope-o fa-lg"></i></a>\n' +
        '            </div>\n' +
        '            <p>TEL：13020031705 Copyright © all reserved</p>\n' +
        '        </div>');

		var i = 1;
        console.log(len)
        //alert($(".first").next())
        var pic = $(".first");
        setInterval(function(){
            if(i == 1) {
                console.log(i);
                $(".first").fadeOut(1000);
                pic = pic.parent().next().children().first();
                pic.fadeIn(1000);
                i++;
            }
            else if (i == len) {
                console.log(i);
                $(".last").fadeOut(1000);
                pic = $(".first");
                $(".first").fadeIn(1000);
                i = 1;
            }
            else {
                console.log(i);
                pic.fadeOut(1000);
                pic = pic.parent().next().children().first();
                pic.fadeIn(1000);
                i++;
            }
        }, 5000);
	});
})
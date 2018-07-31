$(function () {

	$.get('/getAllSeries_eng/',function (allSeriesJson) {
		var allSeries = allSeriesJson;
		for(var i in allSeries) {
		    $('#list').append('<div class="series"><a href="/index_mob_eng/jewel_mob_eng/?' + allSeries[i].id + '">' +
            '<div class="seriesPic" style="background-image:url(\'/static/images/series_images/' + allSeries[i].seriespic +  '\')"' + '></div>' +
			'<div class="seriesName"><h3>' + allSeries[i].seriesname + 	'</h3></div></a>');
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
        $(".wechat").click(function(){
            $('#wechatModal').modal('show');
        });
        $(".email").click(function(){
            $('#emailModal').modal('show');
        });
        // $(".seriesPic").mouseenter(function(){
        //     $(this).next().css('display', 'block');
        // });
        // $(".seriesName").mouseleave(function(){
        //     $(this).css('display', 'none');
        // });
	})
})

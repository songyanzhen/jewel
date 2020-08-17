$(function() {
  $.get("/getAllSeries/", function(allSeriesJson) {
    var allSeries = allSeriesJson;
    // for(var i in allSeries) {
    //     $('#list').append('<div class="series"><a href="/index_mob/jewel_mob/?' + allSeries[i].id + '">' +
    //         '<div class="seriesPic" style="background:url(/static/images/series_images/' + allSeries[i].seriespic +
    //         ') center center no-repeat; background-size: cover;"' +
    //         '></div><div class="seriesName"><h3 style="letter-spacing: 1rem;text-indent: 1rem;">' + allSeries[i].seriesname + '</h3></div></a>');
    // }
    for (var i in allSeries) {
      $("#list").append(
        '<div class="series"><a href="/index_mob/jewel_mob/?' +
          allSeries[i].id +
          '">' +
          '<img class="lazy" data-original="http://img.yilanjewelry.com/' +
          allSeries[i].seriespic +
          '"/>' +
          '<div class="seriesName"><h3 style="letter-spacing: 1rem;text-indent: 1rem;">' +
          allSeries[i].seriesname +
          "</h3></div></a>"
      );
    }
    // $("img.lazy").lazyload({effect: "fadeIn", threshold :150});
    $("img.lazy").lazyload({
      placeholder: "/static/images/loading.jpg",
      threshold: 30
    });

    $("#main").append(
      '<div id="footer">\n' +
        '             <div class="contact">\n' +
        '                <a class="ins con" href="https://www.instagram.com/yilanjewellery/" target="_blank"><i class="fa fa-instagram fa-lg"></i></a>\n' +
        '                <a class="wechat con" href="javascript:void(0);"><i class="fa fa-wechat fa-lg"></i></a>\n' +
        '                <a class="weibo con" href="https://weibo.com/u/5627347173" target="_blank"><i class="fa fa-weibo fa-lg"></i></a>\n' +
        '                <a class="email con" href="javascript:void(0);"><i class="fa fa-envelope-o fa-lg"></i></a>\n' +
        "            </div>\n" +
        "            <p>© YILAN JEWELRY&nbsp;京ICP备18044210号-1</p>\n" +
        "        </div>"
    );

    $(".wechat").click(function() {
      $("#wechatModal").modal("show");
    });
    $(".email").click(function() {
      $("#emailModal").modal("show");
    });
    // $(".seriesPic").mouseenter(function(){
    //     $(this).next().css('display', 'block');
    // });
    // $(".seriesName").mouseleave(function(){
    //     $(this).css('display', 'none');
    // });
  });
});

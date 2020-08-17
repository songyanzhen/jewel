$(function() {
  //get
  var id = window.location.search;
  var seriesId = id.substring(1);

  $(".changeLanguage").attr("href", "/index_eng/jewel_eng/?" + seriesId);

  var seriesPost = { id: seriesId };
  var name;

  $.get("/getJewels/", seriesPost, function(jeweljson) {
    //获取作品
    //series =  JSON.parse(json)
    var jewel = jeweljson;
    for (var i = 0; i < jewel.image.length; i++) {
      //alert(job.image)
      if (i == 0) {
        $(".jqueryzoom").append(
          '<img id="img" class="cloudzoom" src="http://img.yilanjewelry.com/' +
            jewel.image[i] +
            "\"data-cloudzoom=\"zoomSizeMode:'lens', animationTime:0, zoomPosition: 'inside', startMagnification:1.5, zoomImage: 'http://img.yilanjewelry.com/" +
            jewel.image[i] +
            "', autoInside: 30\"/>"
        );
        $("#imgList").append(
          '<li><img class="cloudzoom-gallery ' +
            jewel.seq[i] +
            ' cloudzoom-gallery-active" src="http://img.yilanjewelry.com/thumb_' +
            jewel.image[i] +
            "\" data-cloudzoom=\"useZoom:'.cloudzoom',image:'http://img.yilanjewelry.com/" +
            jewel.image[i] +
            "',zoomImage:'http://img.yilanjewelry.com/" +
            jewel.image[i] +
            "'\"/></li>"
        );
      } else if (i == jewel.image.length - 1) {
        $("#imgList").append(
          '<li style="margin-right: 0;"><img class="cloudzoom-gallery ' +
            jewel.seq[i] +
            '" src="http://img.yilanjewelry.com/thumb_' +
            jewel.image[i] +
            "\" data-cloudzoom=\"useZoom:'.cloudzoom',image:'http://img.yilanjewelry.com/" +
            jewel.image[i] +
            "',zoomImage:'http://img.yilanjewelry.com/" +
            jewel.image[i] +
            "'\"/></li>"
        );
      } else {
        $("#imgList").append(
          '<li><img class="cloudzoom-gallery ' +
            jewel.seq[i] +
            '" src="http://img.yilanjewelry.com/thumb_' +
            jewel.image[i] +
            "\" data-cloudzoom=\"useZoom:'.cloudzoom',image:'http://img.yilanjewelry.com/" +
            jewel.image[i] +
            "',zoomImage:'http://img.yilanjewelry.com/" +
            jewel.image[i] +
            "'\"/></li>"
        );
      }
    }

    var photoWidth = $("#photo").width();
    var imgLen = jewel.image.length;
    if (69 * imgLen >= photoWidth) {
      $("#imgList").before('<div class="thumbelina-but horiz left"></div>');
      $("#imgList").after('<div class="thumbelina-but horiz right"></div>');
      $("#sliderImg").Thumbelina({
        $bwdBut: $("#sliderImg .left"), // Selector to left button.
        $fwdBut: $("#sliderImg .right") // Selector to right button.
      });
      // $('#sliderImg').addClass("overSlider");
    }

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
    CloudZoom.quickStart();
    var classes = $(".cloudzoom-gallery-active").attr("class");
    var cls = classes.split(" ");
    $("#text").html(
      "<h3>" +
        jewel.seriesname +
        "</h3>" +
        // '<h4>' +  jewel.seriesname + '-' + cls[1] + '</h4>' +
        "<pre>" +
        jewel.seriesintro +
        "</pre>"
    );
    name = jewel.seriesname;
  });

  $("#imgList").click(function() {
    var classes = $(".cloudzoom-gallery-active").attr("class");
    var cls = classes.split(" ");
    $("#text h4").html(name + "-" + cls[1]);
  });
});

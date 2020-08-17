$(function() {
  var len = 0;
  $.get("/getIndexPic/", function(picsjson) {
    var pics = picsjson;
    len = picsjson.length;
    //alert(len)
    var count = 1;

    for (var i in pics) {
      //遍历json对象的每个key/value对,p为key
      if (count == 1) {
        $("#main").append(
          '<a href="/index_eng/jewel_eng/?' +
            pics[i].id +
            '">' +
            '<div class="first pic pic' +
            count +
            '" style="background-image: url(\'http://img.yilanjewelry.com/' +
            pics[i].picture +
            "')\"" +
            "></div></a>"
        );
        $("#dots").append(
          '<div id="dot' +
            count +
            '" class="firstDot dot" style="background-color: #333333;"></div>'
        );
      } else if (count == len) {
        $("#main").append(
          '<a href="/index_eng/jewel_eng/?' +
            pics[i].id +
            '">' +
            '<div class="last pic pic' +
            count +
            '" style="display: none; background-image: url(\'http://img.yilanjewelry.com/' +
            pics[i].picture +
            "')\"" +
            "></div></a>"
        );
        $("#dots").append(
          '<div id="dot' + count + '" class="lastDot dot"></div>'
        );
      } else {
        $("#main").append(
          '<a href="/index_eng/jewel_eng/?' +
            pics[i].id +
            '">' +
            '<div class="pic pic' +
            count +
            '" style="display: none; background-image: url(\'http://img.yilanjewelry.com/' +
            pics[i].picture +
            "')\"" +
            "></div></a>"
        );
        $("#dots").append('<div id="dot' + count + '" class="dot"></div>');
      }
      count++;
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

    var i = 1;
    //console.log(len)
    //alert($(".first").next())
    var pic = $(".first");
    var dot = $(".firstDot");
    var pp;
    $(".pic").mouseout(function() {
      pp = setInterval(function() {
        if (i == 1) {
          //console.log(i);
          $(".first").fadeOut(1000);
          $(".firstDot").animate({ backgroundColor: "#ffffff" }, 1000);
          pic = pic
            .parent()
            .next()
            .children()
            .first();
          dot = dot.next();
          pic.fadeIn(1000);
          dot.animate({ backgroundColor: "#333333" }, 1000);
          i++;
        } else if (i == len) {
          //console.log(i);
          $(".last").fadeOut(1000);
          $(".lastDot").animate({ backgroundColor: "#ffffff" }, 1000);
          pic = $(".first");
          dot = $(".firstDot");
          $(".first").fadeIn(1000);
          $(".firstDot").animate({ backgroundColor: "#333333" }, 1000);
          i = 1;
        } else {
          //console.log(i)
          pic.fadeOut(1000);
          dot.animate({ backgroundColor: "#ffffff" }, 1000);
          pic = pic
            .parent()
            .next()
            .children()
            .first();
          dot = dot.next();
          pic.fadeIn(1000);
          dot.animate({ backgroundColor: "#333333" }, 1000);
          i++;
        }
      }, 3000);
    });
    $(".pic").mouseover(function() {
      clearInterval(pp);
    });
    pp = setInterval(function() {
      if (i == 1) {
        //console.log(i);
        $(".first").fadeOut(1000);
        $(".firstDot").animate({ backgroundColor: "#ffffff" }, 1000);
        pic = pic
          .parent()
          .next()
          .children()
          .first();
        dot = dot.next();
        pic.fadeIn(1000);
        dot.animate({ backgroundColor: "#333333" }, 1000);
        i++;
      } else if (i == len) {
        //console.log(i);
        $(".last").fadeOut(1000);
        $(".lastDot").animate({ backgroundColor: "#ffffff" }, 1000);
        pic = $(".first");
        dot = $(".firstDot");
        $(".first").fadeIn(1000);
        $(".firstDot").animate({ backgroundColor: "#333333" }, 1000);
        i = 1;
      } else {
        //console.log(i);
        pic.fadeOut(1000);
        dot.animate({ backgroundColor: "#ffffff" }, 1000);
        pic = pic
          .parent()
          .next()
          .children()
          .first();
        dot = dot.next();
        pic.fadeIn(1000);
        dot.animate({ backgroundColor: "#333333" }, 1000);
        i++;
      }
    }, 3000);
    $(".dot").click(function() {
      console.log(i);
      var id = $(this)
        .attr("id")
        .substring(3);
      $("#dot" + i).animate({ backgroundColor: "#ffffff" }, 1000);
      $(this).animate({ backgroundColor: "#333333" }, 1000);
      $(".pic" + i).fadeOut(1000);
      $(".pic" + id).fadeIn(1000);
      i = id;
      console.log(i);
      if (i == 1) {
        pic = $(".pic1");
        dot = $("#dot1");
      } else if (i == len) {
        pic = $(".last");
        dot = $(".lastDot");
      } else {
        pic = $(".pic" + i);
        dot = $("#dot" + i);
      }
    });

    $("#main").append(`
            <div class="swiper-button--next"></div>
            <div class="swiper-button--prev"></div>
        `);
    // 切换图片
    function changeCur(id) {
      $("#dot" + i).animate({ backgroundColor: "#ffffff" }, 1000);
      $("#dot" + id).animate({ backgroundColor: "#333333" }, 1000);
      $(".pic" + i).fadeOut(1000);
      $(".pic" + id).fadeIn(1000);
      i = id;
      console.log(i);
      if (i == 1) {
        pic = $(".pic1");
        dot = $("#dot1");
      } else if (i == len) {
        pic = $(".last");
        dot = $(".lastDot");
      } else {
        pic = $(".pic" + i);
        dot = $("#dot" + i);
      }
    }
    $(".swiper-button--next").click(function() {
      clearInterval(pp);
      changeCur((i % len) + 1);
    });
    $(".swiper-button--prev").click(function() {
      clearInterval(pp);
      changeCur(((i - 2 + len) % len) + 1);
    });
  });
});

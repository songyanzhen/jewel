$(function () {
    $(".searchText").val('');
	var flag = 1;
	$(".openMenu").rotate({
	   bind:
	     {
	        click: function(){
				if(flag == 1) {
					$(this).rotate({ animateTo:90, duration:800});
					flag = 0;
					$(".menu").fadeToggle(800);
				}
				else {
					$(this).rotate({ animateTo:0, duration:800});
					flag = 1;
					$(".menu").fadeToggle(800);
				}
	        }
	     }
	});
	var sea = 0;
	$(".search").click(function(){
	    //alert('sea=' + sea)
	    if(sea == 1) {
            //$('.searchBox').css('display', 'none');
            $('.searchBox').fadeToggle(800);
            sea = 0;
        }
        else {
	        //$('.searchBox').css('display', 'inline-block');
	        $('.searchBox').fadeToggle(800);
            sea = 1;
        }
    });

  	var searchList = [];
    var inputVal;

	$.get('/getSearchSeries/',function (seriesJson) {
        searchList = seriesJson;
    });

	$(".searchText").keyup(function(){
		//alert(123)
        var flag = 0;
        var flagChar = 1;
        inputVal = $(".searchText").val().toUpperCase();
        //console.log(inputVal);
        $(".results").html('');

        var reg= /^[A-Za-z]+$/;

        if(reg.test(inputVal)&&(inputVal.length <= 2)) {
            flagChar = 0;
        }

        for (var i=0; i<searchList.length; i++) {
            //console.log(searchList[i].seriesname_cn.indexOf(inputVal));
            var cn = searchList[i].seriesname_cn.indexOf(inputVal)!=0;
	        var eng = searchList[i].seriesname_eng.indexOf(inputVal)!=0;
            flag += cn;
            flag += eng;
        }
        // console.log(flag);
        if(flag&&flagChar) {
            for (var i=0; i<searchList.length; i++) {
                //console.log(searchList[i].seriesname_cn.indexOf(inputVal));
                if((searchList[i].seriesname_cn.indexOf(inputVal)>=0) || (searchList[i].seriesname_eng.indexOf(inputVal)>=0)) {
                    //console.log(searchList[i].seriesname_cn + ' ' + searchList[i].seriesname_eng);
                   $(".results").append('<a href="/jewel/?' + searchList[i].id + '">' +
                   searchList[i].seriesname_cn + '</a>');
                }
            }
        }
	});
})


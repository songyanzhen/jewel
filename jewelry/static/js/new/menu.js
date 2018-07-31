$(function () {
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
})
$(function() {

	$(window).scroll(function() {
		if ($(this).scrollTop() > $(this).height()) {
			$('.top').addClass('active');
		} else {
			$('.top').removeClass('active');
		}
	});

	$('.top').click(function () {
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});

});

//$(window).on('load', function () {
//	$('.preloader').delay(1000).fadeOut('slow');
//});

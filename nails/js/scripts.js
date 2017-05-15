$(document).ready(function() {

	// click menu
	$('.about').click(function(event){
		event.preventDefault();
		$('.hover-about').addClass('active');
		$('.hover-about .content').addClass('bounceInUp');
		$('.bg-cover').addClass('dark');
	});

	$('.works').click(function(event){
		event.preventDefault();
		$('.bg-cover').addClass('dark');
		$('.hover-works').addClass('active');
		var height = $('.hover-works').outerHeight();
		if ( height > 600) {
			$('.hover-works').css('top', '-100px');
		} else {
			$('.hover-works').css('top', 0);
		};
		$('.hover-works .content').addClass('fadeInUp');
	});

	$('.contact').click(function(event){
		event.preventDefault();
		$('.bg-cover').addClass('dark');
		$('.hover-contact').addClass('active');
		$('.hover-contact .content').addClass('flipInX');
	});

	$('.social').click(function(event){
		event.preventDefault();
		$('.bg-cover').addClass('dark');
		$('.hover-social').addClass('active');
		$('.hover-social .content').addClass('rollIn');
	});


	// close buttons
	$('.close, .bg-cover').click(function(){
		$('.hover').removeClass('active');
		$('.bg-cover').removeClass('dark');
		$('.hover .content').removeClass('bounceIn fadeIn fadeInRight fadeInLeft bounceInUp flipInX flipInY fadeInUp rollIn rotateIn');
	});


	// my lightbox
	$('.hover-works a img').click(function(event){
		event.preventDefault();
		var img_link = $(this).attr('src');
		$('.lightbox img').attr('src', img_link);
		$('.lightbox').show();
		$('.lightbox img').addClass('animated fadeIn');
	});

	$('.lightbox').click(function(){
		$(this).hide();
		$('.lightbox img').attr('src','');
		$('.lightbox img').removeClass('animated fadeIn');
	})
});





// 300ms delay on mobile browsers
window.addEventListener('load', function() {
    new FastClick(document.body);
}, false);




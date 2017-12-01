$(function() {

	$(".navbar-nav a").on('click', function() {
		var get_id = $(this).attr('data-item');
		var target = $('#'+get_id).offset().top;
		$('html, body').animate({scrollTop: target}, 800);
	});

	$(window).scroll(function () {
		if ($(window).scrollTop() > 400) {
			$(".navbar").addClass("animated-header");
			$(".navbar-collapse").addClass("animated-header1");
		} else {
			$(".navbar").removeClass("animated-header");
			$(".navbar-collapse").removeClass("animated-header1");
		}
	});

	$('.slide-one').owlCarousel({
		items:1,
		loop:true,
		margin:10,
		autoplay:true,
		autoplayTimeout:5000,
		smartSpeed: 2000
	});

	$('.slide-two').owlCarousel({
		items:6,
		loop:true,
		margin:10,
		autoplay:true,
		autoplayTimeout:5000,
		smartSpeed: 2000,
		responsive:{
		  0:{
        items:4
        },
      480:{
    	  items: 3
      },
      768:{
    	  items: 4
      },
      992:{
      	items: 6
      }
		}
	});


	$('.why-binarkets-item').equalHeights();
	$('.binarkets-icons-item h4').equalHeights();

	$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});

});

$(window).on('load', function() {
	$(".preloader").delay(1000).fadeOut('slow');
})

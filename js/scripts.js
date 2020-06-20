$(document).ready(function(){

	typedJs();
	appear();

	jQuery(window).scroll(function() {
		typedJs();
		appear();
	});

	function typedJs () {
		$('.typed').each(function() {
			var textEl = $(this).find('.typed-js').attr('data-text'),
				_this = $(this),
				_thisEl = $(this).find('.typed-js');
			if ( $(this).is(':in-viewport') && !$(this).hasClass('start')) {
				setTimeout(function() {
					_this.addClass('start');
					_thisEl.typed({
						strings: [textEl],
						typeSpeed: 100,
						preStringTyped: function() {
							$('.banner .typed-cursor').css('display', 'inline-block');
						},
						callback: function() {
							_thisEl.parent().addClass('done');
							$('.typed-cursor').fadeTo("slow", 0);
						}
					});
				}, 500)
			}
		});
	}
	function appear () {
		$('.appear').each(function() {
			if ( $(this).is(':in-viewport') && !$(this).hasClass('animated')) {
				$(this).addClass('animated');
			}
		});
	}

	$('.slide-quote').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		adaptiveHeight: true,
		autoplay: true,
		autoplaySpeed: 10000,
		pauseOnDotsHover: true,
		speed: 500,
		fade: true,
		cssEase: 'linear'
	});

	$('<span class="hamburger"><span></span></span>').appendTo('#header .container');
	$('<span class="fader"/>').appendTo('#header .container');
	$('.hamburger').click(function(){
		$('body').toggleClass('menu-opened');
		return false;
	});
	$('.fader').click(function(){
		$('body').removeClass('menu-opened');
	});
	
	$('.fader').on('touchmove', function() {
		if ($('body').hasClass('menu-opened') && $(window).width() < 992) {
			$('body').removeClass('menu-opened');
		}
	});

	$(".accordeon dd").hide().prev().click(function() {
		$(this).parents(".accordeon").find("dd").not(this).slideUp().prev().removeClass("active");
		$(this).next().not(":visible").slideDown().prev().addClass("active");
	});
	$(".accordeon dl.current dd").show();

	$(window).on("load",function(){
		$(".content").mCustomScrollbar({
			axis:"y",
			theme:"light",
			scrollButtons: false
		});
	});


	var $grid = $('.works-item').isotope({
		itemSelector: '.item-card',
		//layoutMode: 'fitRows',
		percentPosition: true
	});
	$('.works-item li').click(function(){
		$(this).removeClass('active');
		$(this).addClass('active');

		var selector = $(this).attr('data-filter');
		$('.works-item').isotope({
			filter: selector
		});
		return false;
	});

	function mapInitialize(map_) {
		var coords_ = $('#'+ map_).data('coords');
			if (coords_){
				var latitude = coords_.split(',')[0];
				var longtitude = coords_.split(',')[1];
			}
			
		var iconBase = 'img/map-marker.png';

		var latlng = new google.maps.LatLng(latitude,longtitude);
		
		var myOptions = {
			center: latlng,
			scrollwheel: false,
			zoom: 11,
			zoomControl: true,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			disableDoubleClickZoom: true
		};
		
		var map = new google.maps.Map(document.getElementById(map_), myOptions);
		
		var stylesBW = [
			{
				featureType: "all",
				stylers: [
					{ saturation: 0 }
				]
			}
		];

		map.setOptions({styles: stylesBW});

		var marker = new google.maps.Marker({
			position: latlng,
			icon: iconBase,
			map: map
		});
	
	};
	$('.map').each(function(){
		var map_ = $(this).attr('id');
		mapInitialize(map_);
	});

	$('.map-block .block').click(function(){
		$(this).slideUp().parents('.map-block').addClass('height');
	});

});
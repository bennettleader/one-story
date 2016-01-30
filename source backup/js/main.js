$(function(){
  
    // Target your .container, .wrapper, .post, etc.
    $(".slide, .video").fitVids();
  
    $(".title-card").on('click', function() {
      $(window).scrollTo($(".main-content"), 300)
    })
  
    /***************************************************************************************************
        NAV
    ***************************************************************************************************/

    var navOpen = false;

    $('.toggle-nav').click(function(e){
        e.preventDefault();
        var navHeight = $('.main-nav').innerHeight();

        if(navOpen){
            $('.main-nav').transition({'margin-bottom': 0});
            $('.nav-cover').transition({'box-shadow': '0 0 0 #000'});
        }else{
            $('.main-nav').transition({'margin-bottom': -navHeight});
            $('.nav-cover').transition({'box-shadow': '0 0 15px #000'});
        }

        navOpen = !navOpen;
    })

    /***************************************************************************************************
        SLIDER
    ***************************************************************************************************/

    $('.slider.slider-auto').unslider({
        speed: 500,                 //  The speed to animate each slide (in milliseconds)
        delay: 3000,                //  The delay between slide animations (in milliseconds)
        complete: function() {},    //  A function that gets called after every slide animation
        keys: true,                 //  Enable keyboard (left, right) arrow shortcuts
        dots: true,                 //  Display dot navigation
        fluid: true                 //  Support responsive design. May break non-responsive designs
    });
  
    $('.slider.slider-auto .dots')
        .wrap('<div class="slider-controls">')
        .before('<i class="slider-control prev icon icon-arrow-left">')
        .after('<i class="slider-control next icon icon-arrow-right">');
  
    $('.slider:not(.slider-auto)').unslider({
        speed: 500,                 //  The speed to animate each slide (in milliseconds)
        delay: false,                //  The delay between slide animations (in milliseconds)
        complete: function() {},    //  A function that gets called after every slide animation
        keys: true,                 //  Enable keyboard (left, right) arrow shortcuts
        dots: false,                 //  Display dot navigation
        fluid: true                 //  Support responsive design. May break non-responsive designs
    });

    $('.slider:not(.slider-auto)').each(function(){
        var data = $(this).data('unslider');
        var _this = this;
        $(this).siblings().find('.jump-button').click(function(){
          $(this).siblings().removeClass('active');
          $(this).addClass('active');
          $(document).trigger("pause:video", {index: $(this).attr('data-index'), el: data.items[data.current]});
          data.move(parseInt($(this).attr('data-index')), function() { });
        });
      $(this).siblings().find('.jump-button:first-child').addClass('active');
    });
  

    $('.slider').each(function(){
        var data = $(this).data('unslider');

        $(this).find('.slider-controls .next').click(function(){
            data.next();
        });

        $(this).find('.slider-controls .prev').click(function(){
            data.prev();
        });
    });

    $(document).on("pause:video", function(event, data) {

      var iframe = $(data.el).find('iframe');
      
      if (iframe.attr('src').match('vimeo')) {
        var url = iframe.attr('src').split('?')[0];
        iframe[0].contentWindow.postMessage(JSON.stringify({method: 'pause', value: 1}), url);
      }
      else if (iframe.attr('src').match('youtube')) {
        callPlayer(iframe.attr('id'), "pauseVideo");
      }
    })
  
    /***************************************************************************************************
        RESPONSIVE IMAGES
    ***************************************************************************************************/

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // we're on a mobile device

        // flag indacates whether this is a phone sized device or not
        var Phone = screen.width <= 640 ? true : false;

        // flag indicates whether the device has a high pixel density, ie - retina
        var Retina = window.devicePixelRatio > 1 ? true : false;

        $('img').each(function(){
            var url;
            var src = $(this).attr('data-src');
            var srcPhone = $(this).attr('data-src-phone');
            var srcRetina = $(this).attr('data-src-retina');

            if(phone){
                if(retina){
                    if(srcRetina){
                        url = srcRetina;
                    }else{
                        url = srcPhone;
                    }
                }else{
                    url = srcPhone;
                }
            }else{
                url = src;
            }

            if(url){
                $(this).attr('src', url);
            }
        });
    }
});


/***************************************************************************************************
        HOMEPAGE BG IMAGE TRANSITION
    **************************************************************************************************

function preloadImages(srcs) {
    if (!preloadImages.cache) {
        preloadImages.cache = [];
    }
    var img;
    for (var i = 0; i < srcs.length; i++) {
        img = new Image();
        img.src = srcs[i];
        preloadImages.cache.push(img);
    }
}

// then to call it, you would use this
var imageSrcs = ["img/homepage/bg1.jpg", "img/homepage/bg2.jpg", "img/homepage/bg3.jpg", "img/homepage/bg4.jpg", "img/homepage/bg5.jpg"];

preloadImages(imageSrcs);


$(window).load(function(){
    
var initialBg =  $('.title-card').css("background-image");
    
var firstTime = true;
var arr = [initialBg, "url(img/homepage/bg1.jpg)", "url(img/homepage/bg2.jpg)", "url(img/homepage/bg3.jpg)", "url(img/homepage/bg4.jpg)", "url(img/title-card.jpg)"];
    (function recurse(counter) {
        var bgImage = arr[counter];
        if (firstTime == false) {
            $(".title-card").fadeOut("slow", function(){
                $('.title-card').css('background-image', bgImage);
            });
            $(".title-card").fadeIn("slow");
        } else {
            firstTime = false;
        }               
        delete arr[counter];
        arr.push(bgImage);
        setTimeout(function() {
            recurse(counter + 1);
        }, 4500);
    })(0);      
});
*/

$(function() {
  $("#modal-1").on("change", function() {
    if ($(this).is(":checked")) {
      $("body").addClass("modal-open");
    } else {
      $("body").removeClass("modal-open");
    }
  });

  $(".modal-fade-screen, .modal-close").on("click", function() {
    $(".modal-state:checked").prop("checked", false).change();
  });

  $(".modal-inner").on("click", function(e) {
    e.stopPropagation();
  });
});

jQuery(document).ready(function ($) {
    $('.fancybox').fancybox({
        helpers: {
            media: {}
        }
    });
});
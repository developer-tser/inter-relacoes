$(document).ready(function () {

    "use strict";

    // Variables

    var triggerVid;
    var launchkit_hoverGallery;


    // Disable default click on a with blank href

    $('a').click(function () {
        if ($(this).attr('href') === '#') {
            return false;
        }
    });

    // Smooth scroll to inner links

    if ($('.inner-link').length) {
        $('.inner-link').smoothScroll({
            offset: -59,
            speed: 800
        });
    }

    // Close mobile menu once link is clicked

    $('.menu li a').click(function () {
        if ($('nav').hasClass('nav-open')) {
            $('nav').removeClass('nav-open');
        }
    });


    // Set bg of nav container if dark skin

    if ($('nav').hasClass('dark')) {
        $('.nav-container').addClass('dark');
        $('.main-container').find('section:nth-of-type(1)').css('outline', '40px solid #222');
    }

    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
            $('nav').addClass('fixed');
        } else {
            $('nav').removeClass('fixed');
        }

    });

    if (!$('nav').hasClass('fixed') && !$('nav').hasClass('overlay')) {

        // Compensate the height of parallax element for inline nav

        if ($(window).width() > 768) {
            $('.parallax:first-child .background-image-holder').css('top', -($('nav').outerHeight(true)));
        }

        // Adjust fullscreen elements
        if ($(window).width() > 768 && ($('section.parallax:first-child, header.parallax:first-child').outerHeight() == $(window).height())) {
            $('section.parallax:first-child, header.parallax:first-child').css('height', ($(window).height() - $('nav').outerHeight(true)));
        }
    }

    // Mobile nav

    $('.mobile-toggle').click(function () {
        $(this).closest('nav').toggleClass('nav-open');
        if ($(this).closest('nav').hasClass('nav-3')) {
            $(this).toggleClass('active');
        }
    });

    // Initialize sliders

    if ($('.hero-slider').length) {
        $('.hero-slider').flexslider({
            directionNav: false
        });
    }

    if ($('.slider').length) {
        $('.slider').flexslider({
            directionNav: false
        });
    }

    // Append .background-image-holder <img>'s as CSS backgrounds

    $('.background-image-holder').each(function () {
        var imgSrc = $(this).children('img').attr('src');
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this).children('img').hide();
        $(this).css('background-position', '50% 50%');
    });

    // Fade in background images

    setTimeout(function () {
        $('.background-image-holder').each(function () {
            $(this).addClass('fadeIn');
        });
    }, 200);


    $('.local-video-container .play-button').click(function () {
        $(this).toggleClass('video-playing');
        $(this).closest('.local-video-container').find('.background-image-holder').toggleClass('fadeout');
        $("#video")[0].src += "&autoplay=1";
        ev.preventDefault();
    });

    // Video controls for modals

    $('.modal-video-container .play-button').click(function () {
        $(this).toggleClass('video-playing');
        $(this).closest('.modal-video-container').find('.modal-video').toggleClass('reveal-modal');
        $(this).closest('.modal-video-container').find('video').get(0).play();
    });

    $('.modal-video-container .modal-video').click(function (event) {
        var culprit = event.target;
        if ($(culprit).hasClass('modal-video')) {
            $(this).find('video').get(0).pause();
        }
    });

    // Hover gallery
    $('.hover-gallery').each(function () {
        var that = $(this);
        var timerId = setInterval(function () { scrollHoverGallery(that); }, $(this).closest('.hover-gallery').attr('speed'));
        $(this).closest('.hover-gallery').attr('timerId', timerId);

        $(this).find('li').bind('hover, mouseover, mouseenter, click', function (e) {
            e.stopPropagation();
            clearInterval(timerId);
        });

    });


    $('.hover-gallery li').mouseenter(function () {
        clearInterval($(this).closest('.hover-gallery[timerId]').attr('timerId'));
        $(this).parent().find('li.active').removeClass('active');
        $(this).addClass('active');
    });

    // Pricing table remove emphasis on hover

    $('.pricing-option').mouseenter(function () {
        $(this).closest('.pricing').find('.pricing-option').removeClass('active');
        $(this).addClass('active');
    });

    // Map overlay switch

    $('.map-toggle .switch').click(function () {
        $(this).closest('.contact').toggleClass('toggle-active');
        $(this).toggleClass('toggle-active');
    });

    // Twitter Feed
    jQuery('.tweets-feed').each(function (index) {
        jQuery(this).attr('id', 'tweets-' + index);
    }).each(function (index) {

        var TweetConfig = {
            "id": jQuery('#tweets-' + index).attr('data-widget-id'),
            "domId": '',
            "maxTweets": jQuery('#tweets-' + index).attr('data-amount'),
            "enableLinks": true,
            "showUser": true,
            "showTime": true,
            "dateFunction": '',
            "showRetweet": false,
            "customCallback": handleTweets
        };
        function handleTweets(tweets) {
            var x = tweets.length;
            var n = 0;
            var element = document.getElementById('tweets-' + index);
            var html = '<ul class="slides">';
            while (n < x) {
                html += '<li>' + tweets[n] + '</li>';
                n++;
            }
            html += '</ul>';
            element.innerHTML = html;
            return html;
        }
        twitterFetcher.fetch(TweetConfig);
    });

    // Instagram Feed

    if ($('.instafeed').length) {
        jQuery.fn.spectragram.accessData = {
            accessToken: '1406933036.fedaafa.feec3d50f5194ce5b705a1f11a107e0b',
            clientID: 'fedaafacf224447e8aef74872d3820a1'
        };
    }

    $('.instafeed').each(function () {
        $(this).children('ul').spectragram('getUserFeed', {
            query: $(this).attr('data-user-name')
        });
    });

    // Sort tabs into 2 ul's

    $('.tabbed-content').each(function () {
        $(this).append('<ul class="content"></ul>');
    });

    $('.tabs li').each(function () {
        var originalTab = $(this), activeClass = "";
        if (originalTab.is('.tabs li:first-child')) {
            activeClass = ' class="active"';
        }
        var tabContent = originalTab.find('.tab-content').detach().wrap('<li' + activeClass + '></li>').parent();
        originalTab.closest('.tabbed-content').find('.content').append(tabContent);
    });

    $('.tabs li').click(function () {
        $(this).closest('.tabs').find('li').removeClass('active');
        $(this).addClass('active');
        var liIndex = $(this).index() + 1;
        $(this).closest('.tabbed-content').find('.content li').removeClass('active');
        $(this).closest('.tabbed-content').find('.content li:nth-child(' + liIndex + ')').addClass('active');
    });


    // Contact form code

    $('form.form-email').submit(function (e) {

        e.preventDefault();

        var name = $("#name");
        var mobile = $("#mobile");
        var email = $("#email");
        $('.form-error').hide();

        if (name.val() == "") {
            name.closest(".form-group").addClass("field-error");
            name.focus();
            console.log('aa');
            $('.form-error').show();
            return false;
        } else {
            name.closest(".form-group").removeClass("field-error").addClass("field-success");
        }

        if (mobile.val() == "") {
            mobile.closest(".form-group").addClass("field-error");
            mobile.focus();
            $('.form-error').show();
            return false;
        } else {
            mobile.closest(".form-group").removeClass("field-error").addClass("field-success");
        }

        if (email.val() == "") {
            email.closest(".form-group").addClass("field-error");
            email.focus();
            $('.form-error').show();
            return false;
        } else {
            email.closest(".form-group").removeClass("field-error").addClass("field-success");
        }

        var dataString = "NOME=" + name.val() + " TELEFONE=" + mobile.val() + " EMAIL=" + email.val();

        $('input[type="submit"]').prop('disabled', true);

        $.ajax({
            url: "https://formspree.io/eduardoluizsantos@hotmail.com",
            method: "POST",
            data: { message: dataString },
            dataType: "json",
            success: function (data) {
                $('.form-success').show();
            },
        });
    });

    // End Contact Form Code

  


});
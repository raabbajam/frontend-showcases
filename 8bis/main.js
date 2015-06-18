$(function () {
  var $slides = $('.slides');
  var ao$slide = $('.slide'); // array of slides
  var ao$pagination = $('.pagination li');
  var slidesLength;
  var lastSlide;
  var curr;

  var end = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';

  var slider = {
    init: init,
    focus: focus,
  };
  window.slider = slider;

  slider.init();


  // ---------------------------------------------
  function init() {
    slidesLength = ao$slide.length;
    lastSlide = slidesLength - 1;

    // prepend last slide
    $slides.prepend(ao$slide.last().clone());

    // append first slide
    $slides.append(ao$slide.first().clone());

    // adding handler
    // pagination
    ao$pagination.each(function (i) {
      $(this).on('click', function () {
        slider.focus(i);
      });
    })

    // click slide
    var vw = $($slides).outerWidth();
    var vh = $($slides).outerHeight();
    var cursor = $('.cursor');
    $slides
      // click
      .on('click', function (e) {
        var pos = e.pageX / vw;
        if (pos < 0.5) {
          focus(curr - 1);
        } else {
          focus(curr + 1);
        }
      })
      // hover
      .on('mousemove', function (e) {
        // offset 0 ~ 1
        var offset = {
          x: e.pageX / vw,
          y: e.pageY / vh,
        };
        // pos 0 ~ 100 %
        var posBg = offset.x * 100 + '% ' + (1 - offset.y)  * 100 + '%';
        $('.display', $slides).css('background-position', posBg);
        // -25 ~ 25 px
        var posCaption = (offset.x * -50) + 25 + 'px';
        var posImg = 'translateX(' + Math.round((offset.x * -50) + 25) + 'px) ' +
          'translateY(' + Math.round((offset.y * -50) + 25) + 'px)';
        console.log(posImg);
        $('.caption', $slides).css( 'left', posCaption);
        $('img', $slides).css('transform', posImg);

        // cursor position
        cursor.css('left', e.pageX + 10).css('top', e.pageY - 80);
        // cursor shape
        cursor.text(offset.x < 0.5 ? '<': '>');
        // cursor size 2em ~ 5em
        var fontSize = Math.abs(offset.x - 0.5) * 6 + 2 + 'em';
        cursor.css('font-size', fontSize);

      })
      .on('mouseenter', function () {
        cursor.css({
        '-webkit-transform': 'scale(1)',
        '-ms-transform': 'scale(1)',
        '-o-transform': 'scale(1)',
        'transform': 'scale(1)',
        });
      })
      .on('mouseleave', function (e) {
        cursor.css({
        '-webkit-transform': 'scale(0)',
        '-ms-transform': 'scale(0)',
        '-o-transform': 'scale(0)',
        'transform': 'scale(0)',
        });
      });
    // focus back on first slide
    slider.focus(0);
  }

  function focus(num) {
    curr = num;
    // shift left pos
    // num zero means 2nd slide since there is additional prepended slide
    var pos = -100 * (num + 1);
    var transform = 'translateX(' + pos + '%)';
    $slides.css('transform', transform);

    // checking
    // click prev on first slide (num 0)
    if (num === -1) {
      $slides.one(end, function(e){
        $(this).off(end);
        $slides.addClass('notransition');
        focus(lastSlide);
        setTimeout(function () {
          $slides.removeClass('notransition');
        });
      });
      return ;
    }
    // click nex on last slide
    if (num === lastSlide + 1) {
      $slides.one(end, function(){
        $(this).off(end);
        $slides.addClass('notransition');
        focus(0);
        setTimeout(function () {
          $slides.removeClass('notransition');
        });
      });
      return ;
    }

    ao$pagination.removeClass('active');
    ao$pagination.eq(num).addClass('active');
    $('.slide').removeClass('active');
    $('.slide-' + (+num + 1)).addClass('active');

  }
});

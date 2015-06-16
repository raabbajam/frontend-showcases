$(function () {
  var $slides = $('.slides');
  var ao$slide = $('.slide'); // array of slides
  var ao$pagination = $('.pagination li');
  var slidesLength;
  var lastSlide;

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

    // hover
    var vw = $($slides).outerWidth();
    var vh = $($slides).outerHeight();
    $slides.on('mousemove', function (e) {
      var offset = {
        x: e.pageX / vw * 100,
        y: 100 - (e.pageY / vh * 100),
      };
      var pos = offset.x + '% ' + offset.y + '%';
      console.log(pos);
      $('.display', $slides).css('background-position', pos)
    });

    // focus back on first slide
    slider.focus(0);
  }

  function focus(num) {
    console.log('focus', num);
    // shift left pos
    // num zero means 2nd slide since there is additional prepended slide
    var pos = -100 * (num + 1);
    var transform = 'translateX(' + pos + '%)';
    $slides.css('transform', transform);

    // checking
    // click prev on first slide (num 0)
    if (num === -1) {
      $slides.one(end, function(e){
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

  }
});

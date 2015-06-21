$(function () {

  var $content = $('.content');
  var $itemWrapper = $('.item-wrapper');

  // get data
  $.getJSON('./data/item.json', function (items) {
    var items = items.map(function (item) {
      return templates.item.render(item);
    });
    $itemWrapper.html($itemWrapper.html().trim() + items.join(''));
    init();
  });

  function init() {

    var $contentWidth = $content.width();
    var $itemWrapperWidth = $itemWrapper[0].scrollWidth;
    var contentOverflow = $itemWrapperWidth - $contentWidth;

    $content
      // content hover handle
      .on('mouseenter mouseleave', function () {
        $content.toggleClass('hovered');
      })

      // logo handle
      .on('mouseenter mouseleave', '.first', toggleLogo)

      // scroll handle
      .on('mousemove', function (e) {
        // pos will be beetwen 0 - 1
        var pos = e.pageX / $contentWidth;

        // scroll to min - max content width;
        $itemWrapper.animate({scrollLeft:pos * contentOverflow}, {queue:false, duration: 0, easing: 'easeInOutCirc'});
      });
  }

  function toggleLogo () {
    $('.logo').toggleClass('invert');
  };
  $.easing.easeInOutCirc = function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	}
});

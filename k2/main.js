$(function () {
  function toggleLogo () {
    $('.logo').toggleClass('invert');
  };

  var $content = $('.content');
  var $itemWrapper = $('.item-wrapper');
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
        var pos = e.pageX / $contentWidth;
        $itemWrapper.scrollLeft(pos * contentOverflow);
      });
  }


  $.getJSON('./data/item.json', function (items) {
    var items = items.map(function (item) {
      return templates.item.render(item);
    });
    $itemWrapper.html($itemWrapper.html().trim() + items.join(''));
    init();
  });
});

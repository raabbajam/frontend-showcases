$(function () {
  function toggleLogo () {
    $('.logo').toggleClass('invert');
  };

  var $content = $('.content');
  var $contentWidth = $content.width()
  var $itemWrapper = $('.item-wrapper')
  var $itemWrapperWidth = $itemWrapper[0].scrollWidth;
  var contentOverflow = $itemWrapperWidth - $contentWidth;

  $content
    // logo handle
    .on('mouseenter mouseleave', function () {
      $content.toggleClass('hovered');
    })
    .on('mouseenter mouseleave', '.first', toggleLogo)

    // scroll handle
    .on('mousemove', function (e) {
      var pos = e.pageX / $contentWidth;
      $itemWrapper.scrollLeft(pos * contentOverflow);
    });
});

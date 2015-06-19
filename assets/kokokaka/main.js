$(function() {

  var $content = $('.content');
  var $window = $(window);
  var scrollPosition = false;

  // get data via ajax
  $.getJSON('./data.json', function (items) {

    var items = items.map(function (item) {
      return templates.item.render({item: item});
    });

    // prepare el 1 - 5 as half and double classes
    var html = [
      '<div class="half">' + items[0] + items[1] + '</div>',
      '<div class="double">' + items[2] + '</div>',
      '<div class="half">' + items[3] + items[4] + '</div>',
    ];

    // concat rest of the items
    html = html.concat(items.slice(5));

    // put it on content
    $content.html(html.join(''));
  });

  // click handler
  $content
    // click on item
    .on('click', '.item', function () {
      // note scroll position
      scrollPosition = $window.scrollTop();
      $(this).toggleClass('active');
      toggle();
    })

    // click on detail buttons
    .on('click', '.active .toggle-detail', function () {
      var i = $(this);
      var detail = i.parents('.detail');
      detail.toggleClass('toggle-hide');
      i.text(i.text() === '+' ? '-' : '+');
      return false;
    });

  $('.content-navigation')
    .on('click', '.close', function () {

      $('.item.active').toggleClass('active');
      toggle();
      if (scrollPosition !== false) {
        $window.scrollTop(scrollPosition);
        scrollPosition = false;
      }

    })
    .on('click', '.next', function () {
      handleNavigation('next');
    })
    .on('click', '.previous', function () {
      handleNavigation('prev');
    });

  function toggle() {
    $('.main').toggleClass('active-content');
  }

  function handleNavigation(dir) {
    var $item = $('.item.active');
    var sibling = getSibling($item, dir);

    $item.toggleClass('active');
    sibling.toggleClass('active');

  }
  function getSibling($item, dir) {
    var ao$item = $('.item');
    var idx = ao$item.index($item);
    var sibling = ao$item.eq(idx + (dir === 'next' ? 1 : -1));

    // if still not fiund, loop back,
    //   if dir is next, get first
    //   if dir is prev, get last
    if (!sibling.length)
      sibling = ao$item[dir === 'next' ? 'first' : 'last']();
    return sibling;
  }
});

$(function() {

  var $content = $('.content');
  var $header = $('header');
  var $window = $(window);
  var $main = $('.main');
  var scrollPosition = false;
  var routes = {
    '/project/:pid': viewProject
  };
  var router = Router(routes);


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
    $('.item').each(function (i) {
      $(this).data('item', i);
    });
    router.init();
  });

  // click handler
  $content
    // click on item
    .on('click', '.item', function () {
      // note scroll position
      scrollPosition = $window.scrollTop();
      var $this = $(this);
      $this.toggleClass('active');
      router.setRoute('project/' + $this.data('item'));
      toggle();
    })

    // click on detail buttons
    .on('click', '.active .toggle-detail', function () {
      var i = $(this);
      var detail = i.parents('.detail');
      var item = i.parents('.item');
      detail.toggleClass('toggle-hide');
      if (i.text() === '+') {
        i.text('-');
        router.setRoute('project/' + item.data('item') + '/detail');
      } else {
        i.text('+');
        router.setRoute('project/' + item.data('item'));
      }

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

  $window.on('focus', function () {
    $header.toggleClass('active');
    setTimeout(function(){
      $header.toggleClass('active');
    }, 100);
  });

  function toggle() {
    $main.toggleClass('active-content');
    if (!$main.hasClass('active-content'))
      router.setRoute('/');

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

    router.setRoute('project/' + sibling.data('item'));
    return sibling;
  }

  function viewProject(pid) {
    $main.addClass('active-content');
    $('.item').eq(pid).addClass('active');
  };
});

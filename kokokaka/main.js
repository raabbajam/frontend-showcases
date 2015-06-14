$(function() {
  var $content = $('.content')
  $.getJSON('./data.json', function (items) {
    var items = items.map(function (item) {
      return templates.item.render({item: item});
    });
    var html = [
      '<div class="half">' +
        items[0] +
        items[1] +
      '</div>',
      '<div class="double">' + items[2] + '</div>',
      '<div class="half">' +
        items[3] +
        items[4] +
      '</div>',
    ];
    html = html.concat(items.slice(5));
    $content.html(html.join(''));
  });
  $content.on('click', '.item', function () {
    $(this).toggleClass('active');
    toggle();
  }).on('click', '.active .toggle-detail', function () {
    var i = $(this);
    var detail = i.parents('.detail');
    detail.toggleClass('toggle-hide');
    i.text(i.text() === '+' ? '-' : '+');
    return false;
  });
  $('.content-navigation .close').on('click', function () {
    $('.item.active').toggleClass('active');
    toggle();
  });

  function toggle() {
    $('.main').toggleClass('active-content');
  }
});

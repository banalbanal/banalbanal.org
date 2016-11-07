(function($) {
  var attachMenuBehav = function() {
    var toggle = $('.toggle')
    toggle.click( function(event) {
      var hidable = $('.hidable')
      var content = $('.page-content')
      hidable.toggleClass('hidden')
      content.toggleClass('hidden')
    })
  }

  var injectMenu = function(cb) {
    $(".inject-menu" ).load("menu.html", cb)
  }
  
  $(document).ready(function() {
    injectMenu(function() {
      attachMenuBehav();
    })
  })
})(jQuery)



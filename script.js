var attachMenuBehav = function() {
  var toggle = document.querySelector('.toggle')
  toggle.addEventListener('click', function(event) {
    var hidable = document.querySelector('.hidable')
    var content = document.querySelector('.page-content')
    hidable.classList.toggle('hidden')
    content.classList.toggle('hidden')
  })
}

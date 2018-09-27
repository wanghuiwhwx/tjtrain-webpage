$(function() {
  $(".tag-box").on("click","li",function() {
    $(this).addClass("on").siblings("li").removeClass("on")
  })
})
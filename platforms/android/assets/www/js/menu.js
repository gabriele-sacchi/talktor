$(".button-collapse").sideNav();
// Show sideNav
$(window).scroll(
    {
        previousTop: 0
    }, 
    function () {
    var currentTop = $(window).scrollTop();
    if (currentTop < this.previousTop) {
        $(".sidebar em").text("Up");
        $(".header").show();
    } else {
        $(".sidebar em").text("Down");
        $(".header").hide();
    }
    this.previousTop = currentTop;
});        
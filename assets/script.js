function lessAll() {
  $(".show-less:lang(ko)").text("자세히 보기");
  $(".show-less:lang(ko)").switchClass("show-less", "show-more", 400);
  $(".show-less:lang(en)").text("Show more");
  $(".show-less:lang(en)").switchClass("show-less", "show-more", 400);
  $(".full-text").switchClass("full-text", "short-text", 400);
}

$(document).ready(function(){
   $(":lang(ko)").show()

   $('#nav').onePageNav({
     changeHash: false,
     scrollSpeed: 750,
     scrollOffset: 30,
     scrollThreshold: 0.5,
   });

   $(".show-more a:lang(en)").on("click", function() {
    var $link = $(this);
    var $content = $(this).parent().parent().find("div.project_description");
    var linkText = $link.text().toUpperCase();

		switchClasses($content);

    $link.text(getShowLinkTextEn(linkText));

    return false;
  });

   $(".show-more a:lang(ko)").on("click", function() {
    var $link = $(this);
    var $content = $(this).parent().parent().find("div.project_description");
    var linkText = $link.text().toUpperCase();

		switchClasses($content);

    $link.text(getShowLinkTextKo(linkText));

    return false;
  });

  function switchClasses($content){
    if($content.hasClass("short-text")){
        $content.switchClass("short-text", "full-text", 400);
    } else {
        $content.switchClass("full-text", "short-text", 400);
    }
  }

  function getShowLinkTextEn(currentText){
    var newText = '';

    if (currentText === "SHOW MORE") {
        newText = "Show less";
    } else {
        newText = "Show more";
    }

    return newText;
  }

  function getShowLinkTextKo(currentText){
    var newText = '';

    if (currentText === "자세히 보기") {
        newText = "접기";
    } else {
        newText = "자세히 보기";
    }

    return newText;
  }
});

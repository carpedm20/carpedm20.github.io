$(document).ready(function(){
   $('#nav').onePageNav({
     changeHash: false,
     scrollSpeed: 750,
     scrollOffset: 30,
     scrollThreshold: 0.5,
   });

   $(".show-more a").on("click", function() {
    var $link = $(this);
    var $content = $(this).parent().parent().find("div.project_description");
    var linkText = $link.text().toUpperCase();

		switchClasses($content);

    $link.text(getShowLinkText(linkText));

    return false;
  });

  function switchClasses($content){
    if($content.hasClass("short-text")){
        $content.switchClass("short-text", "full-text", 400);
    } else {
        $content.switchClass("full-text", "short-text", 400);
    }
  }

  function getShowLinkText(currentText){
    var newText = '';

    if (currentText === "자세히 보기") {
        newText = "접기";
    } else {
        newText = "자세히 보기";
    }

    return newText;
  }
});

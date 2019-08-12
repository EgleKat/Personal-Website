var popedUpProjectHexagon = 0;
var popup = $(".popup");

var togglePopup = function(projectInfo) {


    //popup is disabled
    if (popedUpProjectHexagon === 0) {
        updatePopup(projectInfo);
        //enable popup
        popup.toggle("drop", { "direction": "right" }, 500);
        popedUpProjectHexagon = projectInfo.hexagon;
    }
    //popup is enabled
    else {
        //the same project
        if (popedUpProjectHexagon === projectInfo.hexagon) {
            popedUpProjectHexagon = 0;
        }
        //different project
        else {

            //quickly disable old one
            popup.toggle("drop", { "direction": "right" }, 200);
            popedUpProjectHexagon = projectInfo.hexagon;
            updatePopup(projectInfo);

        }
        //enable/disable
        popup.toggle("drop", { "direction": "right" }, 500);
    }

    console.log(projectInfo);
};

var updatePopup = function(projectInfo) {

    //change the title
    popup.find("h1").empty().append(projectInfo.title);

    //change the image
    $(".popupImage").attr("src", "images/" + projectInfo.image);

    //change description
    $(".popupDescription").empty().append(projectInfo.description);


    //add other info
    var popupInfo = $(".popupInfo");
    for (var i = 0; i < projectInfo.shortDescriptions.length; i++) {
        popupInfo.empty();
        popupInfo.append("<h3>" + projectInfo.shortDescriptions[i].title + "</h3>");
        popupInfo.append(projectInfo.shortDescriptions[i].description);

    }

    //if there's no link - remove the link
    if (projectInfo.link === undefined || projectInfo.link === "") {
        popup.find("a").hide();
    } else {
        popup.find("a").show();
        //add link src
        popup.find("a").attr("href", projectInfo.link);
    }
}

var changePopupImage = function() {
    $(".popupImage").attr("src", "second.jpg");
};
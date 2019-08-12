var popedUpProjectHexagon = 0;
var popup = $(".popup");

var togglePopup = function(projectInfo) {


    if (projectInfo !== undefined && projectInfo !== null) {
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
    } else {
        popup.toggle("drop", { "direction": "right" }, 500);
        popedUpProjectHexagon = 0;
    }
};

var back = function() {
    togglePopup();
};
var updatePopup = function(projectInfo) {

    //change the title
    popup.find("h1").empty().append(projectInfo.title);

    //change the image
    $(".popupImage").attr("src", "images/" + projectInfo.image);

    //change description
    $(".popupDescription").empty().append(projectInfo.description);


    //add other info
    var popupInfo = document.getElementsByClassName("popupInfo")[0];
    popupInfo.innerHTML = "";

    for (var i = 0; i < projectInfo.shortDescriptions.length; i++) {
        //create new div
        var newDiv = document.createElement("div");
        newDiv.className = ("popupDescription");
        //create heading
        var heading = document.createElement('h3');
        heading.innerHTML = projectInfo.shortDescriptions[i].title;
        //add heading to div
        newDiv.appendChild(heading);
        //add text to div
        var node = document.createTextNode(projectInfo.shortDescriptions[i].description);
        newDiv.appendChild(node);
        //append div to popupinfo
        popupInfo.appendChild(newDiv);

    }

    //if there's no link - remove the link
    if (projectInfo.link === undefined || projectInfo.link === "" || projectInfo.link === null) {
        $(".externalProjectLink").hide();
    } else {
        $(".externalProjectLink").show();
        //add link src
        $(".externalProjectLink").attr("href", projectInfo.link);
    }
};
var popedUpProjectHexagon = 0;
var popup = $(".popup");

var togglePopup = function(projectInfo) {


    //popup is disabled
    if (popedUpProjectHexagon === 0) {
        popup.toggle("drop", 500);
        popedUpProjectHexagon = projectInfo.hexagon;
    }
    //popup is enabled
    else {
        //different project
        if (popedUpProjectHexagon !== projectInfo.hexagon) {

            //quickly disable old one
            popup.toggle("drop", 100);
            //enable new one
            popup.toggle("drop", 500);
            popedUpProjectHexagon = projectInfo.hexagon;
        }
        //the same project
        else {
            //disable the popup
            popup.toggle("drop", 500);
            popedUpProjectHexagon = 0;
        }
    }

    console.log(projectInfo);
    console.log("Calling now");
};
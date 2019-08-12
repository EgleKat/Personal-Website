var windowWidth = $(window).width();
var windowHeight = $(window).height();
var maxNoHorizontalHexagons = 4;
var maxNoVerticalHexagons = 3;






var draw;
$(document).ready(function() {

    $.getJSON("data/projects.json", function(data) {
        //sort the data by the hexagon number
        data.sort((a, b) => (a.hexagon > b.hexagon) ? 1 : -1);
        console.log(data);



        draw = SVG('drawing').size(windowWidth, windowHeight);

        var marginAmount = 200;

        var adjustedWindowWidth = windowWidth - marginAmount;
        var adjustedWindowHeight = windowHeight - marginAmount;


        /* ****** */
        //these hexagons are pointy side up
        var hexagonWidth = adjustedWindowWidth / 6.0; //middle row has 6 hexagons and fills width
        var hexagonHeight = hexagonWidth / Math.sqrt(3) * 2; // https://www.redblobgames.com/grids/hexagons/

        // or
        var hexagonHeight2 = adjustedWindowHeight / 2.5;
        var hexagonWidth2 = hexagonHeight2 / 2.0 * Math.sqrt(3);

        if (hexagonHeight2 < hexagonHeight) {
            hexagonWidth = hexagonWidth2;
            hexagonHeight = hexagonHeight2;
        }

        var smallRow = false; //small rows have 5 hexagons, large rows have 6
        var numRows = 3;
        var largeRowSize = 6;
        var allHexagonsWidth = hexagonWidth * largeRowSize;
        var columnOffset = (allHexagonsWidth + 0.01 < adjustedWindowWidth ? (adjustedWindowWidth - allHexagonsWidth) / 2.0 : 0);
        var currentHexagon = 0;

        for (var row = 0; row < numRows; row++) {
            for (var column = 0; column < (smallRow ? largeRowSize - 1 : largeRowSize); column++) {
                currentHexagon++;
                var project = data.find(function(obj) {
                    return obj.hexagon === currentHexagon;
                });
                drawHexagon(project, column * hexagonWidth + (smallRow ? hexagonWidth : 0.5 * hexagonWidth) + columnOffset + marginAmount / 2, 0.75 * row * hexagonHeight + 0.5 * hexagonHeight + marginAmount / 2, hexagonWidth, hexagonHeight);
            }
            smallRow = !smallRow;
        }

        /* ****** */
    });

});






/**
 * 
 * @param {} projectInfo information from the data file about a specific project
 * @param {float} cx center x point of hexagon
 * @param {float} cy center y point of hexagon
 * @param {float} w width of hexagon
 * @param {float} h height of hexagon
 */
function drawHexagon(projectInfo, cx, cy, w, h) {
    var scale = 1.5;
    var points = "";
    var scaledPoints = "";
    var f = function(x, y) {
        x = Math.round(x);
        y = Math.round(y);
        var scaledX = Math.round(scale * (x - cx) + cx);
        var scaledY = Math.round(scale * (y - cy) + cy);

        scaledPoints += scaledX + "," + scaledY + " ";

        points += x + "," + y + " ";
    }
    f(cx - w / 2.0, cy - h / 4.0); //top left
    f(cx, cy - h / 2.0); //top
    f(cx + w / 2.0, cy - h / 4.0); //top right
    f(cx + w / 2.0, cy + h / 4.0); // bottom right
    f(cx, cy + h / 2.0); //bottom
    f(cx - w / 2.0, cy + h / 4.0); //bottom left



    var polygon = draw.polygon(points.trim())
        .stroke({ width: 3 })
        .attr("vector-effect", "non-scaling-stroke")
        .attr("class", "hexagon");;

    var animateMouseover = draw.element('animate');
    animateMouseover.attr({
        begin: "indefinite",
        fill: "freeze", //stay in the final frame of the animation on completion
        attributeName: "points",
        dur: "200ms",
        to: scaledPoints.trim(),
    });
    polygon.node.appendChild(animateMouseover.node);

    var animateMouseout = draw.element('animate');
    animateMouseout.attr({
        begin: "indefinite",
        fill: "freeze", //stay in the final frame of the animation on completion
        attributeName: "points",
        dur: "200ms",
        to: points.trim(),
    });
    polygon.node.appendChild(animateMouseout.node);

    //no project for this hexagon
    if (projectInfo === undefined) {

        polygon
            .fill('#f7f7f7')
    }
    //there is a project for this hexagon 
    else {
        var pattern = draw.pattern(1, 1, function(add) {
            add.rect(2 * w, 2 * h).fill("#fff");
            var i = add.image("images/" + projectInfo.image);
            i.attr({
                x: -1.5 * w,
                y: -1.5 * h,
                width: 4 * w,
                height: 4 * h
            });
            polygon.mouseover(function() {
                i.animate(200).attr({
                    x: -0.25 * w,
                    y: -0.25 * h,
                    width: 2 * w,
                    height: 2 * h
                });
            });
            polygon.mouseout(function() {
                i.animate(200).attr({
                    x: -1.5 * w,
                    y: -1.5 * h,
                    width: 4 * w,
                    height: 4 * h
                });
            });

        });
        pattern.attr({
            patternUnits: "objectBoundingBox",
            patternContentUnits: "userSpaceOnUse",
        });
        polygon
        //change hexagon image
        // .fill('url(#image1)')
            .fill(pattern)
            .attr("class", "hexagon active");
        //.fill(draw.image("images/" + projectInfo.image, 500, 500));
        polygon.click(function() {
            togglePopup(projectInfo);
        });

    }
    polygon.mouseover(function() {
        polygon.front();
        document.getElementById(animateMouseover.id()).beginElement();
    });
    polygon.mouseout(function() {
        document.getElementById(animateMouseout.id()).beginElement();
    });

}
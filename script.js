var windowWidth = $(window).width();
var windowHeight = $(window).height();
var maxNoHorizontalHexagons = 4;
var maxNoVerticalHexagons = 3;

var hexagonHalfWidth = windowWidth / 12;
//find out what's needed
var hexagonHalfHeight = windowHeight / 3;

var currentHexagonX = hexagonHalfWidth;
var currentHexagonY = 0;

// for (var i = 0; i < 16; i++) {
//     drawHexagon(currentHexagonX, currentHexagonY);

//     currentHexagonX += hexagonHalfWidth * 2;
//     //TODO 
// }




var draw;
$(document).ready(function () {

    draw = SVG('drawing').size(windowWidth, windowHeight);





    /* ****** */
    //these hexagons are pointy side up
    var hexagonWidth = windowWidth / 6.0; //middle row has 6 hexagons and fills width
    var hexagonHeight = hexagonWidth / Math.sqrt(3) * 2; // https://www.redblobgames.com/grids/hexagons/

    // or
    var hexagonHeight2 = windowHeight / 2.5;
    var hexagonWidth2 = hexagonHeight2 / 2.0 * Math.sqrt(3);

    console.log(hexagonWidth + "," + hexagonHeight + "," + hexagonWidth2 + "," + hexagonHeight2);

    if (hexagonHeight2 < hexagonHeight) {
        hexagonWidth = hexagonWidth2;
        hexagonHeight = hexagonHeight2;
    }

    var smallRow = false; //small rows have 5 hexagons, large rows have 6
    var numRows = 3;
    var largeRowSize = 6;
    var allHexagonsWidth = hexagonWidth * 6
    var columnOffset = (allHexagonsWidth + 0.01 < windowWidth ? (windowWidth - allHexagonsWidth) / 2.0 : 0);

    for (var row = 0; row < numRows; row++) {
        for (var column = 0; column < (smallRow ? largeRowSize - 1 : largeRowSize); column++) {
            drawHexagon(column * hexagonWidth + (smallRow ? hexagonWidth : 0.5 * hexagonWidth) + columnOffset, 0.75 * row * hexagonHeight + 0.5 * hexagonHeight, hexagonWidth, hexagonHeight);
        }
        smallRow = !smallRow;
    }

    /* ****** */
});


$.getJSON("data/projects.json", function (data) {




});


/**
 * 
 * @param {float} cx center x point of hexagon
 * @param {float} cy center y point of hexagon
 * @param {float} w width of hexagon
 * @param {float} h height of hexagon
 */
function drawHexagon(cx, cy, w, h) {

    var points = "";
    var f = function (x, y) {
        x = Math.round(x);
        y = Math.round(y);

        points += x + "," + y + " ";
    }
    f(cx - w / 2.0, cy - h / 4.0); //top left
    f(cx, cy - h / 2.0); //top
    f(cx + w / 2.0, cy - h / 4.0);//top right
    f(cx + w / 2.0, cy + h / 4.0); // bottom right
    f(cx, cy + h / 2.0);//bottom
    f(cx - w / 2.0, cy + h / 4.0);//bottom left

    var polygon = draw.polygon(points.trim())
        .fill('images/housemyarea.png')
        .stroke({ width: 3 })
        .addClass('hexagon');

    console.log(points);
    polygon.mouseover(function () {
        console.log("mouseover");
    });

}



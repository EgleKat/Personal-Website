var windowWidth = $(window).width();
var windowHeight = $(window).height();
var maxNoHorizontalHexagons = 4;
var maxNoVerticalHexagons = 3;





var draw;
$(document).ready(function () {

    $.getJSON("data/projects.json", function (data) {
        //sort the data by the hexagon number
        data.sort((a, b) => (a.hexagon > b.hexagon) ? 1 : -1);
        console.log(data);



        draw = SVG('drawing').size(windowWidth, windowHeight);





        /* ****** */
        //these hexagons are pointy side up
        var hexagonWidth = windowWidth / 6.0; //middle row has 6 hexagons and fills width
        var hexagonHeight = hexagonWidth / Math.sqrt(3) * 2; // https://www.redblobgames.com/grids/hexagons/

        // or
        var hexagonHeight2 = windowHeight / 2.5;
        var hexagonWidth2 = hexagonHeight2 / 2.0 * Math.sqrt(3);

        if (hexagonHeight2 < hexagonHeight) {
            hexagonWidth = hexagonWidth2;
            hexagonHeight = hexagonHeight2;
        }

        var smallRow = false; //small rows have 5 hexagons, large rows have 6
        var numRows = 3;
        var largeRowSize = 6;
        var allHexagonsWidth = hexagonWidth * largeRowSize;
        var columnOffset = (allHexagonsWidth + 0.01 < windowWidth ? (windowWidth - allHexagonsWidth) / 2.0 : 0);
        var currentHexagon = 0;

        for (var row = 0; row < numRows; row++) {
            for (var column = 0; column < (smallRow ? largeRowSize - 1 : largeRowSize); column++) {
                currentHexagon++;
                var project = data.find(function (obj) {
                    return obj.hexagon === currentHexagon;
                });
                drawHexagon(project, column * hexagonWidth + (smallRow ? hexagonWidth : 0.5 * hexagonWidth) + columnOffset, 0.75 * row * hexagonHeight + 0.5 * hexagonHeight, hexagonWidth, hexagonHeight);
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
    var f = function (x, y) {
        x = Math.round(x);
        y = Math.round(y);


        scaledPoints+= (scale*(x-cx) + cx) + "," + (scale*(y-cy) + cy);

        points += x + "," + y + " ";
    }
    f(cx - w / 2.0, cy - h / 4.0); //top left
    f(cx, cy - h / 2.0); //top
    f(cx + w / 2.0, cy - h / 4.0);//top right
    f(cx + w / 2.0, cy + h / 4.0); // bottom right
    f(cx, cy + h / 2.0);//bottom
    f(cx - w / 2.0, cy + h / 4.0);//bottom left


    var polygon = draw.polygon(points.trim())
        .stroke({ width: 3 });
    ;
    //no project for this hexagon
    if (projectInfo === undefined) {
        polygon
            .fill('white')
    }
    //there is a project for this hexagon 
    else {
        polygon
            //change hexagon image
            .fill("data/" + projectInfo.image);
    }
    polygon.mouseover(function () {

        var animation = polygon.animate(100).scale(1.5);
        console.log("mouseover");
    });

}



var screenWidth = screen.width;
var screenHeight = screen.height;

var draw = SVG('drawing').size(screenWidth, screenHeight);
var polygon = draw.polygon('850,75  958,137.5 958,262.5 850,325 742,262.6 742,137.5').fill('lime').stroke({ width: 1 })
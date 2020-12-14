const width = 25;
const height = 100;
const distance = 300;
const minSpace = 50;
const maxSpace = 600;
const randomArtifactAmount = parseInt(Math.random() * (4 - 2) + 2);
const fullDegrees = 180;
const colorMax = 256;
// Universal variables
const roomDirections = ["up", "left", "right", "down"];
const trapDirections = ["down", "up", "left", "right"];

var needToRedraw = true;
var currentRoom = 0;
var respawnPointX = 0;
var respawnPointY = 0;
var roomColorRed = 0;
var roomColorBlue = 0;
var roomColorGreen = 0;
var previousRoomWall;
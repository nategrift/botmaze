let MAP = [];
const map = document.getElementById('map');

// User sets width of maze
let mapWidth = 45;
let mapHeight = 23;

// Creates counter for generating the map
let mapWidthCounter = mapWidth;
let mapHeightCounter = mapHeight;

// Creates default center
let center = [10, 10];

// MAKES a Blank map with mapWidth and mapHeight
function blankMap() {
   MAP = [];
   while (mapHeightCounter >= 0) {

      MAP[mapHeightCounter] = [];
      while (mapWidthCounter >= 0) {
         MAP[mapHeightCounter].push("=");
         mapWidthCounter -= 1;
      }
      mapHeightCounter -= 1;
      mapWidthCounter = mapWidth;
   }
   mapHeightCounter = mapHeight;
   runMap();
   loadmap();
   updateCrown();
}

// Creates working Path
let ycord = center[0];
let xcord = center[1];
let mapLoadStarted = false;
let lastDirection = Math.floor(Math.random() * 3);
const path = new Set([]);

function placeCrown() {

   const list = [...path.values()];
   const ranNumberInList = Math.floor(Math.random() * list.length);
   crown = list[ranNumberInList];
   MAP[crown[0]][crown[1]] = "@";
}

function updateCrown() {
   const crowndiv = document.getElementById("id-" + crown[0] + "-" + crown[1]);
   crowndiv.classList.add('crown');
}

function explore() {
   let directionValue = Math.floor(Math.random() * 12);
   /* Directions
   * Up = 0
   * Right = 1
   * Down = 2
   * Left = 3
   */

   if (!mapLoadStarted) {
      MAP[ycord][xcord] = " ";
      mapLoadStarted = true;
   } else {

   if (directionValue >= 4) {
      directionValue = lastDirection;
   }
    if (directionValue === 0) { // UP
      if (ycord > 1) {
         ycord -= 1;
         MAP[ycord][xcord] = " ";
         path.add([ycord, xcord]);
         ycord -= 1;
         lastDirection = 0;
      } else {
         ycord += 1;
         MAP[ycord][xcord] = " ";
         path.add([ycord, xcord]);
         ycord += 1;
         lastDirection = 2;
      }
   } else if (directionValue === 1) { // RIGHT
      if (xcord < mapWidth - 1) {
         xcord += 1;
         MAP[ycord][xcord] = " ";
         path.add([ycord, xcord]);
         xcord += 1;
         lastDirection = 1;
      } else {
         xcord -= 1;
         MAP[ycord][xcord] = " ";
         path.add([ycord, xcord]);
         xcord -= 1;
         lastDirection = 3;
      }

   } else if (directionValue === 2) { // DOWN
      if (ycord < mapHeight - 1) {
         ycord += 1;
         MAP[ycord][xcord] = " ";
         path.add([ycord, xcord]);
         ycord += 1;
         lastDirection = 2;
      } else {
         ycord -= 1;
         MAP[ycord][xcord] = " ";
         path.add([ycord, xcord]);
         ycord -= 1;
         lastDirection = 0;
      }
   } else if (directionValue === 3) { // LEFT
      if (xcord > 1) {
         xcord -= 1;
         MAP[ycord][xcord] = " ";
         path.add([ycord, xcord]);
         xcord -= 1;
         lastDirection = 3;
      } else {
         xcord += 1;
         MAP[ycord][xcord] = " ";
         path.add([ycord, xcord]);
         xcord += 1;
         lastDirection = 1;
      }
   }
   MAP[ycord][xcord] = " ";
   }
}


//Run Map Creation
let gameStarted = false;
function startGame() {
   if (!gameStarted) {
      blankMap();
   }
   run();
}

//Loop map Loop
let i = 500;
function runMap() {
   explore();
   if (i >= 0) {
      i -= 1;
      runMap();
   } else {
      placeCrown();
   }
}

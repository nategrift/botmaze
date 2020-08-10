
let currentPos = [center[0], center[0]];
let currentPath = [];
let y = currentPos[0];
let x = currentPos[1];
let gameOn = true;
//const map = document.getElementById('map');


function loadmap() {
   map.innerHTML = '';
   let y = 0;
   let x = 0;
   for (y in MAP) {
      //map.innerHTML += '<tr>';
      for (x in MAP[y]) {
         //map.innerHTML += `<td> ${MAP[x][y]} </td>`;
         if (MAP[y][x] == "=") {
            map.innerHTML += `<div class="wall" id="id-${y}-${x}"><p> </p></div>`;
         } else {
            map.innerHTML += `<div id="id-${y}-${x}"><p>${MAP[y][x]}</p></div>`;}
      }
      //map.innerHTML += '</tr>';
      map.innerHTML += '<br>';
   }
   currentPos = [center[0], center[1]];
   y = center[0];
   x = center[1];
}


function gameWin(msg) {
   win = document.getElementById('winMsg');
   win.classList.add('visible')
   win.textContent = msg;
}


function turn() {

   let yt = y - 1; //top
   let xr = x + 1; //right
   let yb = y + 1; //bottom
   let xl = x - 1; //left
   let isTopBlocked = false;
   let isRightBlocked = false;
   let isBottomBlocked = false;
   let isLeftBlocked = false;


   // CheckWin
   if (MAP[y][x] == "@") {
      gameOn = false;
      gameWin('YOU WIN!');
      return;
   }


   // Set beenTo and currentPath
   let moves = 4;
   // CheckBlocked
   if (yt < 0 || MAP[yt][x] == "=") {
      isTopBlocked = true;
      moves -= 1;
      console.log('Blocked on Top');
   } if (xr >= MAP[0].length ||  MAP[y][xr] == "=") {
      isRightBlocked = true;
      moves -= 1;
      console.log('Blocked on Right');
   } if (yb >= MAP.length  || MAP[yb][x] == "=") {
      isBottomBlocked = true;
      moves -= 1;
      console.log('Blocked on Bottom');
   } if (xl < 0 || MAP[y][xl] == "=") {
      isLeftBlocked = true;
      moves -= 1;
      console.log('Blocked on Left');
   }


   MAP[y][x] = "&#8226;";
   // More
   if (moves >= 2) {
      MAP[y][x] = "&#8226;";
   }

   let didMove = false;

   let newy = y;
   let newx = x;
   if (!isTopBlocked && MAP[yt][x] != "&#9643;" && MAP[yt][x] != "&#8226;") {
      newy = yt;
      console.log('Moved Up');
      didMove = true;

   } else if (!isRightBlocked && MAP[y][xr] != "&#9643;" && MAP[y][xr] != "&#8226;") {
      newx = xr;
      console.log('Moved Right');
      didMove = true;

   } else if (!isBottomBlocked && MAP[yb][x] != "&#9643;" && MAP[yb][x] != "&#8226;") {
      newy = yb;
      console.log('Moved Bottom');
      didMove = true;
   } else if (!isLeftBlocked && MAP[y][xl] != "&#9643;" && MAP[y][xl] != "&#8226;") {
      newx = xl;
      console.log('Moved Left');
      didMove = true;
   }

   if (didMove) {
      currentPath.push([y, x]);
   } else {
      if (currentPath.length == 0) {
         gameOn = false;
         gameWin('No answer, map not possible');
         return;
      }
      let previous = currentPath.pop();
      newy = previous[0];
      newx = previous[1];
      console.log('Moved last');
   }

   const previousDiv = document.getElementById("id-" + y + "-" + x);
   y = newy;
   x = newx;
   if (!gameStarted) {
      y = currentPos[0];
      x = currentPos[1];
   }
   const currentDiv = document.getElementById("id-" + y + "-" + x);

   currentDiv.classList.add('current');
   if (gameStarted) {
      previousDiv.classList.remove('current');
      previousDiv.classList.add('been');
   }

   gameStarted = true;
}

let gameGo = true;

function stop() {
   const loadmap = document.getElementById('loadmap');

   if (gameGo) {
   gameGo = false;
   loadmap.classList.add('btnOn');
   } else {
   gameGo = true;
   loadmap.classList.remove('btnOn');
}
}

// Run the code 
function run() {
   setTimeout(function () {
      turn();
      if (gameOn && gameGo) {
         run();
      }
   }, 40)
}

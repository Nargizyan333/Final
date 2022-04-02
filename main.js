const socket = io();

function setup() {
  // -- Declaring variables (START) --

  const side = 10;
  let weath = "spring";
  let matrix = [];

  // -- Declaring variables (END) --
  // -- Changing weather function (START) --

  socket.on("weather", (data) => {
    weath = data;
  });

  // -- Changing weather function (END)
  // -- Creating and drawing canvas function (START) --

  socket.on("data", (data) => {
    matrix = data.matrix;
    createCanvas(side * matrix.length, side * matrix.length);
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix.length; x++) {
        if (matrix[x][y] == 1) {
          if (weath == "spring") {
            fill("green");
          } else if (weath == "summer") {
            fill("#95a800");
          } else if (weath == "fall") {
            fill("#967900");
          } else {
            fill("white");
          }
        } else if (matrix[x][y] == 2) {
          fill("yellow");
        } else if (matrix[x][y] == 3) {
          fill("red");
        } else if (matrix[x][y] == 4) {
          fill("blue");
        } else if (matrix[x][y] == 5) {
          if (weath != "winter") fill("black");
          else fill("#6b6b6b");
        } else if (matrix[x][y] == 8) {
          fill("#ffad14");
        } else if (matrix[x][y] == 9) {
          fill("#ff5c21");
        } else if (matrix[x][y] == 10) {
          fill("#ffffff");
        } else {
          fill("#393E46");
        }
        rect(x * side, y * side, side, side);
      }
    }
  });
  frameRate(120);
}

// -- Creating and drawing canvas function (END) --
// -- Refreshing info (START) --

const g = document.getElementById("grass");
const ge = document.getElementById("grassEater");
const p = document.getElementById("predator");
const h = document.getElementById("human");
const b = document.getElementById("bomb");

socket.on("data", (data) => {
  g.innerText = data.grassCounter;
  ge.innerText = data.grassEaterCounter;
  p.innerText = data.predatorCounter;
  h.innerText = data.humanCounter;
  b.innerText = data.bombCounter;
});

// -- Refreshing info (END) --

// -- Onclick Functions (START) --

function kill() {
  socket.emit("kill");
}

function addGrass() {
  socket.emit("addGrass");
}

function addGrassEater() {
  socket.emit("addGrassEater");
}

function addPredator() {
  socket.emit("addPredator");
}

function addHuman() {
  socket.emit("addHuman");
}

function addBomb() {
  socket.emit("addBomb");
}

// -- Onclick Functions (END) --

function setup() {
  const socket = io()
  const side = 20

  let matrix = []

  socket.on('data', cons)
  socket.on('data', uptadeData)

  function uptadeData(data) {
    const grass = document.getElementById('grass')
    grass.innerText = data.grassCounter
    const grassEater = document.getElementById('grassEater')
    grassEater.innerText = data.grassEaterCounter
    const predator = document.getElementById('predator')
    predator.innerText = data.predatorCounter
    const human = document.getElementById('human')
    human.innerText = data.humanCounter
    const bomb = document.getElementById('bomb')
    bomb.innerText = data.bombCounter
  }

  function cons(data) {
    matrix = data.matrix
    createCanvas(side * matrix[0].length, side * matrix.length)
    for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[x][y] == 1) {
          fill('green')
        } else if (matrix[x][y] == 2) {
          fill('yellow')
        } else if (matrix[x][y] == 3) {
          fill('red')
        } else if (matrix[x][y] == 4) {
          fill('blue')
        } else if (matrix[x][y] == 5) {
          fill('black')
        } else if (matrix[x][y] == 8) {
          fill('#ffad14')
        } else if (matrix[x][y] == 9) {
          fill('#ff5c21')
        } else if (matrix[x][y] == 10) {
          fill('#ffffff')
        } else {
          fill('#393E46')
        }
        rect(x * side, y * side, side, side)
      }
    }
  }
  frameRate(120)
  background('#000')
}


  const socket = io()

function setup() {
  const side = 20
  let weath = 'spring'

  let matrix = []

  socket.on('data', cons)
  socket.on('data', uptadeData)
  socket.on('weather', (data) => {
    weath = data
  })

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
          if(weath == 'spring') {
            fill('green')
          } else if (weath == 'summer') {
            fill('#856004')
          } else if (weath == 'fall') {
            fill('#ebaa07')
          } else {
            fill('white')
          }
        } else if (matrix[x][y] == 2) {
          fill('yellow')
        } else if (matrix[x][y] == 3) {
          fill('red')
        } else if (matrix[x][y] == 4) {
          fill('blue')
        } else if (matrix[x][y] == 5) {
          if(weath != 'winter')
            fill('black')
          else
            fill('#6b6b6b')
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

function kill() {
  socket.emit('kill')
}
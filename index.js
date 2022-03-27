let Grass = require('./modules/Grass.js')
let GrassEater = require('./modules/GrassEater.js')
let Predator = require('./modules/Predator.js')
let Human = require('./modules/Human.js')
let Bomb = require('./modules/Bomb')
let random = require('./modules/random')

matrix = []
grassArr = []
grassEaterArr = []
predatorArr = []
humanArr = []
bombArr = []
weath = 'spring'

function sendWeather() {
  io.sockets.emit('weather', weath)
}

function weather() {
  if (weath == 'winter') {
    weath = 'spring'
  } else if (weath == 'spring') {
    weath = 'summer'
  } else if (weath == 'summer') {
    weath = 'fall'
  } else if (weath == 'fall') {
    weath = 'winter'
  }
  sendWeather()
}

setInterval(sendWeather, 10)
setInterval(weather, 7500)

function createMatrix(size, grass, grasseater, predator, human, bomb) {
  for (let i = 0; i < size; i++) {
    matrix[i] = []
    for (let j = 0; j < size; j++) {
      matrix[i][j] = 0
    }
  }
  for (let g = 0; g < grass; g++) {
    let randX = Math.floor(Math.random() * matrix[0].length)
    let randY = Math.floor(Math.random() * matrix.length)
    if (matrix[randY][randX] == 0) {
      matrix[randY][randX] = 1
    } else {
      g--
    }
  }
  for (let ge = 0; ge < grasseater; ge++) {
    let randX = Math.floor(Math.random() * matrix[0].length)
    let randY = Math.floor(Math.random() * matrix.length)
    if (matrix[randY][randX] == 0) {
      matrix[randY][randX] = 2
    } else {
      ge--
    }
  }
  for (let p = 0; p < predator; p++) {
    let randX = Math.floor(Math.random() * matrix[0].length)
    let randY = Math.floor(Math.random() * matrix.length)
    if (matrix[randY][randX] == 0) {
      matrix[randY][randX] = 3
    } else {
      p--
    }
  }
  for (let h = 0; h < human; h++) {
    let randX = Math.floor(Math.random() * matrix[0].length)
    let randY = Math.floor(Math.random() * matrix.length)
    if (matrix[randY][randX] == 0) {
      matrix[randY][randX] = 4
    } else {
      h--
    }
  }
  for (let b = 0; b < bomb; b++) {
    let randX = Math.floor(Math.random() * matrix[0].length)
    let randY = Math.floor(Math.random() * matrix.length)
    if (
      matrix[randY][randX] == 0 &&
      randX - 4 > 0 &&
      randX + 4 < matrix.length &&
      randY - 4 > 0 &&
      randY + 4 < matrix.length
    ) {
      matrix[randY][randX] = 5
    } else {
      b--
    }
  }
}
createMatrix(50, 2000, 10, 2, 5, 10)

const express = require('express')
const app = express()
const http = require('http')
const server = http.Server(app)
const io = require('socket.io')(server)
const fs = require('fs')

app.use(express.static('.'))

app.get('/', (req, res) => {
  res.redirect('index.html')
})

io.on('connection', function (socket) {
  // socket.on('hi', console.log(hi))
})

server.listen(3000)

function createObjs() {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        let grass = new Grass(x, y)
        grassArr.push(grass)
      } else if (matrix[y][x] == 2) {
        let grassEater = new GrassEater(x, y)
        grassEaterArr.push(grassEater)
      } else if (matrix[y][x] == 3) {
        let predator = new Predator(x, y)
        predatorArr.push(predator)
      } else if (matrix[y][x] == 4) {
        let human = new Human(x, y)
        humanArr.push(human)
      } else if (matrix[y][x] == 5) {
        let bomb = new Bomb(x, y)
        bombArr.push(bomb)
      }
    }
  }
}

createObjs()

function game() {
  if (grassArr[0] !== undefined) {
    if (weath != 'winter') {
      for (let i in grassArr) {
        grassArr[i].mul()
      }
    }
  }
  if (grassEaterArr[0] !== undefined) {
    for (let i in grassEaterArr) {
      grassEaterArr[i].chooseOption()
    }
  }
  if (predatorArr[0] !== undefined) {
    for (let i in predatorArr) {
      predatorArr[i].chooseOption()
    }
  }
  if (humanArr[0] !== undefined) {
    for (let i in humanArr) {
      humanArr[i].chooseOption()
    }
  }
  if (bombArr[0] !== undefined) {
    for (let i in bombArr) {
      bombArr[i].boom()
    }
  }
  let sendData = {
    matrix: matrix,
    grassCounter: grassArr.length,
    grassEaterCounter: grassEaterArr.length,
    predatorCounter: predatorArr.length,
    humanCounter: humanArr.length,
    bombCounter: bombArr.length,
  }
  io.sockets.emit('data', sendData)
}

setInterval(game, 250)

const statistics = {}

function getStatistics() {
  statistics.grass = grassArr.length
  statistics.grassEater = grassEaterArr.length
  statistics.predator = predatorArr.length
  statistics.human = humanArr.length
  statistics.bomb = bombArr.length
}

setInterval(() => {
  getStatistics()
  fs.writeFile('statistics.json', JSON.stringify(statistics), function () {})
}, 1000)

io.on('connection', function (socket) {
  socket.on('kill', () => {
    grassArr = []
    grassEaterArr = []
    predatorArr = []
    humanArr = []
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[0].length; x++) {
        if (matrix[y][x] != 5) {
          matrix[y][x] = 0
        }
      }
    }
  })
  socket.on('addGrass', () => {
    for (let i = 0; i < 5; i++) {
      let nx = Math.round(Math.random() * matrix[0].length)
      let ny = Math.round(Math.random() * matrix.length)
      if (nx == 50) nx -= 1
      if (ny == 50) ny -= 1
      if (matrix[ny][nx] == 0) {
        matrix[ny][nx] = 1
        let grass = new Grass(nx, ny)
        grassArr.push(grass)
      } else {
        i--
      }
      if (i == 4) console.log('added g')
    }
  })
  socket.on('addGrassEater', () => {
    for (let i = 0; i < 5; i++) {
      let nx = Math.round(Math.random() * matrix[0].length)
      let ny = Math.round(Math.random() * matrix.length)
      if (nx == 50) nx -= 1
      if (ny == 50) ny -= 1
      if (matrix[ny][nx] == 0) {
        matrix[ny][nx] = 2
        let grassEater = new GrassEater(nx, ny)
        grassEaterArr.push(grassEater)
      } else {
        i--
      }
      if (i == 4) console.log('added ge')
    }
  })
  socket.on('addPredator', () => {
    for (let i = 0; i < 5; i++) {
      let nx = Math.round(Math.random() * matrix[0].length)
      let ny = Math.round(Math.random() * matrix.length)
      if (nx == 50) nx -= 1
      if (ny == 50) ny -= 1
      if (matrix[ny][nx] == 0) {
        matrix[ny][nx] = 3
        let predator = new Predator(nx, ny)
        predatorArr.push(predator)
      } else {
        i--
      }
      if (i == 4) console.log('added p')
    }
  })
  socket.on('addHuman', () => {
    for (let i = 0; i < 5; i++) {
      let nx = Math.round(Math.random() * matrix[0].length)
      let ny = Math.round(Math.random() * matrix.length)
      if (nx == 50) nx -= 1
      if (ny == 50) ny -= 1
      if (matrix[ny][nx] == 0) {
        matrix[ny][nx] = 4
        let human = new Human(nx, ny)
        humanArr.push(human)
      } else {
        i--
      }
      if (i == 4) console.log('added h')
    }
  })
  socket.on('addBomb', () => {
    for (let i = 0; i < 5; i++) {
      let nx = Math.round(Math.random() * matrix[0].length)
      let ny = Math.round(Math.random() * matrix.length)
      if (nx > 46) nx -= 4
      if (nx < 4) nx += 4
      if (ny > 46) ny -= 4
      if (ny < 4) ny += 4
      if (matrix[ny][nx] == 0) {
        matrix[ny][nx] = 5
        let bomb = new Bomb(nx, ny)
        bombArr.push(bomb)
      } else {
        i--
      }
      if (i == 4) console.log('added b')
    }
  })
})

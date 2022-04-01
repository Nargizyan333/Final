const LivingCreature = require('./LivingCreature')
const random = require('./random')

module.exports = class GrassEater extends LivingCreature {
  constructor(x, y) {
    super(x, y)
    this.en = 15
  }

  getNewCord() {
    this.dir = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
    ]
  }

  chooseCell(c) {
    this.getNewCord()
    return super.chooseCell(c)
  }

  eat() {
    let nc = random(this.chooseCell(1))
    let ncp = random(this.chooseCell(6))
    if (nc && ncp) {
      let rand = Math.round(Math.random())
      if (rand == 0) {
        let x = ncp[0]
        let y = ncp[1]
        matrix[this.y][this.x] = 0
        this.die()
        for (let i in grassArr) {
          if (pGrassArr[i].x == x && pGrassArr[i].y == y) {
            pGrassArr.splice(i, 1)
            break
          }
        }
      } else {
        this.en++
        let x = nc[0]
        let y = nc[1]
        matrix[this.y][this.x] = 0
        matrix[y][x] = 2
        this.x = x
        this.y = y
        for (let i in grassArr) {
          if (grassArr[i].x == x && grassArr[i].y == y) {
            grassArr.splice(i, 1)
            break
          }
        }
      }
    } else if (nc || ncp) {
      if (nc) {
        this.en++
        let x = nc[0]
        let y = nc[1]
        matrix[this.y][this.x] = 0
        matrix[y][x] = 2
        this.x = x
        this.y = y
        for (let i in grassArr) {
          if (grassArr[i].x == x && grassArr[i].y == y) {
            grassArr.splice(i, 1)
            break
          }
        }
      } else {
        let x = ncp[0]
        let y = ncp[1]
        matrix[this.y][this.x] = 0
        this.die()
        for (let i in grassArr) {
          if (pGrassArr[i].x == x && pGrassArr[i].y == y) {
            pGrassArr.splice(i, 1)
            break
          }
        }
      }
    } else {
      this.move()
    }
  }

  move() {
    let nc = random(this.chooseCell(0))
    if (nc) {
      let x = nc[0]
      let y = nc[1]
      matrix[this.y][this.x] = 0
      matrix[y][x] = 2
      this.x = x
      this.y = y
    }
    this.en--
  }

  mul() {
    let nc = random(this.chooseCell(0))
    if (nc) {
      let x = nc[0]
      let y = nc[1]
      grassEaterArr.push(new GrassEater(x, y))
      matrix[y][x] = 2
      this.en = 9
    } else {
      this.eat()
    }
  }

  die() {
    for (let i in grassEaterArr) {
      if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
        grassEaterArr.splice(i, 1)
        break
      }
    }
    matrix[this.y][this.x] = 0
  }

  chooseOption() {
    if (this.en < 0) {
      this.die()
    } else {
      if (
        (this.en > 40 && weath == 'winter') ||
        (this.en > 25 && weath != 'winter')
      ) {
        this.mul()
      } else {
        this.eat()
      }
    }
  }
}

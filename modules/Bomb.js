const LivingCreature = require('./LivingCreature')

module.exports = class Bomb extends LivingCreature {
  constructor(x, y, t) {
    super(x, y)
    this.t = t
    this.dir = [
      [x - 2, y - 2],
      [x - 1, y - 2],
      [x, y - 2],
      [x + 1, y - 2],
      [x + 2, y - 2],
      [x - 2, y - 1],
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x + 2, y - 1],
      [x - 2, y],
      [x - 1, y],
      [x + 1, y],
      [x + 2, y],
      [x - 2, y + 1],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
      [x + 2, y + 1],
      [x - 2, y + 2],
      [x - 1, y + 2],
      [x, y + 2],
      [x + 1, y + 2],
      [x + 2, y + 2],
      [x - 1, y - 3],
      [x, y - 3],
      [x + 1, y - 3],
      [x + 3, y - 1],
      [x + 3, y],
      [x + 3, y + 1],
      [x - 1, y + 3],
      [x, y + 3],
      [x + 1, y + 3],
      [x - 3, y - 1],
      [x - 3, y],
      [x - 3, y + 1],
    ]
  }

  boom() {
    this.t++
    if (this.t == 8) {
      let a = 0
      while (a < this.dir.length) {
        let x = this.dir[a][0]
        let y = this.dir[a][1]
        if (matrix[y][x] == 1) {
          for (let i in grassArr) {
            if (x == grassArr[i].x && y == grassArr[i].y) {
              grassArr.splice(i, 1)
              break
            }
          }
        } else if (matrix[y][x] == 2) {
          for (let i in grassEaterArr) {
            if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
              grassEaterArr.splice(i, 1)
              break
            }
          }
        } else if (matrix[y][x] == 3) {
          for (let i in predatorArr) {
            if (x == predatorArr[i].x && y == predatorArr[i].y) {
              predatorArr.splice(i, 1)
              break
            }
          }
        } else if (matrix[y][x] == 4) {
          for (let i in humanArr) {
            if (x == humanArr[i].x && y == humanArr[i].y) {
              humanArr.splice(i, 1)
              break
            }
          }
        }
        if (matrix[y][x] != 5) {
          matrix[y][x] = 8
        } else {
          matrix[y][x] = 5
        }
        a++
      }
    }
    if (this.t == 9) {
      let a = 0
      while (a < this.dir.length) {
        let x = this.dir[a][0]
        let y = this.dir[a][1]
        if (matrix[y][x] != 5) {
          matrix[y][x] = 9
        } else {
          matrix[y][x] = 5
        }
        a++
      }
    }
    if (this.t == 10) {
      let a = 0
      while (a < this.dir.length) {
        let x = this.dir[a][0]
        let y = this.dir[a][1]
        if (matrix[y][x] != 5) {
          matrix[y][x] = 0
        } else {
          matrix[y][x] = 5
        }
        a++
      }
      this.t = 0
    }
  }
}

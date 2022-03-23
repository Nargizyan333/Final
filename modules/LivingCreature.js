module.exports = class LivingCreature {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.mult = 0
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
    let found = []
    for (let i in this.dir) {
      const x = this.dir[i][0]
      const y = this.dir[i][1]
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == c) {
          found.push(this.dir[i])
        }
      }
    }
    return found
  }
}

const LivingCreature = require('./LivingCreature')
const random = require('./random')

module.exports = class Grass extends LivingCreature {
  mul() {
    let nc = random(this.chooseCell(0))
    if (this.mult > 6 && nc) {
      let x = nc[0]
      let y = nc[1]
      grassArr.push(new Grass(x, y))
      matrix[y][x] = 1
      this.mult = 0
    }
    this.mult++
  }
}

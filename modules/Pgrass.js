const LivingCreature = require("./LivingCreature");
const random = require("./random");

module.exports = class Pgrass extends LivingCreature {
  mul() {
    let nc = random(this.chooseCell(0));
    if (this.mult > 10 && nc) {
      let x = nc[0];
      let y = nc[1];
      pGrassArr.push(new Pgrass(x, y));
      matrix[y][x] = 6;
      this.mult = 0;
    }
    this.mult++;
  }
};

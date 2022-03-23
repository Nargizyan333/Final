const LivingCreature = require('./LivingCreature')
const random = require("./random");

module.exports = class Predator extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.en = 20;
    this.dmove = 1;
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
    ];
  }

  chooseCell(c) {
    this.getNewCord();
    return super.chooseCell(c);
  }

  eat() {
    let nc = random(this.chooseCell(2));
    if (nc) {
      this.en += 3;
      x = nc[0];
      y = nc[1];
      matrix[this.y][this.x] = 0;
      matrix[y][x] = 3;
      this.x = x;
      this.y = y;
      for (let i in grassEaterArr) {
        if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }
      if (this.en > 15) {
        this.mul();
      }
    } else {
      this.move();
    }
  }

  move() {
    let nc = random(this.chooseCell(0));
    if (nc) {
      x = nc[0];
      y = nc[1];
      matrix[this.y][this.x] = 0;
      matrix[y][x] = 3;
      this.x = x;
      this.y = y;
    } else {
      this.dmove++;
      if (this.dmove > 2) {
        this.dmove = 1;
        let ch1 = random(this.chooseCell(1));
        let x = ch1[0];
        let y = ch1[1];
        matrix[this.y][this.x] = 0;
        matrix[y][x] = 3;
        this.x = x;
        this.y = y;
        for (let i in grassArr) {
          if (x == grassArr[i].x && y == grassArr[i].y) {
            grassArr.splice(i, 1);
            break;
          }
        }
      }
    }
    this.en--;
  }

  mul() {
    let nc = random(this.chooseCell(0));
    if (nc) {
      x = nc[0];
      y = nc[1];
      predatorArr.push(new Predator(x, y));
      matrix[y][x] = 3;
      this.en = 10;
    } else {
      this.eat();
    }
  }

  die() {
    for (let i in predatorArr) {
      if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
        predatorArr.splice(i, 1);
        break;
      }
    }
    matrix[this.y][this.x] = 0;
  }

  chooseOption() {
    if (this.en < 0) {
      this.die();
    } else {
      if (this.en > 25) {
        this.mul();
      } else {
        this.eat();
      }
    }
  }
}

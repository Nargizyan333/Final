class Human extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.en = 95;
    this.age = 0;
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
    let ch2 = random(this.chooseCell(2));
    let ch3 = random(this.chooseCell(3));
    if (ch2 || ch3) {
      if (ch3) {
        this.en += 10;
        let x = ch3[0];
        let y = ch3[1];
        matrix[this.y][this.x] = 0;
        matrix[y][x] = 4;
        this.x = x;
        this.y = y;
        for (let i in predatorArr) {
          if (x == predatorArr[i].x && y == predatorArr[i].y) {
            predatorArr.splice(i, 1);
            break;
          }
        }
      } else {
        this.en += 5;
        let x = ch2[0];
        let y = ch2[1];
        matrix[this.y][this.x] = 0;
        matrix[y][x] = 4;
        this.x = x;
        this.y = y;
        for (let i in grassEaterArr) {
          if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
            grassEaterArr.splice(i, 1);
            break;
          }
        }
      }
    } else {
      this.move();
    }
  }

  move() {
    this.en -= 2;
    let ch0 = random(this.chooseCell(0));
    let ch1 = random(this.chooseCell(1));
    if (ch0 || ch1) {
      if (ch0) {
        let x = ch0[0];
        let y = ch0[1];
        matrix[this.y][this.x] = 0;
        matrix[y][x] = 4;
        this.x = x;
        this.y = y;
      } else {
        let x = ch1[0];
        let y = ch1[1];
        matrix[this.y][this.x] = 0;
        matrix[y][x] = 4;
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
  }

  mul() {
    let ch = random(this.chooseCell(0));
    if (ch) {
      let x = ch[0];
      let y = ch[1];
      matrix[y][x] = 4;
      humanArr.push(new Human(x, y));
      this.en = 80;
    } else {
      this.move();
    }
  }

  die() {
    for (let i in humanArr) {
      if (this.x == humanArr[i].x && this.y == humanArr[i].y) {
        humanArr.splice(i, 1);
        break;
      }
    }
    matrix[this.y][this.x] = 0;
  }

  chooseOption() {
    this.age += 0.5;
    if (this.en < 0 || this.age > 75) {
      this.die();
    } else {
      if (this.en > 125) {
        this.mul();
      } else {
        this.eat();
      }
    }
  }
}

import Utils from "../../components/utils";
import Keep from "./keep";

export default class Bailey {
  // a bailey has a gatehouse and walls.
  constructor(params = {}) {
    this.age = params.age || this.getAge();
    this.size = params.size || this.getSize();

    console.log(this.size);

    this.towers = this.getTowers();
    this.walls = this.getWalls();
    this.gateHouse = this.getGateHouse();

    if (!params.inner) {
      // Castle bailies have an inner bailey with a keep. Since a keep is a type of bailey, we need to set the inner parameter to true, otherwise an infinite loop occurs.

      this.keep = new Keep({
        age: this.age,
        size: this.size,
        inner: true,
      });
    }
  }

  getAge() {
    return Utils.randomInt(40, 400);
  }

  getMaterial() {
    // function all for each part of a castle. based on the age of the castle, each part has a chance to be made of stone or wood. 60% of all castles were made out of wood! Building a castle is EXTREMELY expensive and stone only exacerbated that cost.
    // Building materials for a castle less than 10 years old is always wood, anything over 250 is always stone.

    const { age } = this;
    const chance = 0.42 * age - 4.17;
    return Utils.randomInt(1, 100) <= chance ? "stone" : "wood";
  }

  getSize() {
    const num = Utils.randomInt(1, 5);
    const descriptions = ["tiny", "small", "average", "large", "huge"];

    return {
      sizeValue: num,
      sizeDescription: descriptions[num - 1],
    };
  }

  getTowers() {
    const { size } = this;
    const storyHeight = 3.5;

    const material = this.getMaterial();
    let count = Utils.randomInt(-4, 4) + size * 2;
    if (count < 0) count = 0;

    let height;
    // height is in meters. random number is the number of stories multiplied by 3.5 meters per story.
    if (material === "stone") {
      // stone towers are a story taller than their wooden counterpart.
      height = Utils.randomInt(3, 5) * storyHeight;
    } else {
      height = Utils.randomInt(2, 4) * storyHeight;
    }

    return {
      material: material,
      count: count,
      height: height,
    };
  }

  getWalls() {
    // const {
    //   size: { sizeValue },
    // } = this;
    const storyHeight = 3.5;

    let { height } = this.towers;
    // for the height of a wall, we sub
    height = height - storyHeight / 2;

    return {
      material: this.getMaterial(),
      height: height,
    };
  }

  getGateHouse() {
    // const {
    //   size: { sizeValue },
    // } = this;
    const storyHeight = 3.5;
    let { height } = this.walls;

    height = height + storyHeight;

    return {
      height: height,
    };
  }
}

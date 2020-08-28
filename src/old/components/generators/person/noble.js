import Utils from "components/utils";
import Person from "components/generators/person/person";
import nobleHouses from "data/names/nobleHouses";

export default class Noble extends Person {
  constructor(options = {}) {
    super({ ...options });

    if (!this.name.surname && !this.name.clanName) {
      const nobleHouse = this.getNobleHouse(this.race);

      this.name.house = nobleHouse;
      this.name.displayName = `${this.name.name} ${this.name.house}`;
    }
  }

  getNobleHouse(race) {
    const houses = [...nobleHouses.nobleHouses];
    let generationStyle = ["random", "list"];
    generationStyle = generationStyle[Utils.randomArrayIndex(generationStyle.length)];

    if (generationStyle === "list") {
      return houses[Utils.randomArrayIndex(houses.length)];
    } else {
      const part1 = nobleHouses.rand1[Utils.randomArrayIndex(nobleHouses.rand1)];
      const part2 = nobleHouses.rand2[Utils.randomArrayIndex(nobleHouses.rand2)];

      return part1 + part2;
    }
  }
}

import Utils from "../../components/utils";
import Person from "./person";
import nobleHouses from "../../data/names/nobleHouses";
import Names from "../../data/names/allNames";

export default class Noble extends Person {
  constructor(options = {}) {
    super({ ...options });

    if (!this.name.surname && !this.name.clanName) {
      const nobleHouse = this.getNobleHouse(this.race);
      const { culture } = this;

      this.name.house = nobleHouse;

      if (culture === "chinese" || culture === "japanese" || culture === "korean") {
        this.name.displayName = `${this.name.house} ${this.name.name}`;
      } else {
        this.name.displayName = `${this.name.name} ${this.name.house}`;
      }
    }
  }

  getNobleHouse(race) {
    const houses = [...nobleHouses.nobleHouses];
    const { culture, sex } = this;
    const {
      human: {
        last,
        last: { def },
      },
    } = Names;

    if (culture && last[culture]) {
      const group = last[culture];

      // Greek names have a suffix, so check for suffixes or prefixes
      if (last[`${culture}-suffix`]) {
        const suffix = last[`${culture}-suffix`];
        return group[Utils.randomArrayIndex(group)].concat(suffix[Utils.randomArrayIndex(suffix)]);
      } else {
        return group[Utils.randomArrayIndex(group)];
      }
    } else if (culture && last[`${culture}-${sex}`]) {
      const group = last[`${culture}-${sex}`];
      return group[Utils.randomArrayIndex(group)];
    } else {
      const part1 = nobleHouses.rand1[Utils.randomArrayIndex(nobleHouses.rand1)];
      const part2 = nobleHouses.rand2[Utils.randomArrayIndex(nobleHouses.rand2)];

      return part1 + part2;
    }
  }
}

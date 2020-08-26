import Utils from "../../utils";
import Person from "./person";
import nobleHouses from "../../../data/names/nobleHouses";
import Names from "../../../data/names/allNames";

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
        return group[Utils.randomArrayIndex(group.length)].concat(
          suffix[Utils.randomArrayIndex(suffix.length)]
        );
      } else {
        return group[Utils.randomArrayIndex(group.length)];
      }
    } else if (culture && last[`${culture}-${sex}`]) {
      const group = last[`${culture}-${sex}`];
      return group[Utils.randomArrayIndex(group.length)];
    } else {
      const part1 = nobleHouses.rand1[Utils.randomArrayIndex(nobleHouses.rand1.length)];
      const part2 = nobleHouses.rand2[Utils.randomArrayIndex(nobleHouses.rand2.length)];

      return part1 + part2;
    }
  }
}

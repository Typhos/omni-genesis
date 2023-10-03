import { Hireling } from "../hirelings/generateMooks";
import Person from "../person/person";
import Utils from "../../components/utils";
import taverns from "../../data/taverns/bar-patrons.json";

export default class TavernPatrons {
  constructor(params) {
    const { timeOfDay, tavernName } = params;
    this.patrons = this.getPatronsFromData(params);
    this.timeOfDay = timeOfDay;
    this.tavernName = tavernName;
  }

  getPatronsFromData(params) {
    const { tavernName, timeOfDay } = params;
    const patronData = taverns[tavernName];
    const patronList = [];
    let totalPatrons = 0;

    for (let [name, info] of Object.entries(patronData)) {
      let number = undefined;
      let persons = undefined;
      const { random, odds, levelRange, race, count } = info;
      const percentileRoll = Utils.rollDice(1, 100);
      const times = ["Morning", "Afternoon", "Evening"];
      const currentTime = times.indexOf(timeOfDay);
      const chanceOfPatronage = odds[currentTime];

      if (!!random) {
        const { count, sides, bonus } = random;
        number = Utils.rollDice(count, sides, bonus);
        persons = new Array(number).fill("");
        persons = persons.map((_) => {
          if (levelRange) {
            return new Hireling(1);
          } else if (race && race !== "human") {
            return new Person({ race });
          } else {
            const europeanFantasyCultures = [
              "english",
              "french",
              "germanic",
              "celtic",
              "nordic"
              // "roman",
              // "slavic",
              // "spanish",
              // "greek",
              // "polish",
              // "italian",
            ];
            return new Person({
              race: "human",
              culture: europeanFantasyCultures[Utils.randomArrayIndex(europeanFantasyCultures)]
            });
          }
        });
      }

      if (percentileRoll <= chanceOfPatronage) {
        patronList.push({ name, number, persons });

        if (!!count) {
          totalPatrons += count;
        } else if (!!number) {
          totalPatrons += number;
        } else {
          totalPatrons += 1;
        }
      }
    }

    return { patronList, totalPatrons };
  }
}

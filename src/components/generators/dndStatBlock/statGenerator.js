// Common Components
import Utils from "../../utils";

// Data
import openSourceRaceData from "../../../data/races/5eToolsRaces";

export default class Stats {

  constructor(raceStr, subRaceObj) {

    const racialModsObj = this.getStatMods(raceStr, subRaceObj);
    
    this.statsObj = this.rollStats(racialModsObj);
  }

  getStatMods(raceStr, subRaceObj) {
    let raceMods = {};
    let raceObj = openSourceRaceData.race.filter( r => r.name.toLowerCase() === raceStr && r.source === "PHB")[0];

    for ( let [key, val] of Object.entries(raceObj.ability[0]) ) {
      if (key === "choose") {
        let count = raceObj.ability[0][key].count;
        let options = Utils.shuffleArray(raceObj.ability[0][key].from);

        for (let i = 0; i < count; i++) {
          raceMods[options[i]] = 1;
        }
      } else {
        raceMods[key] = val;
      }
    }
    
    if ( subRaceObj && subRaceObj.ability ) {
      for ( let [key, val] of Object.entries(subRaceObj.ability[0]) ) {
        raceMods[key] = val;
      }
    }

    return raceMods;
  }

  rollStats(racialModsObj) {
    const statsObj = { "str": 10, "dex": 10, "con": 10, "int": 10, "wis": 10, "cha": 10 };
    const modifiersObj = {"str": "+0", "dex": "+0", "con": "+0", "int": "+0", "wis": "+0", "cha": "+0" };

    // roll each stat

    for ( const [key] of Object.entries(statsObj) ) {
      let rolls = new Array(3).fill(undefined);

      // roll 4d6, sort from low to high, remove the lowest and sum the total
      rolls = rolls.map( num => {
        return Utils.randomInt(1,6);
      }).sort().reduce( (a,b) => a+b, 0);

      // avoid comically low scores
      // if ( rolls <= 7 ) rolls = 7;

      // add in racial mods
      statsObj[key] = rolls + ( racialModsObj[key] || 0);

      const mod = this.getMod(statsObj[key]);
      modifiersObj[key] = (mod >= 0) ? `+${mod}` : mod.toString();
    }

    return {
      "scores": statsObj,
      "mods": modifiersObj
    }

  }

  getMod(num) {
    return Math.round( (10.5 - num ) * -1 / 2 );
  }
  
}
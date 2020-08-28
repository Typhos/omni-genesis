// components
import Utils from "components/utils";

//data
import crData from "data/mechanics/monsterCR";
import openSourceRaceData from "data/races/5eToolsRaces";
import Languages from "data/languages/all";

import StatGenerator from "components/generators/dndStatBlock/statGenerator";

export default class StatBlock {
  constructor(race, subRace, cr) {
    this.raceDataObj = openSourceRaceData.race.filter(
      (tR) => tR.name.toLowerCase() === race && tR.source === "PHB"
    )[0];

    if (!cr) {
      // no CR provided? set the CR between 1/8 and 4.
      this.defensiveCR = crData.cr[Utils.randomArrayIndex(7)]._cr;
      this.offensiveCR = this.defensiveCR;
      this.targetCR = this.defensiveCR;
    } else if (cr) {
      this.defensiveCR = cr;
      this.offensiveCR = cr;
      this.targetCR = cr;
    }

    // If no CR is provided, pick a random CR between 1/8 (index 0) and 5 (index 7).
    this.cr = !cr ? crData.cr[Utils.randomArrayIndex(7)]._cr : cr;

    const crArray = this.getCrIndexArray(this.cr);
    const offense = this.getOffStats(crArray[0]);
    const defense = this.getDefStats(crArray[1]);

    this.ac = defense.ac;
    this.hp = defense.hp;
    this.attackBonus = offense.attackBonus;
    this.dpr = offense.dpr;

    // Set Core Stats first, since CON is needed for HP.
    this.coreStats = new StatGenerator(race, subRace).statsObj;

    // Set CR based on HP and DPR
    // this.setCR();

    this.speed = this.getSpeed(race);
    this.size = this.getSize(race);

    // Set HP (Hit Points) and DPR (Damage Per Round) first.
    // They are the baseline from which the CR is modified by AC & AtkBonus.
    // Get HP to start calculations off of, then fix it with Math based on CON score & size.
    const hdFormula = this.getHitDice(this.hp, race, this.coreStats.scores);

    this.hitDice = hdFormula.math;
    this.hp = hdFormula.hp;

    this.perception = this.getSenses(race);
    this.languages = this.getLanguages(race);
    this.atkDmg = this.getAtkDmg();
    this.pb = this.getPB();

    new StatGenerator(race, subRace);
    delete this.raceDataObj;
  }

  getCrIndexArray(cr) {
    let arr = [];

    for (let val of Object.values(this.splitCr(cr))) {
      arr.push(val);
    }

    return arr;
  }

  getDefStats(dCr) {
    // console.group("defensive stats");

    const acObj = getAC();
    const hp = getHP(acObj.crChange);

    // console.log(`AC = ${acObj.ac}, CR change = ${acObj.crChange}`);
    // console.log(`hp = ${hp}`);

    function getAC() {
      const baseAC = crData.cr[dCr].ac;

      // console.log(`base AC = ${baseAC}`);

      const acMod = Utils.randomInt(-4, 4);

      return {
        ac: baseAC + acMod,
        crChange: Math.floor(acMod / 2),
      };
    }

    function getHP(crChange) {
      const nCr = dCr - crChange < 0 ? 0 : dCr - crChange;
      const stats = crData.cr[nCr];

      // console.log(`hp index after shift = ${nCr}`);
      // console.log(`hp range = ${stats.hpmin} to ${stats.hpmax}`);

      return Utils.randomInt(stats.hpmin, stats.hpmax);
    }

    // console.groupEnd();
    return {
      ac: acObj.ac,
      hp: hp,
    };
  }

  getOffStats(oCr) {
    // console.group("offensive stats");

    const atkBonusObj = getAtkBonus();
    const dpr = getDpr(atkBonusObj.crChange);

    // console.log(`Atk Bonus = ${atkBonusObj.atk}, CR change = ${atkBonusObj.crChange}`);
    // console.log(`dpr = ${dpr}`);

    function getAtkBonus() {
      const atkBonus = crData.cr[oCr].attackbonus;
      // console.log(`base attackbonus = ${atkBonus}`);

      const atkMod = Utils.randomInt(-4, 4);

      return {
        atk: atkBonus + atkMod,
        crChange: Math.floor(atkMod / 2),
      };
    }

    function getDpr(crChange) {
      const nCr = oCr - crChange < 0 ? 0 : oCr - crChange;
      const stats = crData.cr[nCr];

      // console.log(`dpr index after shift = ${nCr}`);
      // console.log(`dpr range = ${stats.dprmin} to ${stats.dprmax}`);

      return Utils.randomInt(stats.dprmin, stats.dprmax);
    }

    // console.groupEnd();
    return {
      attackBonus: atkBonusObj.atk,
      dpr: dpr,
    };
  }

  setCR(shiftCR, shiftType) {
    let oCR = this.offensiveCR.toString();
    let dCR = this.defensiveCR.toString();

    const CRArray = crData.cr.map((entry) => {
      return entry._cr;
    });

    // if no CR has been established, do it now
    if (!this.cr) {
      // check for fractions & do the math without Eval()
      if (oCR.split("/")[1])
        oCR = parseInt(oCR.split("/")[0], 10) / parseInt(oCR.split("/")[1], 10);
      if (dCR.split("/")[1])
        dCR = parseInt(dCR.split("/")[0], 10) / parseInt(dCR.split("/")[1], 10);

      let cr = ((parseFloat(oCR) + parseFloat(dCR)) / 2).toString();

      if ("0.5625" === cr) cr = "1/2";
      if ("0.5" === cr) cr = "1/2";
      if ("0.375" === cr) cr = "1/4";
      if ("0.3125" === cr) cr = "1/4";
      if ("0.25" === cr) cr = "1/4";
      if ("0.1875" === cr) cr = "1/8";
      if ("0.125" === cr) cr = "1/8";
      if ("0.0625" === cr) cr = "1/8";
      if (-1 !== cr.indexOf(".")) cr = Math.round(cr).toString();

      this.cr = cr;
    }

    // if there is a value to shift the CR of the person, do so here
    if (shiftCR) {
      let shiftIndex = CRArray.indexOf(this.cr) + shiftCR;

      if (shiftIndex < 0) {
        this.cr = "1/8";
      } else if (shiftIndex > 30) {
        this.cr = "30";
      } else {
        this.cr = CRArray[shiftIndex];
      }

      if (shiftType === "offensive") {
        // console.log(shiftCR)
        this.offensiveCR = CRArray[CRArray.indexOf(this.cr) + shiftCR];
      } else if (shiftType === "defensive") {
        // console.log(shiftCR)
        this.defensiveCR = CRArray[CRArray.indexOf(this.cr) + shiftCR];
      }
    }
  }

  getMod(num) {
    return Math.round(((10.5 - num) * -1) / 2);
  }

  getSpeed(race) {
    return this.raceDataObj.speed;
  }

  getSize(race) {
    switch (this.raceDataObj.size) {
      case "Tiny":
        return "Tiny";
      case "S":
        return "Small";
      case "L":
        return "Large";
      default:
        return "Medium";
    }
  }

  getPB() {
    return crData.cr.find((index) => index._cr === this.cr).pb;
  }

  getHitDice(hp, size, stats) {
    // Example: HP: 75 w/ CON 16(+3) => 10d8+30

    const hd = (function (size) {
      switch (size) {
        case "tiny":
          return 4;
        case "small":
          return 6;
        case "large":
          return 10;
        case "huge":
          return 12;
        case "gargantuan":
          return 20;
        default:
          return 8;
      }
    })(size);

    let conMod = this.getMod(stats.con);
    let modStr = conMod >= 0 ? "+" : "-";

    const num = Math.round(hp / ((hd + 1) / 2 + conMod));
    const hitDiceTotal = Math.round(num * ((hd + 1) / 2));
    const bonus = num * conMod;

    return {
      hp: hitDiceTotal + bonus,
      math: `${num}d${hd}${modStr}${Math.abs(bonus)}`,
    };
  }

  getSenses(race) {
    const pp = 10 + this.getMod(this.coreStats.scores.wis);

    return {
      passive: pp,
      senses: {
        darkvision: this.raceDataObj.darkvision || undefined,
      },
    };
  }

  getLanguages(race) {
    const raceData = this.raceDataObj;
    const languageProficiencies = raceData.languageProficiencies[0];

    const standardLanguages = Languages.language.filter(
      (lang) => lang.source === "PHB" && lang.type !== "secret"
    );

    const extraLangOptions = standardLanguages.filter((lang) => {
      for (let [key] of Object.entries(languageProficiencies)) {
        if (key === lang.name.toLowerCase()) return false;
      }
      return true;
    });

    let output = [];

    for (let [name, val] of Object.entries(languageProficiencies)) {
      if (val === true)
        output.push(standardLanguages.filter((a) => a.name.toLowerCase() === name)[0]);

      if (name === "anyStandard") {
        let shuffled = Utils.shuffleArray(extraLangOptions);

        for (let i = 1; i <= val; i++) {
          output.push(shuffled[i]);
        }
      }
    }

    return output;
  }

  getAtkDmg() {
    const dmgDice = [4, 6, 8, 10, 12];

    let sAtkOpt = dmgDice
      .map((die) => {
        let dieAvg = (die + 1) / 2;
        let whole = Math.floor(this.dpr / dieAvg);
        let remainder = this.dpr % Math.round(dieAvg * whole);

        return [whole, die, remainder];
      })
      .filter((o) => o[0] !== 0);

    if (sAtkOpt[0] === undefined) sAtkOpt = [[1, 4, 0]];

    // let twoAtkOpt = sAtkOpt.filter( o => o[0] % 2 === 0 && o[2] % 2 === 0 ).map( o =>  [ o[0] / 2, o[1], o[2] / 2 ]);
    let twoAtkOpt = multiattackMath(2, sAtkOpt);

    // let threeAtkOpt = sAtkOpt.filter( o => o[0] % 3 === 0 && o[2] % 3 === 0 ).map( o =>  [ o[0] / 3, o[1], o[2] / 3 ]);
    let threeAtkOpt = multiattackMath(3, sAtkOpt);

    // ==== OUTPUT
    let num, arr, dmg;

    if (this.cr >= 10) {
      num = 3;
      arr = threeAtkOpt[Utils.randomArrayIndex(threeAtkOpt.length)];
      dmg = Math.round(arr[0] * ((arr[1] + 1) / 2) + arr[2]);
    } else if (this.cr >= 1) {
      num = 2;
      arr = twoAtkOpt[Utils.randomArrayIndex(twoAtkOpt.length)];
      dmg = Math.round(arr[0] * ((arr[1] + 1) / 2) + arr[2]);
    } else {
      num = 1;
      arr = sAtkOpt[Utils.randomArrayIndex(sAtkOpt.length)];
      dmg = this.dpr;
    }

    // console.log(s)

    return {
      attacks: num,
      damage: {
        tPerAtk: dmg,
        dice: arr,
      },
    };

    function multiattackMath(atkNum, atksArr) {
      let output = atksArr.map((o) => [Math.round(o[0] / atkNum), o[1], Math.round(o[2] / atkNum)]);

      output = output.map((o) => {
        // redistribute dice math from lots of dice (12d8+2) to somewhat more reasonable rolls (6d8+23)
        if (o[0] >= o[2] && o[0] > 2) {
          // dividing by 0 is impossible and by 1 is pointless, so if the damage bonus is 0 or 1, make it 1.5
          let diff = o[2] <= 1 ? Math.round(o[0] / 1.5) : Math.round(o[0] / o[2]);

          let damageCalc = o[2] + Math.round(diff * (o[1] / 2 + 1) + o[2]);

          return [o[0] - diff, o[1], damageCalc];
        }

        return o;
      });
      return output;
    }
  }

  splitCr(desiredCR) {
    // This function takes a desired CR and splits it into combinations that can make up an average.
    // It then returns the indexes of those CRs from the CR data table
    const desiredIndex = crData.cr.findIndex((e) => e._cr === desiredCR);
    const maxSpread = 4;

    let avgOptsArray = [];

    for (let i = 0; i <= maxSpread; i++) {
      const low = desiredIndex - i <= 0 ? 0 : desiredIndex - i;
      const high =
        desiredIndex + i >= crData.cr.length - 1 ? crData.cr.length - 1 : desiredIndex + i;

      avgOptsArray.push([low, high]);

      if (desiredIndex + i >= crData.cr.length - 1 || desiredIndex - i <= 0) {
        // terminate loop early if we hit the top or bottom of the possible options
        break;
      }
    }

    const result = avgOptsArray[Utils.randomArrayIndex(avgOptsArray)];

    if (Utils.randomInt(1, 2) === 1) {
      return {
        first: result[0],
        second: result[1],
      };
    } else {
      return {
        first: result[1],
        second: result[0],
      };
    }
  }
}

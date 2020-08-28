import Names from "data/names/allNames";
import Utils from "components/utils";

import Races from "data/races/allRaces";
import xge from "data/names/xgeNames";

export default class Name {
  constructor(options = {}) {
    this.race = options.race || this.randomRace();
    this.sex = options.sex || this.randomSex();
    this.age = options.age;
    this.jobGroup = options.jobGroup;
    this.xgeFilteredObj = this.xgeObjFilter();

    this.name = this.getNameByRace();
  }

  randomSex() {
    const sex = ["male", "female"];
    return sex[Utils.randomArrayIndex(sex)];
  }

  randomRace() {
    const racesArray = Object.keys(Races);
    const weightedArray = [];

    racesArray.forEach((race) => {
      const weight = Races[race].rarity;
      for (let i = 1; i <= weight; i++) {
        weightedArray.push(race);
      }
    });

    return weightedArray[Utils.randomArrayIndex(weightedArray.length)];
  }

  getNameByRace() {
    switch (this.race) {
      case "dwarf":
        return this.buildDwarfName();
      case "half-elf":
        return this.buildHalfElfName();
      case "half-orc":
        return this.buildHalfOrcName();
      case "elf":
        return this.buildElfName();
      case "dragonborn":
        return this.buildDragonbornName();
      case "tiefling":
        return this.buildTieflingName();
      case "gnome":
        return this.buildGnomeName();
      default:
        return this.buildHumanName();
    }
  }

  buildDwarfName() {
    // -- 50/50 chance of Xanthar's Guide name or a random constructed name

    if (Utils.randomInt(1, 2) === 1) {
      const firstName = this.xgeFirstName(this.xgeFilteredObj, this.sex);
      const clanName = this.xgeClanName(this.xgeFilteredObj);
      const displayName = `${firstName} ${clanName}`;

      return {
        name: firstName,
        surname: clanName,
        displayName: displayName.trim(),
      };
    } else {
      let firstName =
        Names.dwarven.first[this.sex][Utils.randomArrayIndex(Names.dwarven.first[this.sex].length)];
      let frontCompound =
        Names.dwarven.last.frontCompound[
          Utils.randomArrayIndex(Names.dwarven.last.frontCompound.length)
        ];
      let backCompound =
        Names.dwarven.last.backCompound[
          Utils.randomArrayIndex(Names.dwarven.last.backCompound.length)
        ];

      frontCompound =
        frontCompound.substr(0, 1).toUpperCase() + frontCompound.substr(1, frontCompound.length);

      const clanName = frontCompound.concat(backCompound);
      const displayName = `${firstName} ${clanName}`;

      return {
        name: firstName,
        surname: frontCompound.concat(backCompound),
        displayName: displayName.trim(),
      };
    }
  }

  buildHalfElfName() {
    const fiftyFifty = Utils.randomInt(1, 2);

    if (fiftyFifty === 1) {
      this.xgeFilteredObj = this.xgeObjFilter("human");
      return this.buildHumanName();
    } else {
      this.xgeFilteredObj = this.xgeObjFilter("elf");
      return this.buildElfName();
    }
  }

  buildHalfOrcName() {
    const method = ["random", "xge"][Utils.randomInt(0, 1)];

    if (method === "xge") {
      const firstName = this.xgeFirstName(this.xgeFilteredObj, this.sex);

      return {
        name: firstName,
        surname: "",
        displayName: firstName,
      };
    } else {
      this.xgeFilteredObj = this.xgeObjFilter("human");
      return this.buildHumanName();
    }
  }

  buildElfName() {
    function getFirstName(xgeFilteredObj, sex) {
      const options = xgeFilteredObj.tables.find((obj, i) => {
        if (obj.option.toLowerCase().includes(sex)) return obj.table;
        return false;
      });

      let diceRoll = Utils.randomInt(0, 99);

      return options.table.find((entry) => {
        if (
          (diceRoll >= entry.min && diceRoll <= entry.max) ||
          diceRoll === entry.min ||
          diceRoll === entry.max
        ) {
          return entry;
        }

        return false;
      }).result;
    }

    function getSurname(xgeFilteredObj, sex) {
      const nameObj = xgeFilteredObj.tables.find((obj, i) => {
        if (obj.option === "Family") return obj.table;
        return false;
      });

      let diceRoll = Utils.randomInt(0, 99);

      return nameObj.table.find((entry) => {
        if (
          (diceRoll >= entry.min && diceRoll <= entry.max) ||
          diceRoll === entry.min ||
          diceRoll === entry.max
        ) {
          return entry;
        }

        return false;
      }).result;
    }

    const name = getFirstName(this.xgeFilteredObj, this.sex);
    const surname = getSurname(this.xgeFilteredObj, this.sex);
    const displayName = `${name} ${surname}`;

    return {
      name: name,
      surname: surname,
      displayName: displayName.trim(),
    };
  }

  buildHumanName() {
    const data = Names.human;
    const surnameJobs = ["educated", "lesser nobility", "greater nobility", "magic"];

    let firstName = "";
    let surname = "";

    function getXGEName(xgeFilteredObj, sex) {
      const options = xgeFilteredObj.tables.filter((obj, i) => {
        if (obj.option.toLowerCase().includes(sex)) return obj.table;
        return false;
      });

      const randomGroup = options[Utils.randomInt(0, options.length - 1)];

      let diceRoll = Utils.randomInt(0, 99);

      return randomGroup.table.find((entry) => {
        if (
          (diceRoll >= entry.min && diceRoll <= entry.max) ||
          diceRoll === entry.min ||
          diceRoll === entry.max
        ) {
          return entry.result;
        }
        return false;
      }).result;
    }

    if (Utils.randomInt(1, 2) === 1) {
      firstName = getXGEName(this.xgeFilteredObj, this.sex);
    } else {
      firstName = data.first[this.sex][Utils.randomArrayIndex(data.first[this.sex].length)];
    }

    if (surnameJobs.some((job) => job === this.jobGroup)) {
      surname = data.last[Utils.randomArrayIndex(data.last.length)];
    }

    const displayName = `${firstName} ${surname}`;

    return {
      name: firstName,
      surname: surname,
      displayName: displayName.trim(),
    };
  }

  buildDragonbornName() {
    let method = ["random", "xge"][Utils.randomInt(0, 1)];

    if (method === "xge") {
      const firstName = this.xgeFirstName(this.xgeFilteredObj, this.sex);
      const clanName = this.xgeClanName(this.xgeFilteredObj);
      const displayName = `${firstName} ${clanName}`;

      return {
        name: firstName,
        surname: clanName,
        displayName: displayName.trim(),
      };
    } else {
      const firstNameGroup = Names.dragonborn.first[this.sex];
      const fn1 = firstNameGroup.front[Utils.randomArrayIndex(firstNameGroup.front.length)];
      const fn2 = firstNameGroup.back[Utils.randomArrayIndex(firstNameGroup.back.length)];

      // TODO - add random clan name generator if its worth the effort.

      let firstName = fn1 + fn2;
      let clanName = "";

      const displayName = `${firstName} ${clanName}`;

      return {
        name: firstName,
        surname: clanName,
        displayName: displayName.trim(),
      };
    }
  }

  buildTieflingName() {
    let method = ["random", "xge"][Utils.randomInt(0, 1)];

    if (method === "xge") {
      const firstName = this.xgeFirstName(this.xgeFilteredObj, this.sex);
      const displayName = `${firstName}`;

      return {
        name: firstName,
        surname: "",
        displayName: displayName.trim(),
      };
    } else {
      const firstNameGroup = Names.tiefling.first[this.sex];
      const fn1 = firstNameGroup.front[Utils.randomArrayIndex(firstNameGroup.front.length)];
      const fn2 = firstNameGroup.back[Utils.randomArrayIndex(firstNameGroup.back.length)];

      // TODO - add random clan name generator if its worth the effort.

      let firstName = fn1 + fn2;
      let clanName = "";

      const displayName = `${firstName} ${clanName}`;

      return {
        name: firstName,
        surname: clanName,
        displayName: displayName.trim(),
      };
    }
  }

  buildGnomeName() {
    const method = ["random", "xge"][Utils.randomInt(0, 1)];
    const nameLenArr = new Array(Utils.randomInt(1, 2)).fill(undefined);

    if (method === "xge") {
      const firstName = nameLenArr
        .map((x) => {
          return this.xgeFirstName(this.xgeFilteredObj, this.sex);
        })
        .join(" ");

      const clanName = this.xgeClanName(this.xgeFilteredObj);
      const displayName = `${firstName} ${clanName}`;

      return {
        name: firstName,
        surname: clanName,
        displayName: displayName.trim(),
      };
    } else {
      const firstName = nameLenArr
        .map((x) => {
          const firstNameGroup = Names.gnome.first[this.sex];
          const fn1 = firstNameGroup.front[Utils.randomArrayIndex(firstNameGroup.front.length)];
          const fn2 = firstNameGroup.back[Utils.randomArrayIndex(firstNameGroup.back.length)];

          return fn1 + fn2;
        })
        .join(" ");

      // TODO - add random clan name generator if its worth the effort.
      const clanName = this.xgeClanName(this.xgeFilteredObj);

      const displayName = `${firstName} ${clanName}`;

      return {
        name: firstName,
        surname: clanName,
        displayName: displayName.trim(),
      };
    }
  }

  xgeObjFilter(forceRace) {
    let race = forceRace ? forceRace : this.race;

    const xgeFilteredObjFilter = xge.name.find((obj, i) => {
      if (obj.name.toLowerCase() === race) {
        return obj;
      }
      return false;
    });

    return xgeFilteredObjFilter;
  }

  xgeFirstName(obj, sex) {
    const nameObj = obj.tables.find((obj, i) => {
      if (obj.option.toLowerCase() === sex) return obj.table;
      return false;
    });

    let diceRoll = Utils.randomInt(0, 99);

    return nameObj.table.find((entry) => {
      if (
        (diceRoll >= entry.min && diceRoll <= entry.max) ||
        diceRoll === entry.min ||
        diceRoll === entry.max
      ) {
        return entry;
      }

      return false;
    }).result;
  }

  xgeClanName(obj) {
    const nameObj = obj.tables.find((obj, i) => {
      if (obj.option === "Clan") return obj.table;
      return false;
    });

    let diceRoll = Utils.randomInt(0, 99);

    return nameObj.table.find((entry) => {
      if (
        (diceRoll >= entry.min && diceRoll <= entry.max) ||
        diceRoll === entry.min ||
        diceRoll === entry.max
      ) {
        return entry;
      }

      return false;
    }).result;
  }
}

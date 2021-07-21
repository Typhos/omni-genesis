import Name from "../person/nameBuilder";
import OpenSourceRaceData from "../../data/races/5eToolsRaces";
import Professions from "../../data/professions";
import Races from "../../data/races/allRaces";
import StatBlock from "../dndStatBlock/";
import StatDescriptionData from "../../data/statDescription";
import Traits from "../../data/people/allTraits";
import Utils from "../../components/utils";

// == Data Imports






export default class Person {
  constructor(params = {}) {
    if (params.seed) {
      global.seed = params.seed;
    } else if (global.seed === undefined) {
      Utils.setNewSeed();
    }

    this.seed = params.seed || global.seed;
    this.inputParams = { ...params };
    this.race = params.race || this.getRace(params);
    this.raceObj = OpenSourceRaceData.race.filter(
      (r) => r.name.toLowerCase() === this.race && r.source === "PHB"
    )[0];
    this.sex = params.sex || this.getSex();
    this.age = params.age || this.getAge(params);
    this.culture = params.culture;

    this.name = params.name || this.getName();

    // Extra information that only needs to be generated if we are generating an individual
    if (!params.batch) {
      this.jobGroup = params.jobGroup || this.getJobGroup(params);
      this.occupation = this.getOccupation(params);
      this.checkJobVerbage();

      this.subRaceObj = this.getSubRace();
      this.subrace = this.displaySubrace();
      this.alignment = this.getAlignment(params);
      this.alignmentDescription = this.getAlignmentDescriptor(this.alignment);

      this.pronouns = this.getPronouns();
      this.ageGroup = this.getAgeGroup(this.age);

      this.stats = new StatBlock(this.race, this.subRaceObj, params.cr);
      this.description = this.writeDescription();
      this.physical = this.getPhysicalInfo();

      this.JSON = this.buildJSON();
    }

    delete this.raceObj;
    delete this.subRaceObj;
  }

  getRace() {
    const racesArray = Object.keys(Races);
    const weightedArray = [];

    racesArray.forEach((race) => {
      const percentageModifier = 1 + Utils.randomInt(-30, 50) / 10;
      const weight = Races[race].rarity * percentageModifier;
      for (let i = 1; i <= weight; i++) {
        weightedArray.push(race);
      }
    });

    return weightedArray[Utils.randomArrayIndex(weightedArray)];
  }

  getSubRace() {
    let races = OpenSourceRaceData.race.filter(
      (r) => r.name.toLowerCase() === this.race && r.source === "PHB"
    )[0];

    if (races.subraces) {
      const filtered = races.subraces.filter(
        (r) => (r.source === "PHB" || r.source === undefined) && r.name !== "Variant"
      );

      if (filtered.length > 0) {
        return filtered[Utils.randomArrayIndex(filtered)];
      }
    }

    return undefined;
  }

  displaySubrace() {
    if (this.subRaceObj) {
      if (this.subRaceObj.alias) return this.subRaceObj.alias[0];
      return this.subRaceObj.name;
    }
    return "";
  }

  getSex() {
    const sex = ["male", "female"];
    return sex[Utils.randomArrayIndex(sex)];
  }

  getPronouns() {
    if (this.sex === "male") {
      return {
        subject: "he",
        object: "him",
        posAdj: "his",
        posNoun: "his",
        subjectCaps: "He",
        objectCaps: "Him",
        posAdjCaps: "His",
        posNounCaps: "His",
        reflexive: "himself",
        reflexiveCaps: "Himself",
        isAre: "is",
        hasHave: "has",
        wasWere: "was",
        doesDo: "does",
        noun: "man",
      };
    } else if (this.sex === "female") {
      return {
        subject: "she",
        object: "her",
        posAdj: "her",
        posNoun: "hers",
        subjectCaps: "She",
        objectCaps: "Her",
        posAdjCaps: "Her",
        posNounCaps: "Hers",
        reflexive: "herself",
        reflexiveCaps: "herself",
        isAre: "is",
        hasHave: "has",
        wasWere: "was",
        doesDo: "does",
        noun: "woman",
      };
    } else {
      return {
        subject: "They",
        object: "Them",
        posAdj: "Their",
        posNoun: "Theirs",
        isAre: "are",
        hasHave: "have",
        wasWere: "was",
        doesDo: "do",
        noun: "person",
      };
    }
  }

  getName() {
    return new Name({
      race: this.race,
      sex: this.sex,
      jobGroup: this.jobGroup,
      age: this.age,
      culture: this.culture,
    }).name;
  }

  getAge(params) {
    let age;
    const lifespan = Races[this.race].lifespan;
    const childNum = lifespan / 6 - 1;
    const youthNum = lifespan / 4;

    if (params.child) {
      age = Utils.randomInt(0, childNum);

      if (age === 0) age = "newborn";
    } else if (params.elderly) {
      const old = lifespan - lifespan / 4;
      const max = lifespan + lifespan / 6;

      age = Utils.randomInt(old, max);
    } else {
      age = Utils.randomInt(youthNum, lifespan - lifespan / 10);
    }

    return age;
  }

  getAgeGroup(age) {
    let lifespan = Races[this.race].lifespan;
    let childNum = lifespan / 6 - 1;
    let youthNum = lifespan / 4;
    let youngAdult = lifespan / 3;
    let elderNum = lifespan - lifespan / 4;

    if (age <= childNum) {
      return "Child";
    } else if (age <= youthNum) {
      return "Youth";
    } else if (age <= youngAdult) {
      return "Young Adult";
    } else if (age >= elderNum) {
      return "Elder";
    } else {
      return "Adult";
    }
  }

  getJobGroup(params) {
    // don't return a job group if one is prescribed by the call.
    if (params.occupation) return undefined;

    const allJobs = Object.keys(Professions.jobs);
    return allJobs[Utils.randomArrayIndex(allJobs)];
  }

  getOccupation(params) {
    // What? You can just "get a job?". This really is a fantasy world.

    if (params.occupation) {
      let job = params.occupation;
      // if a job is provided which has a / to split title based on sex, it is always Male/Female.
      // split the string and then return the appropriate one.
      if (job.indexOf("/") >= 0) {
        let index = this.sex === "male" ? 0 : 1;
        job = job.split("/")[index];
      }
      return job;
    } else {
      const jobGroup = this.jobGroup;
      let job;

      if (jobGroup === "adventurer") {
        const classes = Object.keys(Professions.jobs[jobGroup]);
        job = classes[Utils.randomArrayIndex(classes)];
      } else if (Array.isArray(Professions.jobs[jobGroup].list)) {
        job = Professions.jobs[jobGroup].list;
        job = job[Utils.randomArrayIndex(job)];
      } else {
        job = Professions.jobs[jobGroup].list[this.sex];
        job = job[Utils.randomArrayIndex(job)];
      }

      return job;
    }
  }

  checkJobVerbage() {
    // for jobs with gender specific verbage.
    if (this.occupation.includes("*")) {
      let noun = this.sex === "male" ? "man" : "woman";
      this.occupation = this.occupation.replace("*", noun);
    }
  }

  getAlignment(params) {
    const tendancy = Races[this.race].alignmentTendancies;
    const alignmentWeight = 2;
    const alignments = {
      "any good": ["lawful good", "neutral good", "chaotic good"],
      "any evil": ["lawful evil", "neutral evil", "chaotic evil"],
      "any lawful": ["lawful good", "lawful neutral", "lawful evil"],
      "any chaotic": ["chaotic good", "chaotic neutral", "chaotic evil"],
      "any neutral": [
        "neutral good",
        "neutral evil",
        "lawful neutral",
        "true neutral",
        "chaotic neutral",
      ],
    };

    let authority = ["lawful", "neutral", "chaotic"];
    let morality = ["good", "neutral", "evil"];

    if (params.alignment && params.alignment.includes("any")) {
      return alignments[params.alignment][Utils.randomArrayIndex(alignments[params.alignment])];
    } else if (params.alignment !== undefined) {
      return params.alignment;
    } else {
      if (tendancy) {
        let a = new Array(alignmentWeight).fill(tendancy[0]);
        let m = new Array(alignmentWeight).fill(tendancy[1]);

        authority = [...authority, ...a];
        morality = [...morality, ...m];
      }

      let output = `${authority[Utils.randomArrayIndex(authority)]} ${
        morality[Utils.randomArrayIndex(morality)]
      }`;
      if (output === "neutral neutral") output = "unaligned";

      return output;
    }
  }

  getAlignmentDescriptor(alignment) {
    switch (alignment) {
      case "lawful good":
        return "the daring";
      case "neutral good":
        return "the kind";
      case "chaotic good":
        return "the mirthful";
      case "lawful neutral":
        return "the honorable";
      case "chaotic neutral":
        return "the carefree";
      case "lawful evil":
        return "the wicked";
      case "neutral evil":
        return "the vile";
      case "chaotic evil":
        return "the savage";

      default:
        return "the indifferent";
    }
  }

  getPhysicalInfo() {
    const physicalObj =
      (this.subRaceObj && this.subRaceObj.heightAndWeight) || this.raceObj.heightAndWeight || {};
    let heightRoll = 1;

    if (physicalObj.heightMod) {
      heightRoll = diceMath(physicalObj.heightMod);
    }

    let height = physicalObj.heightMod
      ? physicalObj.baseHeight + heightRoll
      : physicalObj.baseHeight;
    let weight = physicalObj.weightMod
      ? physicalObj.baseWeight + heightRoll * diceMath(physicalObj.weightMod)
      : physicalObj.baseWeight;

    return {
      imperial: {
        height: height,
        weight: weight,
      },
      metric: {
        height: parseInt((height * 2.54).toFixed(0)),
        weight: parseFloat((weight * 0.453592).toFixed(2)),
      },
    };

    function diceMath(str) {
      return new Array(parseInt(str.split("d")[0]))
        .fill(undefined)
        .map((x) => Utils.randomInt(1, parseInt(str.split("d")[1])))
        .reduce((a, b) => a + b, 0);
    }
  }

  writeDescription() {
    let personality = this.getLikesAndDislikes();

    return {
      personality: this.getPersonalityTraits(),
      statsDescription: this.statsDescription(),
      quirk: this.pronounReplace(Traits.quirks[Utils.randomArrayIndex(Traits.quirks)]),
      likes: personality.likes,
      dislikes: personality.dislikes,
      // physicalDescription: 0,
    };
  }

  getPersonalityTraits() {
    let traits = [...Traits.personalityTraits];
    const traitsArray = new Array(3).fill(undefined).map(() => getTraitSet());

    let concatString = traitsArray.map((trait) => trait.name).join(", ");

    return {
      traits: traitsArray,
      text: concatString,
    };

    function getTraitSet() {
      const index = Utils.randomArrayIndex(traits);
      const options = traits[index];

      // remove picked trait group
      traits.splice(index, 1);

      return options[Utils.randomArrayIndex(options)];
    }
  }

  getLikesAndDislikes() {
    let options = [...Traits.values];
    let output = [];

    new Array(4).fill(undefined).forEach(() => {
      const index = Utils.randomArrayIndex(options);
      const val = options[index];

      output.push(val);
      options.splice(index, 1);
    });

    const midpoint = Math.round((output.length - 1) / 2);
    const likes = output.splice(0, midpoint).join(" & ").trim();
    const dislikes = output.join(" & ").trim();

    return {
      likes: likes,
      dislikes: dislikes,
    };
  }

  pronounReplace(str) {
    const pronouns = this.pronouns;
    return str
      .split(/{(.*?)}/)
      .filter((x) => x !== "" && x !== " ")
      .map((substr) => {
        for (let [pro, rep] of Object.entries(pronouns)) {
          if (pro === substr) return rep;
        }
        return substr;
      })
      .join(" ");
  }

  statsDescription() {
    const stats = this.stats.coreStats.mods;

    let sortableStats = [];
    for (let [key, value] of Object.entries(stats)) {
      sortableStats.push([key, value]);
    }

    sortableStats = Utils.shuffleArray(sortableStats);

    let first = sortableStats[0];
    let description = [];

    for (let [key, value] of Object.entries(StatDescriptionData[first[0]])) {
      if (key.includes(first[1])) description.push(value);
    }

    return description.map((str) => {
      return this.pronounReplace(str);
    });
  }

  buildJSON() {
    let json = {};
    let name = this.name.displayName.replace(/\s/g, "-");

    json[name] = {
      playerKnown: false,
      path: "person",
      hideOnCat: false,
      tags: [],
      name: this.name.displayName,
      nickname: this.name.displayName,
      linkingWords: [],
      race: this.race.charAt(0).toUpperCase() + this.race.slice(1),
      age: this.age,
      birthYear: "",
      deathYear: "",
      gender: this.sex.charAt(0).toUpperCase() + this.sex.slice(1),
      titles: [],
      occupation: this.occupation.charAt(0).toUpperCase() + this.occupation.slice(1),
      affiliations: [],
      quote: "",
      description: [
        `@+${this.name.displayName}+@ is a ${this.sex}, ${this.race} ${this.occupation}. ${this.description.statsDescription[0]} ${this.description.quirk}`,
      ],
      articles: {},
      dmArticles: {},
    };

    if (this.stats) {
      const stats = this.stats;
      const actions = function () {
        let array = [];
        const attackStr = [null, null, "two", "three"];

        if (stats.attacks > 1) {
          let name = "Multiattack.";
          let text = `${this.displayName} makes ${
            attackStr[stats.attacks]
          } melee or ranged attacks.`;

          array.push({
            name: name,
            text: text,
          });
        }

        array.push({
          name: "Sword.",
          text: `Melee Weapon Attack: +${stats.attackBonus} to hit, reach 5 ft., one target. Hit: ${stats.atkDmg.damage.tPerAtk} (${stats.atkDmg.damage.dice[0]}d${stats.atkDmg.damage.dice[1]}+${stats.atkDmg.damage.dice[2]}) damage.`,
        });

        array.push({
          name: "Bow.",
          text: `Ranged Weapon Attack: +${stats.attackBonus} to hit, range 60/120 ft., one target. Hit: ${stats.atkDmg.damage.tPerAtk} (${stats.atkDmg.damage.dice[0]}d${stats.atkDmg.damage.dice[1]}+${stats.atkDmg.damage.dice[2]}) damage.`,
        });

        return array;
      };

      const darkVision = stats.perception.senses.darkvision
        ? `Darkvision ${stats.perception.senses.darkvision} Ft.`
        : undefined;

      json[name].statBlock = {
        show: false,
        alignment: this.alignment,
        creatureType: `${stats.size} Humanoid`,
        stats: [
          { name: "STR", val: stats.coreStats.scores.str },
          { name: "DEX", val: stats.coreStats.scores.dex },
          { name: "CON", val: stats.coreStats.scores.con },
          { name: "INT", val: stats.coreStats.scores.int },
          { name: "WIS", val: stats.coreStats.scores.wis },
          { name: "CHA", val: stats.coreStats.scores.cha },
        ],
        armor: stats.ac,
        hitPoint: stats.hp,
        hitDie: stats.hitDice,
        speed: `${stats.speed} ft.`,
        skills: "",
        savingThrows: "",
        damageResistances: "",
        damageVulnerabilities: "",
        damageImmunities: "",
        conditionImmunities: "",
        senses: darkVision,
        passiveWisdom: stats.perception.passive,
        languages: stats.languages.map((lang) => lang.name).join(", "),
        challenge: stats.cr,
        abilities: [],
        actions: actions(),
      };
    }

    return JSON.stringify(json, null, 2);
  }
}

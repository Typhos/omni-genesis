//components
import Utils from "../../components/utils";

// generators
import Keep from "./keep";
import Bailey from "./bailey";
import Noble from "../person/noble";

// data
import placeNames from "../../data/places/randomPlaceNames";
import castleTypes from "../../data/castles/types";
import castleTranslation from "../../data/castles/translation";
import ruinCreatures from "../../data/castles/ruinInhabitants";

export default class Castle {
  constructor(params = {}) {
    if (params.seed) {
      global.seed = params.seed;
    } else if (!global.seed) {
      Utils.setNewSeed();
    }

    this.seed = global.seed;
    this.details = this.getCastleDetails();
    this.name = this.getCastleName(params.culture);
    this.size = this.getCastleSize();
    this.age = this.getCastleAge(params.maxAge);
    this.structure = this.getStructure();

    if (params.ruin) {
      this.remnants = this.getRemnants();
    } else {
      this.commander = this.getCommander(params.culture);
      this.garrison = this.getGarrison();
      this.levies = this.getLocalLevies();
      this.structuralStatus = this.getStructuralStatus();
      this.siegeHoldoutTime = this.getSiegeHoldoutTime();
    }

    console.log(this);
  }

  getCastleName(culture) {
    // group parameter determines which region of the world the name comes from. English, French, German, Norse, Spanish/Italian, Greek, Slavik, etc.
    // a group may have multiple sets of options, such as the Norse group having multiple types from different Nordic countries.
    if (!culture) culture = "english";

    let wordSet = placeNames[culture].nameSet[Utils.randomArrayIndex(placeNames[culture].nameSet)];

    let partsArray = wordSet.map((set) => {
      return set[Utils.randomArrayIndex(set)];
    });

    let name = partsArray.join("");

    if (culture === "dwarven") {
      // all dwarven castles should start with Karak, the dwarf word for fortress.
      name = "Karak " + name;
    } else if (culture === "elven") {
      // if the name ends in a vowel remove it. this prevents too many 'iae-ost' style endings.
      if (/[aeiou]$/.test(name)) name = name.substring(0, name.length - 1);

      name += "ost";
    } else {
      if (Utils.coinFlip()) {
        name += " Castle";
      } else {
        name = "Castle " + name;
      }
    }

    return name;
  }

  getCastleDetails() {
    const { types } = castleTypes;
    const selectedType = types[Utils.randomArrayIndex(types)];
    const { name, location } = selectedType;

    const locationObj = location[Utils.randomArrayIndex(location)];
    const { description, requiredTerrain } = locationObj;
    const terrain = requiredTerrain[Utils.randomArrayIndex(requiredTerrain)];

    return {
      type: name,
      location: description,
      terrain: terrain,
    };
  }

  getStructure() {
    const {
      age,
      size: { sizeValue },
    } = this;

    const parameters = {
      age: age,
      size: sizeValue,
    };

    if (sizeValue >= 3) {
      return new Bailey(parameters);
    } else {
      return new Keep(parameters);
    }
  }

  getCommander(culture) {
    const {
      size: { sizeValue },
    } = this;

    const titles = ["Sergeant", "Lieutenant", "Captain", "Commander", "Lord/Lady"];

    return new Noble({ occupation: titles[sizeValue - 1], culture: culture });
  }

  getCastleSize() {
    // castle sizes can range from 1-5, with a castle of size 1 being a small, walled tower. A castle of size 5 might be  a huge, sprawling complex, such as Prague castle.

    const num = Utils.randomInt(1, 5);
    const descriptions = ["tiny", "small", "average", "large", "huge"];

    return {
      sizeValue: num,
      sizeDescription: descriptions[num - 1],
    };
  }

  getGarrison() {
    // generally, the larger the keep, the larger the garrison.
    const {
      size: { sizeValue },
    } = this;
    const baselineGarrison = 25;
    const garrisonModifier = 2 + Utils.randomInt(-75, 75) / 100;

    return Math.round(baselineGarrison * (sizeValue * garrisonModifier));
  }

  getLocalLevies() {
    // levy size is pulled from the surrounding territory.
    const {
      size: { sizeValue },
      details: { terrain },
    } = this;

    const baselineLevy = 30;
    const levyModifier = 5 + Utils.randomInt(-75, 75) / 100;

    return Math.round(baselineLevy * (sizeValue * levyModifier));
  }

  getStructuralStatus() {
    // the structural integrity of a castle was hugely important. To represent this, we get a number from 1-3. A result of 1 is a damaged keep. 2 is a standard castle and 3 is a reinforced fortification. We then return the value and a string with the description of the status and/or issues.

    const status = Utils.randomInt(0, 2);
    const descriptions = ["damaged", "good", "reinforced"];

    return {
      statusValue: status,
      description: descriptions[status],
    };
  }

  getSiegeHoldoutTime() {
    // Medieval sieges tended to only last a few weeks to a few months. In rare castes, they lasted over a year. The most common numbers I've found were that a well-supplied castle could manage to last roughly 6 months (180 days). A poorly supplied or managed castle might only last a month. Obviously magic changes that equation, but that's an impossible influence to account for, since...well...magic.
    const {
      structuralStatus: { statusValue },
    } = this;

    const modifier = Utils.randomInt(15, 45) * (statusValue - 1);
    const holdOutTime = Utils.randomInt(90, 160) + modifier;

    return holdOutTime;
  }

  getCastleAge(maxAge) {
    if (maxAge) {
      return Utils.randomInt(maxAge / 10, maxAge - 10);
    } else {
      return Utils.randomInt(40, 400);
    }
  }

  getRemnants() {
    // when a castle is abandoned to ruin, it is either because it's too damage to repair, or no longer is of strategic value. In the former case, it has major structural damage. In the latter, it is still functional. In both cases, it is possible that the ruin is possibly overrun by a monstrous force.
    let result = {};

    const ruinOptions = [{ type: "abandoned" }, { type: "destroyed" }];
    const ruinType = ruinOptions[Utils.randomArrayIndex(ruinOptions)];
    result.ruinType = ruinType.type;

    result.residents = this.getRuinInhabitants();

    return result;
  }

  getRuinInhabitants() {
    const { creatures } = ruinCreatures;
    let result = {};

    const typeArray = creatures[Utils.randomArrayIndex(creatures)];
    const { type, options } = typeArray;

    result.type = type;
    result.creature = options[Utils.randomArrayIndex(options)];

    return result;
  }
}

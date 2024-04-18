import MerchantGenerator from "../merchants/merchantGenerator";
import Noble from "../person/noble";
import Races from "../../data/races/allRaces";
import Utils from "../../components/utils";
import cityObj from "../../data/cities/cities";
import governments from "../../data/governments";
import merchantsObj from "../../data/merchants/merchants";
import placeNames from "../../data/places/randomPlaceNames";
import racialBias from "../../data/cities/racialBiases";
import tavernsObj from "../../data/merchants/taverns";

const allShops = { ...tavernsObj, ...merchantsObj };

export default class City {
  constructor(params) {
    if (params.seed) {
      global.seed = params.seed;
    } else if (!global.seed) {
      Utils.setNewSeed();
    }

    this.seed = global.seed;
    this.type = "city";
    this.allowPrefixes = params.allowPrefixes !== false;
    this.inputParams = { ...params };

    // culture is determined first to allow for culture-specific names and changes to racial bias for dwarf and elf cities.
    this.culture = params.culture || this.randomCulture();
    this.populationBias = this.getRacialBias();

    if (params.population) {
      this.population = this.getPopulation(params);
      this.citySize = this.setCitySize(params.population);
    } else {
      this.citySize = params.size || this.randomCityType();
      this.population = this.getPopulation(params);
    }

    this.availableNPCRaces = this.getNPCRacesArray();

    this.image = this.getCityImg(this.citySize);
    this.inputSize = params.type;
    this.name = params.name || this.getCityName(this.culture, this.allowPrefixes);

    this.origin = this.getOrigin();
    this.activity = this.getActivity();
    // this.obstacles = this.getObstacles();
    // this.ruins = this.getRuins();

    if (!params.lightWeight) {
      this.economy = this.getEconomy();
      this.guards = this.getGuards(this.citySize);
      this.government = this.formGovernment(params);
      this.religion = this.getReligionInfo(params.pantheon);
      this.houses = this.getHouseArchitecture();
    }

    delete this.populationBias;
    delete this.availableNPCRaces;
  }

  randomCityType() {
    const sizes = Object.keys(cityObj.sizes);

    return sizes[Utils.randomArrayIndex(sizes)];
  }

  randomCulture() {
    return Object.keys(placeNames)[Utils.randomArrayIndex(Object.keys(placeNames))];
  }

  setCitySize(population) {
    for (let [key, value] of Object.entries(cityObj.sizes)) {
      const catMin = value[0];
      const catMax = value[1];

      if (population >= catMin && population <= catMax) {
        return key;
      }
    }

    // if nothing is sent back, it's because the city was too large, so return largest category.
    return "metropolis";
  }

  getCityImg(type) {
    return cityObj.images[type];
  }

  getCityName(culture, allowPrefixes) {
    // group parameter determines which region of the world the name comes from. English, French, German, Norse, Spanish/Italian, Greek, Slavik, etc.
    // a group may have multiple sets of options, such as the Norse group having multiple types from different Nordic countries.
    let wordSet = placeNames[culture].nameSet[Utils.randomArrayIndex(placeNames[culture].nameSet)];

    let partsArray = wordSet.map((set) => {
      return set[Utils.randomArrayIndex(set)];
    });

    if (placeNames[culture].prefix && allowPrefixes) {
      // chance to add a prefix name like North, Old, Port, Al, As, Khor, etc.
      if (Utils.randomInt(1, placeNames[culture].prefixChance) === 1) {
        const prePrefix =
          placeNames[culture].prefix[Utils.randomArrayIndex(placeNames[culture].prefix)];
        partsArray.unshift(prePrefix);
      }
    }

    return partsArray.join("");
  }

  getPopulation(params) {
    const size = cityObj.sizes[this.citySize];
    const totalPop = params.population || Utils.randomInt(size[0], size[1]);

    return {
      total: totalPop,
      races: this.getRacialBreakdown(totalPop)
    };
  }

  getRacialBias() {
    const { culture } = this;
    const racesArray = Object.keys(Races);
    const weightedArray = [];

    racesArray.forEach((race) => {
      const randomVal = (Utils.randomInt(1, 75) - 25) / 100;
      let percentageModifier = randomVal < 0 ? 0 : randomVal;

      if (racialBias[culture]) {
        if (race === culture) {
          percentageModifier = 1;
        }

        weightedArray.push([race, racialBias[culture][race] * percentageModifier]);
      } else {
        if (race === "human") {
          percentageModifier = 1;
        }
        weightedArray.push([race, Races[race].rarity * percentageModifier]);
      }
    });

    return weightedArray;
  }

  getRacialBreakdown(totalPop) {
    const { populationBias } = this;
    const racialObj = {};

    let total = populationBias
      .map((e) => e[1])
      .reduce((total, currentArray) => total + currentArray);
    let totalCheck = 0;
    populationBias.forEach((entry) => {
      let num = Math.round((entry[1] / total) * totalPop);
      racialObj[entry[0]] = num;
      totalCheck += num;
    });

    // just checking for a statistical +-1 which occurs due to rounding. If there is a mismatch in number, bump humans up or down by that number to even things out.
    if (totalCheck !== totalPop) {
      racialObj.human += totalPop - totalCheck;
    }

    return racialObj;
  }

  getNPCRacesArray() {
    const {
      population: { races }
    } = this;
    let popArray = [];

    for (let [key, value] of Object.entries(races)) {
      if (value > 0) {
        popArray = popArray.concat(new Array(value).fill(key));
      }
    }

    return popArray;
  }

  // Used for getting the race of leaders/merchants/etc.
  // Not used in population calculation
  getRaceFromLocalBias() {
    const { availableNPCRaces } = this;

    const arrayIndex = Utils.randomArrayIndex(availableNPCRaces);
    const randomNpcRace = availableNPCRaces[arrayIndex];
    availableNPCRaces.splice(arrayIndex, 1);

    return randomNpcRace;

    // const { populationBias } = this;
    // const total = populationBias
    //   .map((e) => e[1])
    //   .reduce((total, currentArray) => total + currentArray);
    // const dieRoll = Utils.randomInt(1, total);
    // const checkObj = {};

    // let counter = 0;
    // populationBias.forEach((arr) => {
    //   const key = arr[0];
    //   const val = arr[1];

    //   checkObj[key] = {};
    //   checkObj[key].min = counter + 1;
    //   counter += val;
    //   checkObj[key].max = counter;
    // });

    // for (let [key, value] of Object.entries(checkObj)) {
    //   const { min, max } = value;
    //   // most efficient way to check if a value equal to or between two numbers!
    //   if ((dieRoll - min) * (dieRoll - max) <= 0) {
    //     return key;
    //   }
    // }
  }

  importantPeople(totalPop, rolesArray) {
    // it requires about 200 people to support a noble house. This is modified by the standard 4d4-6 roll.
    const { culture } = this;
    const percentageModifier = 1 + Utils.randomInt(-2, 14) / 10;
    const SV = 200 * percentageModifier;

    // number of guaranteed people is equal to the population divided by the Support Value
    let baselineImportantPeople = Math.floor(totalPop / SV);

    // the remainder from the guaranteed person becomes a % chance to have another.
    const percentageChance = parseInt((totalPop / SV - baselineImportantPeople) * 100);
    const bonusHouse = Utils.randomInt(1, 100) < percentageChance ? 1 : 0;

    const totalPeople = baselineImportantPeople + bonusHouse;

    function getPeople(that) {
      const leadersLimit = 20;
      const limit = totalPeople >= leadersLimit ? leadersLimit - 1 : totalPeople;

      return new Array(limit)
        .fill(undefined)
        .map((x) => {
          const noblePersonRace = that.getRaceFromLocalBias();

          return new Noble({
            jobGroup: "noble",
            race: noblePersonRace,
            culture: culture,
            occupation: rolesArray[Utils.randomArrayIndex(rolesArray)]
          });
        })
        .sort((a, b) => {
          return a.occupation.localeCompare(b.occupation);
        });
    }

    return {
      number: totalPeople,
      limited: totalPeople > 12 ? true : false,
      noblePeopleArray: getPeople(this)
    };
  }

  getEconomy() {
    const cityType = this.citySize;

    function economyWording() {
      const bDesr = ["weak", "stable", "strong"];

      const future = [
        "declining rapidly",
        "slowly declining",
        "stable",
        "slowly growing",
        "growing rapidly"
      ];

      const baseNum = Utils.randomArrayIndex(bDesr);
      const futureNum = Utils.randomArrayIndex(future);

      const futureDescription = function () {
        if (baseNum === 1 && futureNum === 2) {
          return "";
        } else if (baseNum < 1) {
          // bad economy
          if (futureNum < 2) {
            // declining
            return `and ${future[futureNum]}`;
          } else if (futureNum >= 2) {
            // growing
            return `but ${future[futureNum]}`;
          }
        } else if (baseNum >= 1) {
          // good economy
          if (futureNum < 2) {
            // declining
            return `but ${future[futureNum]}`;
          } else if (futureNum >= 2) {
            // growing
            return `and ${future[futureNum]}`;
          }
        }
      };

      return `${bDesr[baseNum]} ${futureDescription()}`;
    }

    function getPrimaryEconomy() {
      const econ = cityObj.economy[cityType].main;
      return econ[Utils.randomArrayIndex(econ)];
    }

    return {
      description: economyWording(),
      primary: getPrimaryEconomy(),
      merchants: this.getMerchants()
      // crime: this.getCrimeRate(),
    };
  }

  getCrimeRate() {
    const crimeRateDescription = ["nonexistent", "low", "average", "high", "pervasive"];
    const index = Utils.randomArrayIndex(crimeRateDescription);

    return crimeRateDescription[index];
  }

  getMerchants() {
    const { culture } = this;
    const economyObj = cityObj.economy[this.citySize];
    const svDifferences = economyObj.svDiff || {};
    const merchants = {
      tradesTotal: 0,
      shopsTotal: 0,
      tradesArray: [],
      shops: []
    };

    const pop = this.population.total;

    for (let [key, value] of Object.entries(allShops)) {
      // make the Support Vale (SV) a bit variable so that not every city has the same results
      // if the city-type has a modified SV list (ie. castle-towns) grab those first

      const percentageModifier = 1 + Utils.randomInt(-1, 10) / 10;
      const SV = (svDifferences[key] || value.SV) * percentageModifier;

      // number of guaranteed shops is equal to the population divided by the Support Value
      let guaranteedShops = Math.floor(pop / SV);

      // the remainder from the guaranteed shops becomes a % chance to have another.
      const percentageChance = parseInt((pop / SV - guaranteedShops) * 100);
      const bonus = Utils.randomInt(1, 100) < percentageChance;

      const totalShops = bonus ? guaranteedShops + 1 : guaranteedShops;

      const shopTitle = allShops[key].establishments
        ? allShops[key].establishments
        : allShops[key].plural;
      merchants.tradesArray[shopTitle] = totalShops;
      merchants.tradesTotal += totalShops;

      if (totalShops > 0) {
        const shopArray = [];
        if (allShops[key].buildShop) {
          // Only build shops with the option turned on.
          // A mason isn't going to have a storefront.
          for (let i = totalShops; i > 0; i--) {
            const ownerRace = this.getRaceFromLocalBias();
            shopArray.push(
              new MerchantGenerator({
                type: key,
                ownerRace,
                culture: culture,
                batchMode: true
              })
            );
            merchants.shopsTotal += 1;
          }

          merchants.shops[shopTitle] = shopArray;
        }
      }
    }

    return merchants;
  }

  getGuards(size) {
    // A well-kept medieval city will have 1 law officer (guard, watchman, etc.) for every 150 citizens. Slack cities will have fewer. A few rare cities have more.

    const pop = this.population.total;
    const guardMod = 1 + Utils.randomInt(-1, 5) / 10;
    let guardRatio = 150 * guardMod;

    if (size === "castle-town") {
      guardRatio = 15 * guardMod;
    }

    const guardTotal = Math.floor(pop / guardRatio);

    // A hamlet, village, castle-town or town would have a militia pulled from its population.
    // This number would be mostly men IRL, but in a fantasy world where we want to avoid sexism, let's just say it's of willing members from both sexes but still 50% baseline.
    // This 50% is then modified by those age range of the city, since children and the elderly are not drafted into the levy. 20% of the population are children and 10-20% are elderly. This means the levy is between 30-35% of the total population.

    const randomlyLevy = Math.round(pop * (0.5 * (Utils.randomInt(30, 35) / 100)));

    return {
      count: guardTotal,
      militiaLevy: randomlyLevy
    };
  }

  formGovernment(params) {
    // If there is a national government system (feudal, magocracy, etc) that needs to play out locally as well. This doesn't mean every place has that same type of rule, but it's more common.
    // if ( params.nationalGov )

    // First we have to look at the size of the city. If the population is 30 people, it's probably not run by a council of mages (probably).
    // Next, we take into consideration if there is a national governing system. If there is one, it has an out-sized influence on the local systems.
    // If there is no national system provided (or a one-off city) we pick at random. A government is determined a combination of ethnics and authority.

    // Either an authority is chosen from the 4 params (Democracy, Oligarchy, Despotic or Imperial) or chosen at random.
    const authority = params.authority;

    const availableGovernments = Object.keys(governments)
      .map((gov) => {
        if (governments[gov].availableTo.includes(this.citySize)) {
          if (!authority || governments[gov].authority === authority) {
            return gov;
          }
        }
        return undefined;
      })
      .filter((e) => e !== undefined);

    const selected = availableGovernments[Utils.randomArrayIndex(availableGovernments)];

    const { culture } = this;
    const leaderRace = this.getRaceFromLocalBias();
    const leader = new Noble({
      jobGroup: "ruler",
      race: leaderRace,
      culture: culture,
      occupation: governments[selected].leader
    });

    // Now that we have a government formed, we know what kind of people are important to run that institution. We can call for important people and give the array of possible titles.
    this.population.importantPeople = this.importantPeople(
      this.population.total,
      governments[selected].roles
    );

    this.population.importantPeople.noblePeopleArray.unshift(leader);
    this.population.importantPeople.number += 1;

    return {
      details: governments[selected],
      leader: leader,
      corruption: this.getCrimeRate()
    };
  }

  getReligionInfo(pantheonName) {
    // Places of worship are tricky. The more faiths, the more temples. First we need to determine how many different faiths / gods a town has. Next, determine how much of the population is associated with each religion / cult.
    // In a polytheistic society, most people worship multiple gods for different purposes or at different times of the year. As such

    // Generally it takes 400 people to warrant a temple to a deity (irl churches). It takes ~150 to warrant a shrine.
    // If we assume the average person might worship 4 deities from the pantheon for various reasons, that's 4*population for shrine count. However, the temple count doesn't change, since you can't attend more than 1 temple service at a time.
    // const pantheon = pantheons[pantheonName] || pantheons["centhris"];
    const pop = this.population.total;
    const shrineSV = 100;
    const templeSV = 400;

    const religiousityMod = 1 + Utils.randomInt(-1, 10) / 10;

    let shrineCount = Math.floor((pop * 3) / (shrineSV * religiousityMod));
    let lawChurchCount = Math.floor(pop / (templeSV * religiousityMod));
    let chaosTempleCount = Math.floor(pop / Utils.randomInt(3, 10) / (templeSV * religiousityMod));

    const percentageChanceLaw = parseInt((pop / templeSV - lawChurchCount) * 100);
    const lawBonus = Utils.randomInt(1, 100) < percentageChanceLaw;

    lawChurchCount = lawBonus ? lawChurchCount + 1 : lawChurchCount;

    // always a chance of a secret temple of Chaos
    if (Utils.randomInt(1, 6) === 1) chaosTempleCount += 1;

    return {
      chaosTemples: chaosTempleCount,
      lawChurches: lawChurchCount,
      shrines: shrineCount
    };
  }

  getHouseArchitecture() {
    const roofs = [
      "thatch roofs",
      "slate shingle roofs",
      "terracotta tile roofs",
      "log roofs",
      "turf roofs"
    ];

    const walls = [
      "timber frame walls",
      "wattle and daub walls",
      "cob walls",
      "brick walls",
      "stone walls"
    ];

    let roofStr = roofs[Utils.randomArrayIndex(roofs)];
    let wallStr = walls[Utils.randomArrayIndex(walls)];

    return `${wallStr} & ${roofStr}`;
  }

  getOrigin() {
    const { origins } = cityObj;
    const originsArray = Object.keys(origins);
    const name = originsArray[Utils.randomArrayIndex(originsArray)];

    return {
      name,
      description: origins[name]
    };
  }

  getActivity() {
    const { activities } = cityObj;
    const activitiesArray = Object.keys(activities);
    const name = activitiesArray[Utils.randomArrayIndex(activitiesArray)];

    return {
      name,
      description: activities[name]
    };
  }

  getObstacles() {
    const { citySize } = this;
    const { obstacles } = cityObj;
    let obstaclesArray = Object.keys(obstacles);
    let obstacleCount = 1;
    const outputArray = [];

    switch (citySize) {
      case "metropolis":
        obstacleCount = Utils.rollDice(1, 2, 1);
        break;
      case "city":
        obstacleCount = Utils.rollDice(1, 2);
        break;
      case "town":
        obstacleCount = Utils.rollDice(1, 2);
        break;
      default:
        break;
    }

    // const name = obstaclesArray[Utils.randomArrayIndex(obstaclesArray)];

    for (let i = 1; i <= obstacleCount; i++) {
      const name = obstaclesArray[Utils.randomArrayIndex(obstaclesArray)];
      obstaclesArray = obstaclesArray.filter((e) => e !== name);
      outputArray.push({
        name,
        description: obstacles[name]
      });
    }

    return outputArray;
  }

  getRuins() {
    const { citySize } = this;
    const {
      ruins: { natures, traits, obstacles }
    } = cityObj;

    let naturesArray = Object.keys(natures);
    let traitsArray = Object.keys(traits);
    let obstaclesArray = Object.keys(obstacles);
    let ruinCount = 0;

    switch (citySize) {
      case "metropolis":
        ruinCount = 1;
        break;
      case "city":
        ruinCount = Utils.rollDice(1, 3);
        break;
      case "town":
        ruinCount = Utils.rollDice(1, 4);
        break;
      default:
        ruinCount = Utils.rollDice(2, 3);
    }

    const outputArray = [];

    // const name = obstaclesArray[Utils.randomArrayIndex(obstaclesArray)];

    for (let i = 1; i <= ruinCount; i++) {
      const type = naturesArray[Utils.randomArrayIndex(naturesArray)];
      const trait = traitsArray[Utils.randomArrayIndex(traitsArray)];
      const obstacle = obstaclesArray[Utils.randomArrayIndex(obstaclesArray)];

      outputArray.push({
        type,
        typeDescription: natures[type],
        trait,
        traitDescription: traits[trait],
        obstacle,
        obstacleDescription: obstacles[obstacle]
      });
    }

    return outputArray;
  }
}

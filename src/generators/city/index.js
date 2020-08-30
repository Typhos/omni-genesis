import Utils from "../../components/utils";
import MerchantGenerator from "../merchants/merchantGenerator";
import Noble from "../person/noble";

import cityObj from "../../data/cities/cities";
import merchantsObj from "../../data/merchants/merchants";
import tavernsObj from "../../data/merchants/taverns";
import pantheons from "../../data/gods/pantheons";
import placeNames from "../../data/places/randomPlaceNames";
import governments from "../../data/governments";

import Races from "../../data/races/allRaces";
import racialBias from "../../data/cities/racialBiases";

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
    this.inputParams = { ...params };

    // culture is determined first to allow for culture-specific names and changes to racial bias for dwarf and elf cities.
    this.culture = params.culture || this.randomCulture();
    this.bias = this.getRacialBias();

    if (params.population) {
      this.population = this.getPopulation(params);
      this.citySize = this.setCitySize(params.population);
    } else {
      this.citySize = params.size || this.randomCityType();
      this.population = this.getPopulation(params);
    }

    this.image = this.getCityImg(this.citySize);
    this.inputSize = params.type;
    this.name = params.name || this.getCityName(this.culture);

    if (!params.lightWeight) {
      this.economy = this.getEconomy();
      this.guards = this.getGuards(this.citySize);
      this.government = this.formGovernment(params);
      this.religion = this.getReligionInfo(params.pantheon);
      this.houses = this.getHouseArchitecture();
    }

    delete this.bias;
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

  getCityName(culture) {
    // group parameter determines which region of the world the name comes from. English, French, German, Norse, Spanish/Italian, Greek, Slavik, etc.
    // a group may have multiple sets of options, such as the Norse group having multiple types from different Nordic countries.
    let wordSet = placeNames[culture].nameSet[Utils.randomArrayIndex(placeNames[culture].nameSet)];

    let partsArray = wordSet.map((set) => {
      return set[Utils.randomArrayIndex(set)];
    });

    if (placeNames[culture].prefix) {
      // chance to add a prefix name like North, Old, Port, Al, As, Khor, etc.
      if (Utils.randomInt(1, placeNames[culture].prefixChance) === 1) {
        const prePrefix = placeNames[culture].prefix[Utils.randomArrayIndex(placeNames[culture].prefix)];
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
      races: this.getRacialBreakdown(totalPop),
    };
  }

  getRacialBias() {
    const { culture } = this;
    const racesArray = Object.keys(Races);
    const weightedArray = [];
    let weight = 1;

    racesArray.forEach((race) => {
      const percentageModifier = Utils.randomInt(-20, 30) / 10;
      if (racialBias[culture]) {
        weight = racialBias[culture][race] * percentageModifier || Races[race].rarity * percentageModifier;
      } else {
        weight = Races[race].rarity * percentageModifier;
      }

      weightedArray.push([race, weight]);
    });

    return weightedArray;
  }

  getRaceFromLocalBias() {
    const { bias } = this;
    const total = bias.map((e) => e[1]).reduce((total, currentArray) => total + currentArray);
    const dieRoll = Utils.randomInt(1, total);
    const checkObj = {};

    let counter = 0;
    bias.forEach((arr) => {
      const key = arr[0];
      const val = arr[1];

      checkObj[key] = {};
      checkObj[key].min = counter + 1;
      counter += val;
      checkObj[key].max = counter;
    });

    for (let [key, value] of Object.entries(checkObj)) {
      const { min, max } = value;
      // most efficient way to check if a value equal to or between two numbers!
      if ((dieRoll - min) * (dieRoll - max) <= 0) {
        return key;
      }
    }
  }

  getRacialBreakdown(totalPop) {
    const { bias } = this;
    const racialObj = {};

    let total = bias.map((e) => e[1]).reduce((total, currentArray) => total + currentArray);
    let totalCheck = 0;
    bias.forEach((entry) => {
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
      const limit = totalPeople > 12 ? 12 : totalPeople;

      return new Array(limit).fill(undefined).map((x) => {
        const noblePersonRace = that.getRaceFromLocalBias();

        return new Noble({
          jobGroup: "noble",
          race: noblePersonRace,
          culture: culture,
          occupation: rolesArray[Utils.randomArrayIndex(rolesArray)],
        });
      });
    }

    return {
      number: totalPeople,
      limited: totalPeople > 12 ? true : false,
      noblePeopleArray: getPeople(this),
    };
  }

  getEconomy() {
    const cityType = this.citySize;

    function economyWording() {
      const bDesr = ["weak", "stable", "strong"];

      const future = ["declining rapidly", "slowly declining", "stable", "slowly growing", "growing rapidly"];

      const baseNum = Utils.randomArrayIndex(bDesr.length);
      const futureNum = Utils.randomArrayIndex(future.length);

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
      merchants: this.getMerchants(),
      crime: this.getCrimeRate(),
    };
  }

  getCrimeRate() {
    const crimeRateDescription = ["nonexistent", "low", "average", "high", "pervasive"];
    const index = Utils.randomArrayIndex(crimeRateDescription.length);

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
      shops: [],
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

      const shopTitle = allShops[key].establishments ? allShops[key].establishments : allShops[key].plural;
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
                owner: ownerRace,
                culture: culture,
                batchMode: true,
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
      militiaLevy: randomlyLevy,
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
      occupation: governments[selected].leader,
    });

    // Now that we have a government formed, we know what kind of people are important to run that institution. We can call for important people and give the array of possible titles.
    this.population.importantPeople = this.importantPeople(this.population.total, governments[selected].roles);

    this.population.importantPeople.noblePeopleArray.unshift(leader);
    this.population.importantPeople.number += 1;

    return {
      details: governments[selected],
      leader: leader,
      corruption: this.getCrimeRate(),
    };
  }

  getReligionInfo(pantheonName) {
    // Places of worship are tricky. The more faiths, the more temples. First we need to determine how many different faiths / gods a town has. Next, determine how much of the population is associated with each religion / cult.
    // In a polytheistic society, most people worship multiple gods for different purposes or at different times of the year. As such

    // In Centhris, there are 18 major gods and numerous minor (at the time of this code, 8 minor deities are in the database). [http://centhris.herokuapp.com/pantheon/Centhrian-Pantheon]
    // In Faerun, there are 48 gods (per the wiki. also, geez...) in the 5e pantheon. [https://forgottenrealms.fandom.com/wiki/Faer%C3%BBnian_pantheon]

    // Generally it takes 400 people to warrant a temple to a deity (irl churches). It takes ~150 to warrant a shrine.
    // If we assume the average person might worship 4 deities from the pantheon for various reasons, that's 4*population for shrine count. However, the temple count doesn't change, since you can't attend more than 1 temple service at a time.
    const pantheon = pantheons[pantheonName] || pantheons["centhris"];
    const pop = this.population.total;
    const shrineSV = 100;
    const templeSV = 400;

    const religiousityMod = 1 + Utils.randomInt(-1, 10) / 10;

    let shrineCount = Math.floor((pop * 3) / (shrineSV * religiousityMod));
    let templeCount = Math.floor(pop / (templeSV * religiousityMod));

    const percentageChance = parseInt((pop / templeSV - templeCount) * 100);
    const bonus = Utils.randomInt(1, 100) < percentageChance;

    templeCount = bonus ? templeCount + 1 : templeCount;

    function templesOfWhichGods() {
      // major gods are twice as likely as lesser gods, so we'll build an array of both, but have 2 of each major in the array.
      // multiple temples of the same god are fine. There are lot of churches in Rome!

      const output = {};
      let godsArr = [...pantheon.major.list, ...pantheon.major.list, ...pantheon.minor.list].sort();

      new Array(templeCount)
        .fill(undefined)
        .map((x) => {
          const name = godsArr[Utils.randomArrayIndex(godsArr)];

          return name;
        })
        .forEach((temple) => {
          if (!output[temple]) {
            output[temple] = 1;
          } else {
            output[temple] += 1;
          }
        });

      return output;
    }

    function shrinesToWhichGods() {
      // major gods are twice as likely as lesser gods, so we'll build an array of both, but have 2 of each major in the array.
      // multiple shrines of the same god are fine.

      const output = {};
      let godsArr = [...pantheon.major.list, ...pantheon.major.list, ...pantheon.minor.list].sort();

      new Array(shrineCount)
        .fill(undefined)
        .map((x) => {
          const name = godsArr[Utils.randomArrayIndex(godsArr)];

          return name;
        })
        .forEach((shrine) => {
          if (!output[shrine]) {
            output[shrine] = 1;
          } else {
            output[shrine] += 1;
          }
        });

      return output;
    }

    return {
      pantheon: pantheonName,
      temples: {
        count: templeCount,
        breakdown: templesOfWhichGods(),
      },
      shrines: {
        count: shrineCount,
        breakdown: shrinesToWhichGods(),
      },
    };
  }

  getHouseArchitecture() {
    const roofs = ["thatch roofs", "slate shingle roofs", "terracotta tile roofs", "log roofs", "turf roofs"];

    const walls = ["timber frame walls", "wattle and daub walls", "cob walls", "brick walls", "stone walls"];

    let roofStr = roofs[Utils.randomArrayIndex(roofs)];
    let wallStr = walls[Utils.randomArrayIndex(walls)];

    return `${wallStr} & ${roofStr}`;
  }
}

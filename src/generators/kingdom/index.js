import Castle from "../castle";
import City from "../city";
import Utils from "../../components/utils";
import cityDataObj from "../../data/cities/cities";
import governmentData from "../../data/kingdoms/governments.json";
import namePieces from "../../data/kingdoms/names";
import placeNames from "../../data/places/randomPlaceNames";
import stateSizes from "../../data/kingdoms/sizes";

// const kingdomWorker: Worker = new Worker("./workers/kingdomWorker.js");

// kingdomWorker.onmessage = (resp) => {
//   console.log(resp);
// }

export default class Kingdom {
  constructor(params = {}) {
    if (params.seed) {
      global.seed = params.seed;
    } else if (global.seed === undefined) {
      Utils.setNewSeed();
    }

    this.inputParams = { ...params };

    this.type = "kingdom";
    this.seed = params.seed || global.seed;
    this.culture = params.culture || this.getRandomCulture();
    this.name = this.getRandomName(this.culture);
    this.density = this.getRandomDensity(params.density);
    this.area = this.getRandomArea(params.size, this.density);
    this.population = this.getRandomPopulation(this.area, this.density.int);
    this.age = params.age || this.getRandomAge();
    this.defenses = this.getKingdomDenfenses();
    this.government = this.getGovernmentInfo();

    this.settlements = this.buildSettlements(this);
  }

  getRandomCulture() {
    return Object.keys(placeNames)[Utils.randomArrayIndex(Object.keys(placeNames))];
  }

  getRandomName(culture) {
    // Originally this was done using town names from the city generator, but it resulted in too many countries sounding like towns or cities.

    const { n1, n2, n3, n4 } = namePieces;
    const na1 = n1[Utils.randomArrayIndex(n1)];
    const na2 = n2[Utils.randomArrayIndex(n2)];
    const na3 = n3[Utils.randomArrayIndex(n3)];
    const na4 = n4[Utils.randomArrayIndex(n4)];
    const name = na1 + na2 + na3 + na4;

    return name;
  }

  getRandomAge() {
    // country age can be anywhere from 50 years to 1000 years.

    return Utils.randomInt(50, 1000);
  }

  getRandomArea(sizeParam, densityObj) {
    // Get a random area for the state.
    // Small states might be as small as Luxembourg @ 1k sq miles
    // Mid-sized state could be Belgium, Switzerland or the Netherlands @ 16k sq miles
    // Large state could be like France or Italy @ 110k-250k miles

    const stateSizesKeys = Object.keys(stateSizes.sizes);

    if (!sizeParam) sizeParam = stateSizesKeys[Utils.randomArrayIndex(stateSizesKeys)];

    const sqMiles = Utils.randomInt(stateSizes.sizes[sizeParam][0], stateSizes.sizes[sizeParam][1]);
    const land = landUse(sqMiles);
    const description = `Similar in size to ${realWorld(sqMiles)}`;

    return {
      relative: sizeParam,
      sqMiles: sqMiles,
      description: description,
      ...land,
    };

    function landUse(totalArea) {
      const densityStr = densityObj.string;
      const landUsageObj = {
        sparse: [110, 220],
        low: [230, 340],
        average: [350, 460],
        high: [470, 580],
        crowded: [590, 700],
      };

      const min = landUsageObj[densityStr][0];
      const max = landUsageObj[densityStr][1];

      const result = Utils.randomInt(min, max) / 1000;

      return {
        arable: Math.round(sqMiles * result),
        arablePercent: Math.round(100 * result),
        wilderness: sqMiles - Math.round(sqMiles * result),
        wildernessPercent: 100 - Math.round(100 * result),
      };
    }

    function realWorld(area) {
      const irlObj = stateSizes.realWorld;

      for (let [country, areaArray] of Object.entries(irlObj)) {
        if (area >= areaArray[0] && area <= areaArray[1]) {
          return country;
        }
      }
    }
  }

  getRandomPopulation(area, density) {
    const total = area.sqMiles * density;

    return {
      total: total,
    };
  }

  getRandomDensity(densityGroup) {
    // Math for random density is 6d4x5 or a random number from 30 to 110 people per sq mile
    let densityString = "";
    let densityNum = 0;

    const densityObj = {
      sparse: [15, 35],
      low: [36, 50],
      average: [51, 65],
      high: [66, 80],
      crowded: [81, 99],
    };

    switch (densityGroup) {
      case "Sparse":
        densityString = "sparse";
        densityNum = Utils.randomInt(densityObj[densityString][0], densityObj[densityString][1]);
        break;
      case "Low":
        densityString = "low";
        densityNum = Utils.randomInt(densityObj[densityString][0], densityObj[densityString][1]);
        break;
      case "Average":
        densityString = "average";
        densityNum = Utils.randomInt(densityObj[densityString][0], densityObj[densityString][1]);
        break;
      case "High":
        densityString = "high";
        densityNum = Utils.randomInt(densityObj[densityString][0], densityObj[densityString][1]);
        break;
      case "Crowded":
        densityString = "crowded";
        densityNum = Utils.randomInt(densityObj[densityString][0], densityObj[densityString][1]);
        break;
      default:
        densityNum = Utils.randomInt(densityObj["sparse"][0], densityObj["crowded"][1]);
        densityString = Object.keys(densityObj).find((key) => {
          const arr = densityObj[key];
          if (densityNum >= arr[0] && densityNum <= arr[1]) {
            return key;
          }
          return false;
        });
        break;
    }

    return {
      string: densityString,
      int: densityNum,
    };
  }

  buildSettlements(kingdom) {
    const kingdomPop = kingdom.population.total;
    const cityObj = this.buildCities(kingdom);
    const townObj = this.buildTowns(cityObj, kingdom);

    let urbanPopTotal = cityObj.totalCityPop + townObj.totalTownPop;

    return {
      cityInfo: cityObj,
      townInfo: townObj,
      urbanPopulation: {
        total: Math.round(urbanPopTotal),
        percentage: ((urbanPopTotal / kingdomPop) * 100).toFixed(1),
      },
    };
  }

  buildCities(kingdom) {
    // The largest city in the kingdom (the capital most of the time) has a population of the square root of the country's population multiplied by a random number between 40 and 60.
    // Example: France in 1360 CE had 13.4 million people, while Paris had between 200k and 260k residents. This puts the math at sqrt(13400000) * 62 = 230,000. We'll drop out multiplier, since generating metropolises is a cpu heavy process.
    // We are aiming for an urban population for between 10% and 20%, which was the projected range of England in 12th and 13th centuries.

    const kingdomPop = kingdom.population.total;
    const { culture } = kingdom;
    const multipliers = {
      min: 12,
      max: 25,
    };

    // To get the starting city population we create a percentage between 0.8% and 2.25%.
    const largestCityPercentage = Utils.randomInt(multipliers.min, multipliers.max) / 1000;
    let cityPop = Math.round(kingdomPop * largestCityPercentage);

    // to bring down build times and stop a large state (ie. 19M pop) from having 2+ cities of 200k or more, drop the largest possible cityPop to a random number between 100k and 160k.
    if (cityPop > 160000) cityPop = Utils.randomInt(100000, 160000);

    let cityArray = [];
    let totalUrban = 0;
    let scaleIndex = 0;

    const scaling = [
      [35, 80],
      [50, 80],
    ];

    while (cityPop > 8000) {
      const city = new City({
        population: Math.round(cityPop),
        culture: culture,
        lightWeight: true,
      });

      cityArray.push(city);
      const min = scaling[scaleIndex][0];
      const max = scaling[scaleIndex][1];
      const scaleMod = Utils.randomInt(min, max) / 100;

      totalUrban += city.population.total;
      cityPop = cityPop * scaleMod;
      if (scaleIndex < 1) scaleIndex = 1;
    }

    // Give every kingdom at least one city. It might not be super historically accurate in terms of size, but it's an RPG generator. You need at least 1 urban center.
    if (cityArray.length <= 0) {
      const {
        sizes: { city },
      } = cityDataObj;

      const newCity = new City({
        size: "city",
        // make sure that in the off chance you get a country with a population of less than 50k, force the city population to be smaller so you don't have a country with 130% urban population...
        population: city[1] > kingdomPop / 2 ? Math.round(kingdomPop / (3 + Math.random())) : null,
        culture: culture,
        lightWeight: true,
      });
      cityArray = [newCity];
      totalUrban += newCity.population.total;
    }

    return {
      count: cityArray.length,
      cities: cityArray,
      totalCityPop: totalUrban,
    };
  }

  buildTowns(cityObj, kingdom) {
    // We are aiming for an urban population for between 10% and 20%, which was the projected range of England in 12th and 13th centuries.
    // To do this, we to know the total population in the major cities.

    const kingdomPop = kingdom.population.total;
    const culture = kingdom.culture;
    let estimatePop = false;
    let realTownNum = 0;

    // We'll get a 2 digit % (ie. 14.93%) to use in our overall math.
    const percentUrban = Utils.randomInt(1000, 2000) / 100;
    const avgTownSize = (cityDataObj.sizes.town[0] + cityDataObj.sizes.town[1]) / 2;

    const cityPercentUrban = (cityObj.totalCityPop / kingdomPop) * 100;
    const townFillPercent = percentUrban - cityPercentUrban;
    let townNum = Math.floor((kingdomPop * (townFillPercent / 100)) / avgTownSize);

    // due to the random city generation, it is possible for small kingdoms to have negative towns. If that's the case, for the sake of RPGness, we force the kingdom to have 3 towns.
    if (townNum < 3) townNum = 3;

    // Large kingdoms can have hundreds of towns, and it bogged down generation time greatly. So, if we have more than 20 towns, build 20 and simply set the town pop number to an estimate.
    // ie. the Kingdom of Janów was generated with 967 towns to have it meet 11.3% urbanization of a population of 24.4 million! This cause a build time of nearly 30s...
    if (townNum > 21) {
      realTownNum = townNum;
      townNum = 21;
      estimatePop = true;
    }

    let totalTownsfolk = 0;

    // const townNum = (cityObj.count || 1) * Utils.randomInt( 6, 12 );
    let towns = Array.from({ length: townNum }, () => {
      const town = new City({
        size: "town",
        culture: culture,
        lightWeight: true,
      });

      totalTownsfolk += town.population.total;
      return town;
    });

    if (estimatePop) {
      totalTownsfolk = kingdomPop * (townFillPercent / 100);
      townNum = realTownNum;
    }

    // As towns are generated randomly, they do not appear in descending population order. We need to order them alphabetically instead.
    towns = towns.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    return {
      count: townNum,
      towns: towns,
      totalTownPop: totalTownsfolk,
    };
  }

  getKingdomDenfenses() {
    const { population, age } = this;

    const totalActive = Math.round(population.total / 50000);
    const totalRuined = Math.round((population.total / 5000000) * Math.sqrt(age));

    return {
      activeCastles: this.getActiveCastles(totalActive),
      ruinedCastles: this.getRuinedCastles(totalRuined),
    };
  }

  getActiveCastles(total) {
    const { age, culture } = this;
    const borderKeepMod = 0.25;
    const borderKeepTotal = Math.round(total * borderKeepMod);
    const civilKeepTotal = total - borderKeepTotal;

    const borderCastleBuildCount = borderKeepTotal > 4 ? 4 : borderKeepTotal;
    const civilCastleBuildCount = civilKeepTotal > 6 ? 6 : civilKeepTotal;

    const borderKeeps = new Array(borderCastleBuildCount).fill(undefined).map(() => {
      return new Castle({ culture: culture, maxAge: age });
    });

    const civilKeeps = new Array(civilCastleBuildCount).fill(undefined).map(() => {
      return new Castle({ culture: culture, maxAge: age });
    });

    return {
      total: total,
      borderKeeps: {
        total: borderKeepTotal,
        castleArray: borderKeeps,
      },
      civilKeeps: {
        total: civilKeepTotal,
        castleArray: civilKeeps,
      },
    };
  }

  getRuinedCastles(total) {
    const { age, culture } = this;
    const count = total > 6 ? 6 : total;

    const borderKeeps = new Array(count).fill(undefined).map(() => {
      return new Castle({ ruin: true, culture: culture, maxAge: age });
    });

    return {
      total: total,
      castleArray: borderKeeps,
    };
  }

  getGovernmentInfo() {
    const {
      numberOfRulers,
      rulingClass,
      legitimacy,
      methodOfControl,
      singleRulers,
      multipleRulers,
      internalStrife,
      recentEvent,
      historicalCrisis,
      cultureTags,
    } = governmentData;

    // ruler count
    const rulerCheck = Utils.generateValueFromOdds(numberOfRulers);
    let rulerCount = 1;

    if (numberOfRulers[rulerCheck].hasOwnProperty("diceNum")) {
      let { diceNum, diceType } = numberOfRulers[rulerCheck];
      rulerCount = Utils.rollDice(diceNum, diceType);
    }

    const govRulers = Utils.generateValueFromOdds(rulingClass);
    const govLegitimacy = Utils.generateValueFromOdds(legitimacy);
    const govControl = Utils.generateValueFromOdds(methodOfControl);
    const govStrife = Utils.generateValueFromOdds(internalStrife);
    const govEvent = Utils.generateValueFromOdds(recentEvent);
    const govCrisis = Utils.generateValueFromOdds(historicalCrisis);
    let cultureArray = new Array(Utils.randomInt(2, 4)).fill(undefined);
    cultureArray = cultureArray.map(() => Utils.generateValueFromOdds(cultureTags));

    let ruler = undefined;
    if (rulerCount === 1) {
      ruler = Utils.generateValueFromOdds(singleRulers);
    } else {
      ruler = Utils.generateValueFromOdds(multipleRulers);
    }

    return {
      ruler,
      rulerCount,
      govRulers,
      govLegitimacy,
      govControl,
      govStrife,
      govEvent,
      govCrisis,
      cultureArray,
    };
  }
}

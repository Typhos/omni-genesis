import Utils from "components/utils";

import placeNames from "data/names/randomPlaceNames";
import governments from "data/governments";
import stateSizes from "data/kingdoms/sizes";
import City from "components/generators/cities";

export default class Kingdom {

  constructor (params = {}) {
    if (params.seed) {
      Math.seed = params.seed;
    } else if ( Math.seed === undefined ) { 
      Utils.setNewSeed();
    }

    this.inputs = {...params};

    this.seed = params.seed || Math.seed;
    this.density = this.getRandomDensity(params.density);
    this.area = this.getRandomArea(params.size, this.density);
    this.population = this.getRandomPopulation(this.area, this.density.int);
    this.age = params.age || this.getRandomAge();

    this.cities = this.buildCities(this.population);
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

    const stateSizesKeys = Object.keys(stateSizes);
    
    if (!sizeParam) sizeParam = stateSizesKeys[ Utils.randomArrayIndex(stateSizesKeys.length) ];

    const sqMiles = Utils.randomInt(stateSizes[sizeParam][0],  stateSizes[sizeParam][1]);
    const land = landUse(sqMiles);

    return {
      "relative": sizeParam,
      "sqMiles": sqMiles,
      "arable": land.arable,
      "wilderness": land.wilderness
    }

    function landUse(totalArea) {
      const densityStr = densityObj.string;
      const landUsageObj = {
        "sparse": [11,22],
        "low": [23,34],
        "average": [35,46],
        "high": [47,58],
        "crowded": [59,70]
      }

      const min = landUsageObj[densityStr][0];
      const max = landUsageObj[densityStr][1];

      const result = Utils.randomInt( min, max );

      return {
        arable: sqMiles - result,
        arablePercent: 100 - result,
        wilderness: sqMiles - (sqMiles - result),
        wildernessPercent: 100 - (100 - result)
      }      
    }
  }

  getRandomPopulation(area, density) {
    return area.sqMiles * density;
  }

  getRandomDensity(densityGroup) {
    // Math for random density is 6d4x5 or a random number from 30 to 110 people per sq mile
    let densityString = "";
    let densityNum = 0;

    const densityObj = {
      "sparse": [15,35],
      "low": [36,50],
      "average": [51,65],
      "high": [66,80],
      "crowded": [81,99]
    }

    switch(densityGroup) {
      case "Sparse":
        densityString = "sparse";
        densityNum = Utils.randomInt( densityObj[densityString][0], densityObj[densityString][1] );
        break;
      case "Low":
        densityString = "low";
        densityNum =  Utils.randomInt( densityObj[densityString][0], densityObj[densityString][1] );
        break;
      case "Average":
        densityString = "average";
        densityNum =  Utils.randomInt( densityObj[densityString][0], densityObj[densityString][1] );
        break;
      case "High":
        densityString = "high";
        densityNum =  Utils.randomInt( densityObj[densityString][0], densityObj[densityString][1] );
        break;
      case "Crowded":
        densityString = "crowded";
        densityNum =  Utils.randomInt( densityObj[densityString][0], densityObj[densityString][1] );
        break;
      default:
        densityNum =  Utils.randomInt( densityObj["sparse"][0], densityObj["crowded"][1] );
        densityString = Object.keys(densityObj).find( key => {
          const arr = densityObj[key];
          if ( densityNum >= arr[0] && densityNum <= arr[1] ) {
            return key;
          }
        });
        break;
    }

    return {
      "string": densityString,
      "int": densityNum
    }
  }

  buildCities(kingdomPop) {
    // The largest city in the kingdom (the capital most of the time) has a population of square root of the country's population * a random number equal to 2d4+10 or 12 to 18.
    let cityPop = Math.round( Math.sqrt(kingdomPop) * Utils.randomInt(12,18) );
    let cityArray = [];
    let scaleIndex = 0;
    const scaling = [
      [20,80],
      [10,40]
    ];

    while ( cityPop > 4000 ) {
      cityArray.push(new City({"population": Math.round(cityPop) }));

      const min = scaling[scaleIndex][0];
      const max = scaling[scaleIndex][1];
      const scaleMod = Utils.randomInt(min, max) / 100;

      cityPop = cityPop * scaleMod;
      if ( scaleIndex < 1 ) scaleIndex = 1;
    }


    return {
      cities: cityArray
    }
  }

}
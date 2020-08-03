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

    console.log(params)

    this.seed = params.seed || Math.seed;
    this.area = this.getRandomArea(params.size);
    this.age = params.age || this.getRandomAge();
    this.density = params.density || this.getRandomDensity();
    this.population = this.getRandomPopulation(this.area, this.density);

    this.cities = this.buildCities(this.population);
  }

  getRandomAge() {
    // country age can be anywhere from 50 years to 1000 years.

    return Utils.randomInt(50, 1000);
  }

  getRandomArea(size) {
    // Get a random area for the state. 
    // Small states might be the size of Luxembourg @ 1k sq miles
    // Mid-sized state could be Belgium, Switzerland or the Netherlands @ 16k sq miles
    // Large state could be like France or Italy @ 110k-250k miles

    const stateSizesKeys = Object.keys(stateSizes);
    const sizeGroup = stateSizesKeys[size] || stateSizesKeys[ Utils.randomArrayIndex(stateSizesKeys.length) ];
    const sqMiles = Utils.randomInt(stateSizes[sizeGroup][0],  stateSizes[sizeGroup][1]);

    return {
      "relative": sizeGroup,
      "sqMiles": sqMiles
    }
  }

  getRandomPopulation(area, density) {
    return area.sqMiles * density;
  }

  getRandomDensity(densityGroup) {
    // Math for random density is 6d4x5 or a random number from 30 to 110 people per sq mile

    switch(densityGroup) {
      case "Spare":
        return Utils.randomInt(30,45);
      case "Low":
        return Utils.randomInt(46,60);
      case "Average":
        return Utils.randomInt(61,75);
      case "High":
        return Utils.randomInt(76,100);
      case "Magical":
        return Utils.randomInt(100,115);
      default:
        return Utils.randomInt(30, 110);
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
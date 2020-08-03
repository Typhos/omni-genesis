import Utils from "components/utils";

import placeNames from "data/names/randomPlaceNames";
import governments from "data/governments";
import stateSizes from "data/states/kingdoms";

export default class Kingdom {

  constructor (params = {}) {
    if (params.seed) {
      Math.seed = params.seed;
    } else if ( Math.seed === undefined ) { 
      Utils.setNewSeed();
    }

    this.seed = params.seed || Math.seed;
    this.population = params.population || this.getRandomPopulation();
    this.area = params.area || this.getRandomArea();
    this.age = params.age || this.getRandomAge();
    this.density = params.density || this.getRandomDensity();    
  }

  getRandomAge() {

  }

  getRandomArea() {
    // Get a random area for the state. 
    // Small states might be the size of Luxembourg @ 1k sq miles
    // Mid-sized state could be Belgium, Switzerland or the Netherlands @ 16k sq miles
    // Large state could be like France or Italy @ 110k-250k miles

    const stateSizesKeys = Object.keys(stateSizes);
    const sizeGroup = stateSizesKeys[ Utils.randomArrayIndex(stateSizesKeys.length) ];
    const sqMiles = stateSizes[sizeGroup][ Utils.randomArrayIndex( stateSizes[sizeGroup].length ) ];

    return {
      "relative": sizeGroup,
      "sqMiles": sqMiles
    }
  }

  getRandomPopulation() {

  }

  getRandomDensity() {
    // Largest city is the square root of the country's population times a random dice roll.

  }

}
import Utils from "components/utils";
import Person from "components/generators/person";

import ShopData from "data/shops";
import TavernData from "data/taverns";
import RaceData from "data/races";

const allShops = {...ShopData, ...TavernData};

export default class ShopGen {

  constructor ( options = {} ) {
    if ( Math.seed === undefined ) { 
      Utils.setNewSeed();
    }

    this.shopType = options.type || this.getShopType();
    this.owner = this.getOwner( options );
    this.name = this.getName(options);
    this.size = this.getSize(options);
    this.atmosphere = this.getAtmosphere(options);
  }

  getShopType () {
    let type = Object.keys(allShops);
    type = type[ Utils.randomArrayIndex(0, type.length) ]

    return type;
  }

  getOwner (options) {
    return new Person({
      "race": options.owner,
      "occupation": allShops[this.shopType].owner
    });

  }

  getName (options) {
    let adjective = allShops[this.shopType].adjective;
    adjective = adjective[ Utils.randomArrayIndex(0, adjective.length) ];

    let noun = allShops[this.shopType].noun;
    noun = noun[ Utils.randomArrayIndex(0, noun.length )];

    let title = allShops[this.shopType].title;
    title = title[ Utils.randomArrayIndex(0, title.length)];

    return `${adjective} ${noun} ${title}`;
  }

  getSize(options) {
    let size = allShops[this.shopType].size || ["cramped","roomy","spacious"];
    if ( !Array.isArray(size) ) {
      size = Object.keys( size );
    }

    return size[ Utils.randomArrayIndex(0, size.length) ];
  }

  getAtmosphere(options) {
    let atmosphere = allShops[this.shopType].atmosphere || ["dirty", "colorful", "beautiful", "opulent", "dingy"];
    if ( !Array.isArray(atmosphere) ) {
      atmosphere = Object.keys( atmosphere );
    }

    return atmosphere[ Utils.randomArrayIndex(0, atmosphere.length) ];
  }

}
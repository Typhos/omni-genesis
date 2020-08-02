import Utils from "components/utils";
import MerchantGenerator from "components/generators/merchants/merchantGenerator";
import Person from "components/generators/person/person";
import Noble from "components/generators/person/noble";

import cityObj from "data/cities/cities";
import merchantsObj from "data/merchants/merchants";
import tavernsObj from "data/merchants/taverns";
import pantheons from "data/gods/pantheons";
import placeNames from "data/names/randomPlaceNames";
import governments from "data/governments";

const allShops = {...merchantsObj, ...tavernsObj};

export default class CityGenerator {

  constructor (options) {
    if (options.seed) {
      Math.seed = options.seed;
    } else if ( Math.seed === undefined ) { 
      Utils.setNewSeed();
    }

    console.log(options.seed);

    this.seed = options.seed || Math.seed;
    this.pantheon = pantheons[options.pantheon];
    this.type = options.type || this.randomCityType();
    this.name = options.name || this.getCityName();
    this.population = this.getPopulation(options);
    this.economy = this.getEconomy();
    this.guards = this.getGuards();
    this.government = this.formGovernment(options);
    this.religion = this.getReligionInfo();
    this.houses = this.getHouseArchitecture();
  }

  randomCityType() {
    const sizes = Object.keys(cityObj.sizes);

    return sizes[Utils.randomArrayIndex( sizes.length)];
  }

  // +++ START OF NAME FUNCTIONS

  getCityName() {
    const buildOptions = {
      "person": 1,
      "founded": 1,
      // "word": 3,
      // "noName": 1,
      "suffix": 3,
      "random": 3
    };

    let arr = [];

    for (let [key, value] of Object.entries(buildOptions) ) {
      for( let i = 1; i <= value; i++ ) {
        arr.push(key);
      }
    }

    const namingChoice = arr[Utils.randomArrayIndex(arr.length)];

    switch (namingChoice) {
      case ("person"):
        return this.getPersonBasedName(false);
        break;
      case ("founded"):
        return this.getPersonBasedName(true);
        break;
      case ("word"):
        return "w";
        break;
      case ("noName"):
        return "n";
        break;
      case ("suffix"):
        return this.getSuffixName();
        break;
      default:
        return this.getRandomizedName();
        break;
    }
  }

  getRandomizedName() {
    let name =  placeNames.s1[ Utils.randomArrayIndex(placeNames.s1.length) ];

    if ( Utils.randomInt(1, 2) === 1 ) name += placeNames.vowel[Utils.randomArrayIndex(placeNames.vowel.length)];

    // if name ends in a vowel, use the consonant endings
    if ( (/[aeiouy]$/).test(name) ) {
      name = name.concat( placeNames.ec[ Utils.randomArrayIndex(placeNames.ec.length) ]);
    } else {
      for( let i = Utils.randomInt(0, 1); i > 0; i-- ) {
        name = name.concat( placeNames.s2[ Utils.randomArrayIndex(placeNames.s2.length) ]);
      }

      name = name.concat( placeNames.ev[ Utils.randomArrayIndex(placeNames.ev.length) ]);
    }
    
    return name;
  }

  getSuffixName() {
    const name = this.getRandomizedName();
    const ending = placeNames.suffix[ Utils.randomArrayIndex( placeNames.suffix.length ) ];
    return name.concat(ending);
  }

  getPersonBasedName(possessive) {
    const locArray = Object.keys(placeNames.locations)
    const locations = locArray[ Utils.randomArrayIndex(locArray.length) ];
    const ending = placeNames.locations[locations][ Utils.randomArrayIndex(placeNames.locations[locations].length) ];

    let name = (Utils.randomInt(1,2)) ? new Noble({race: "human", batch: true}).name.name : new Noble({race: "human", batch: true}).name.house;

    function owned(name) {
      if ( /s$/gi.test(name) ) {
        return "'";
      } else {
        return "'s";
      }
    }

    if (possessive) {
      return `${name}${owned(name)} ${ending}`;  
    } else {
      return name;
    }
    
  }

  // +++ END OF NAME FUNCTIONS

  getPopulation() {
    const size = cityObj.sizes[this.type];
    const totalPop = Utils.randomInt( size[0], size[1] );

    return {
      "total": totalPop,
      "nobleHouses": this.getNobleHouses(totalPop),
      "races": this.getRacialBreakdown(totalPop)
    }
  }

  getRacialBreakdown(totalPop) {
    const racialObj = {};
    let arr = new Array(totalPop).fill(undefined).map( x => {
      return new Person({batch: true}).race;
    }).forEach( p => {
      if ( !racialObj[p] ) {
        racialObj[p] = 1;
      } else {
        racialObj[p] += 1;
      }
    });

    return racialObj;
  }

  getEconomy () {
    const cityType = this.type;

    function economyWording () {
      const bDesr = [
        "weak",
        "stable",
        "strong"
      ];

      const future = [
        "declining rapidly",
        "slowly declining",
        "stable",
        "slowly growing",
        "growing rapidly"
      ];

      const baseNum = Utils.randomArrayIndex( bDesr.length);
      const futureNum = Utils.randomArrayIndex( future.length);

      const futureDescription = function() {
        if ( baseNum === 1 && futureNum === 2 ) {
          return  "";
        } else if ( baseNum < 1 ) {
          // bad economy
          if ( futureNum < 2 ) {
            // declining
            return `and ${future[futureNum]}`;
          } else if ( futureNum >= 2 ) {
            // growing
            return `but ${future[futureNum]}`;
          }
        } else if ( baseNum >= 1 ) {
          // good economy
          if ( futureNum < 2 ) {
            // declining
            return `but ${future[futureNum]}`;
          } else if ( futureNum >= 2 ) {
            // growing
            return `and ${future[futureNum]}`;
          }          
        }
      }

      return `${bDesr[baseNum]} ${futureDescription()}`;
    }

    function getPrimaryEconomy () {
      const econ = cityObj.economy[cityType].main;
      return econ[ Utils.randomArrayIndex( econ.length) ];
    }

    return {
      description: economyWording(),
      primary: getPrimaryEconomy(),
      merchants: this.getMerchants(),
      crime: this.getCrimerate()
    }
  }

  getCrimerate() {
    const crimerateDescription = [
      "nonexistent",
      "low",
      "average",
      "high",
      "pervasive"
    ];
    const index = Utils.randomArrayIndex( crimerateDescription.length);

    return crimerateDescription[index];
  }

  getMerchants() {
    const economyObj = cityObj.economy[this.type];
    const svDifferences = economyObj.svDiff || {};
    const merchants = {
      tradesTotal: 0,
      shopsTotal: 0,
      tradesArray: [],
      shops: []
    };

    const pop = this.population.total;

    for ( let [key, value] of Object.entries(allShops) ) {

      // make the Support Vale (SV) a bit variable so that not every city has the same results
      // if the city-type has a modified SV list (ie. castle-towns) grab those first

      const percentageModifier =  1 + ( Utils.randomInt(-1,10) / 10 )
      const SV = (svDifferences[key] || value.SV) * percentageModifier;

      // number of guaranteed shops is equal to the population divided by the Support Value
      let guaranteedShops = Math.floor(pop/SV);

      // the remainder from the guaranteed shops becomes a % chance to have another.
      const percentageChance = parseInt( ( pop/SV - guaranteedShops ) * 100 );
      const bonus = Utils.randomInt(1,100) < percentageChance;

      const totalShops =  bonus ? guaranteedShops + 1 : guaranteedShops;

      const shopTitle = allShops[key].establishments ? allShops[key].establishments : allShops[key].plural;
      merchants.tradesArray[shopTitle] = totalShops;
      merchants.tradesTotal += totalShops;

      if ( totalShops > 0 ) {
        merchants.shops[shopTitle] = new Array(totalShops).fill(undefined).map( x => {

          // Only build shops with the option turned on.
          // A mason isn't going to have a storefront.
          if ( allShops[key].buildShop ) {
            merchants.shopsTotal += 1;
            return new MerchantGenerator({
              type: key
            });
          }
        }).filter( e => e !== undefined );

        if ( merchants.shops[shopTitle].length <= 0 ) delete merchants.shops[shopTitle];
      }
    }

    return merchants;
  }

  getGuards() {
    // A well-kept medieval city will have 1 law officer (guard, watchman, etc.) for every 150 citizens. Slack cities will have fewer. A few rare cities have more.

    const pop = this.population.total;
    const guardMod = 1 + ( Utils.randomInt(-1,5) / 10 );
    const guardRatio = 150 * guardMod;
    const guardTotal = Math.floor( pop / guardRatio );

    // A hamlet, village, castle-town or town would have a militia pulled from its population.
    // This number would be mostly men IRL, but in a fantasy world where we want to avoid sexism, let's just say it's of willing members from both sexes but still 50% baseline.
    // This 50% is then modified by those age range of the city, since children and the elderly are not drafted into the levy. 20% of the population are children and 10-20% are elderly. This means the levy is between 30-35% of the total population.

    const randomlyLevy = Math.round( pop * ( 0.5 * ( Utils.randomInt(30,35) / 100 ) ) );

    return {
      count: guardTotal,
      militiaLevy: randomlyLevy
    };
  }

  formGovernment(options) {
    // If there is a national government system (feudal, magocracy, etc) that needs to play out locally as well. This doesn't mean every place has that same type of rule, but it's more common.
    // if ( options.nationalGov ) 

    // First we have to look at the size of the city. If the population is 30 people, it's probably not run by a council of mages (probably).
    // Next, we take into consideration if there is a national governing system. If there is one, it has an out-sized influence on the local systems.
    // If there is no national system provided (or a one-off city) we pick at random. A government is determined a combination of ethnics and authority.

    // Either an authority is chosen from the 4 options (Democracy, Oligarchy, Despotic or Imperial) or chosen at random.
    const authority = options.authority;

    const availableGovernments = Object.keys(governments).map( gov => {
      if ( governments[gov].availableTo.includes( this.type ) ) {
        if ( !authority || governments[gov].authority === authority ) {
          return gov;
        }
      }
      return undefined;
    }).filter( e => e !== undefined );

    const selected = availableGovernments[ Utils.randomArrayIndex(availableGovernments.length) ];

    return {
      details: governments[selected],
      leader: new Noble(),
      corruption: this.getCrimerate()
    }
  }

  getNobleHouses(totalPop) {
    // it requires about 200 people to support a noble house. This is modified by the standard 4d4-6 roll.
    const percentageModifier =  1 + ( Utils.randomInt(-2,14) / 10 )
    const SV = 200 * percentageModifier;

    // number of guaranteed shops is equal to the population divided by the Support Value
    let baselineNobleHouses = Math.floor(totalPop/SV);

    // the remainder from the guaranteed shops becomes a % chance to have another.
    const percentageChance = parseInt( ( totalPop/SV - baselineNobleHouses ) * 100 );
    const bonusHouse = Utils.randomInt(1,100) < percentageChance ? 1 : 0;

    const totalHouses = baselineNobleHouses + bonusHouse;

    // TODO - Make this generate people instead of simple names.
    // Titles for newgen people can be based on city size. enforced nobility w/ X title to ensure house names.

    function houseNames() {
      // const houses = [...nobleHouses.nobleHouses];
      const limit = totalHouses > 12 ? 12 : totalHouses;

      return new Array(limit).fill(undefined).map(x => {
        let noble = new Noble();
        return noble.name.house || noble.name.clan || noble.name.surname;
      });

    }

    return {
      number: totalHouses,
      limited: totalHouses > 12 ? true : false,
      names: houseNames()
    }
  }

  getReligionInfo() {
    // Places of worship are tricky. The more faiths, the more temples. First we need to determine how many different faiths / gods a town has. Next, determine how much of the population is associated with each religion / cult.
    // In a polytheistic society, most people worship multiple gods for different purposes or at different times of the year. As such 

    // In Centhris, there are 18 major gods and numerous minor (at the time of this code, 8 minor deities are in the database). [http://centhris.herokuapp.com/pantheon/Centhrian-Pantheon]
    // In Faerun, there are 48 gods (per the wiki. also, geez...) in the 5e pantheon. [https://forgottenrealms.fandom.com/wiki/Faer%C3%BBnian_pantheon]
    
    // Generally it takes 400 people to warrant a temple to a deity (irl churches). It takes ~150 to warrant a shrine.
    // If we assume the average person might worship 4 deities from the pantheon for various reasons, that's 4*population for shrine count. However, the temple count doesn't change, since you can't attend more than 1 temple service at a time.
    const pantheon = this.pantheon;
    const pop = this.population.total;
    const shrineSV = 100;
    const templeSV = 400;

    const religiousityMod =  1 + ( Utils.randomInt(-1,10) / 10 )

    let shrineCount = Math.floor(pop * 3 / (shrineSV * religiousityMod) );
    let templeCount = Math.floor(pop / (templeSV * religiousityMod));

    const percentageChance = parseInt( ( pop/templeSV - templeCount ) * 100 );
    const bonus = Utils.randomInt(1,100) < percentageChance;

    templeCount =  bonus ? templeCount + 1 : templeCount;

    function templesOfWhichGods() {
      // major gods are twice as likely as lesser gods, so we'll build an array of both, but have 2 of each major in the array.
      // multiple temples of the same god are fine. There are lot of churches in Rome!

      const output = {};
      let godsArr = [
        ...pantheon.major.list,
        ...pantheon.major.list,
        ...pantheon.minor.list
      ].sort();

      new Array(templeCount).fill(undefined).map(x => {
        const name = godsArr[ Utils.randomArrayIndex(godsArr.length) ];

        return name;
      }).forEach( temple => {
        if ( !output[temple] ) {
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
      let godsArr = [
        ...pantheon.major.list,
        ...pantheon.major.list,
        ...pantheon.minor.list
      ].sort();

      new Array(shrineCount).fill(undefined).map(x => {
        const name = godsArr[ Utils.randomArrayIndex(godsArr.length) ];

        return name;
      }).forEach( shrine => {
        if ( !output[shrine] ) {
          output[shrine] = 1;
        } else {
          output[shrine] += 1;
        }
      });

      return output;
    }

    return {
      temples: {
        count: templeCount,
        breakdown: templesOfWhichGods()
      },
      shrines: {
        count: shrineCount,
        breakdown: shrinesToWhichGods()
      }
    }
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
    ]

    let roofStr = roofs[Utils.randomArrayIndex(roofs.length)];
    let wallStr = walls[Utils.randomArrayIndex(walls.length)];

    return `${wallStr} & ${roofStr}`;
  }

}
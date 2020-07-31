import Utils from "components/utils";
import MerchantGenerator from "components/generators/merchants/merchantGenerator";

import cityObj from "data/cities/cities";
import merchantsObj from "data/merchants/merchants";
import tavernsObj from "data/merchants/taverns";
import nobleHouses from "data/people/nobleHouses";

const allShops = {...merchantsObj, ...tavernsObj};

export default class CityGenerator {

  constructor (options) {
    if (options.seed) {
      Math.seed = options.seed;
    } else if ( Math.seed === undefined ) { 
      Utils.setNewSeed();
    }

    this.seed = options.seed || Math.seed;
    this.type = options.type || this.randomCityType();
    this.name = options.name || this.getName();
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

  getPopulation() {
    const size = cityObj.sizes[this.type];
    const totalPop = Utils.randomInt( size[0], size[1] );

    return {
      "total": totalPop,
      "nobleHouses": this.getNobleHouses(totalPop)
    }
  }

  getName() {
    return "Greenrock";
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
      tradesArray: [],
      stores: []
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

      if ( totalShops > 0 ) {
        merchants.stores[key] = new Array(totalShops).fill(undefined).map( x => {
          
          // Full out all name arrays before turning this back on
          if ( allShops[key].noun ) {
            return new MerchantGenerator({
              type: key
            });
          }
        }).filter( e => e !== undefined );

        if ( merchants.stores[key].length <= 0 ) delete merchants.stores[key];
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

    return {
      type: "Feudal Lord",
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

    // TODO - Make this generate people with a title based on city size. enforced nobility w/ X title to ensure house names.
    function houseNames() {
      let houses = [...nobleHouses.nobleHouses];

      return new Array(totalHouses).fill(undefined).map( x => {
        let index = Utils.randomArrayIndex( houses.length);
        return houses[index];

        // splice out result to ensure no duplicate house names in a city.
        houses.splice(index, 1);
      });
    }

    return {
      number: totalHouses,
      names: houseNames()
    }
  }

  getReligionInfo() {
    // Places of worship are tricky. The more faiths, the more temples. First we need to determine how many different faiths / gods a town has. Next, determine how much of the population is associated with each religion / cult.
    // In a polytheistic society, most people worship multiple gods for different purposes or at different times of the year. As such 

    // In Centhris, there are 18 major gods and numerous minor (at the time of this code, 8 minor deities are in the database). [http://centhris.herokuapp.com/pantheon/Centhrian-Pantheon]
    // In Faerun, there are 48 gods (per the wiki. also, geez...) in the 5e pantheon. [https://forgottenrealms.fandom.com/wiki/Faer%C3%BBnian_pantheon]
    
    // Generally it takes 400 people to warrant a temple to a deity (irl churches). It takes 100 to warrant a shrine.
    // If we assume the average person might worship 4 deities from the pantheon for various reasons, that's 4*population for shrine count. However, the temple count doesn't change, since you can't attend more than 1 temple service at a time.

    const pop = this.population.total;
    const shrineSV = 100;
    const templeSV = 400;

    let shrineCount = Math.floor(pop * 4 / shrineSV);
    let templeCount = Math.floor(pop / templeSV);

    const percentageChance = parseInt( ( pop/templeSV - templeCount ) * 100 );
    const bonus = Utils.randomInt(1,100) < percentageChance;

    templeCount =  bonus ? templeCount + 1 : templeCount;

    return {
      temples: {
        count: templeCount
      },
      shrines: {
        count: shrineCount,
        breakdown: {
          "Guardian": 2,
          "Master": 1
        }
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

    console.log(Utils.randomArrayIndex(roofs))

    return `${wallStr} & ${roofStr}`;
  }

}
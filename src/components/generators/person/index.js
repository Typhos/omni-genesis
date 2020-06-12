import Utils from "components/utils";

import Races from "data/races";
import Professions from "data/professions";

export default class Person {

  constructor ( options = {} ) {
    if ( Math.seed === undefined ) { 
      Utils.setNewSeed();
    }

    this.race = options.race || this.getRace(options);
    this.sex = options.sex || this.getSex();
    this.name = options.name || this.getName(options);    
    this.age = options.age || this.getAge(options);
    this.ageGroup = this.getAgeGroup(this.age);
    this.alignment = this.getAlignment(options);

    this.jobGroup = options.jobGroup || this.getJobGroup(options);
    this.occupation = options.occupation || this.getOccupation(options);
    this.checkJobVerbage();
    
  }

  getRace(options) {
    const racesArray = Object.keys(Races);
    const weightedArray = [];

    racesArray.map( race => {
      const weight = Races[race].rarity;
      for ( let i = 1; i <= weight; i++ ) {
        weightedArray.push(race);
      }
    });

    return weightedArray[ Utils.randomArrayIndex(0, weightedArray.length) ];
  }

  getSex() {
    const sex = ["male","female"];
    return sex[Utils.randomArrayIndex(0, sex.length)];
  }

  getName() {
    let name;
    let nameOptions = Races[this.race].names;
    let firstName = nameOptions.first[this.sex][ Utils.randomArrayIndex(0, nameOptions.first[this.sex].length) ];
    let lastName = "";
    
    if (this.race === "gnome") {
      let gnomeName = new Array(Utils.randomInt(1,2)).fill(undefined);

      // remove previous name used so names can't be "Bob Bob Bob Jones"
      let gnomeOptions = nameOptions.first[this.sex].filter( name => name !== firstName);

      gnomeName = gnomeName.map( x => {
        let n = gnomeOptions[ Utils.randomArrayIndex(0, gnomeOptions.length) ];
        gnomeOptions = gnomeOptions.filter( name => name !== n);

        return n;
      });

      firstName = `${firstName} ${gnomeName.join(" ")}`
    }

    if (nameOptions.last) {
      lastName = nameOptions.last[ Utils.randomArrayIndex(0, nameOptions.last.length) ];
    }    

    name = (!lastName) ? `${firstName}` : `${firstName} ${lastName}`;

    return name;
  }

  getAge(options) {
    let age;
    const lifespan = Races[this.race].lifespan;
    const childNum = lifespan / 6 - 1;
    const youthNum = lifespan / 4;

    if ( options.child ) {
      age = Utils.randomInt(0, childNum);

      if ( age === 0 ) age = "newborn";

    } else if ( options.elderly ) {
      const old = lifespan - lifespan/4;
      const max = lifespan + lifespan/6;

      age = Utils.randomInt(old, max);
    } else {
      age = Utils.randomInt(youthNum, lifespan - lifespan/10);
    }

    return age;
  }

  getAgeGroup(age) {
    let lifespan = Races[this.race].lifespan;
    let childNum = lifespan / 6 - 1;
    let youthNum = lifespan / 4;
    let elderNum = lifespan - lifespan / 4;

    if ( age <= childNum ) {
      return "Child";
    } else if ( age <= youthNum) {
      return "Youth";
    } else if ( age >= elderNum ) {
      return "Elder";
    } else {
      return "Adult";
    }
  }

  getJobGroup(options) {
    const allJobs = Object.keys(Professions.jobs);
    return allJobs[ Utils.randomArrayIndex(0, allJobs.length) ];
  }

  getOccupation(options){
    // What? You can just "get a job?". This really is a fantasy world.
    const allJobs = Object.keys(Professions.jobs);
    const jobGroup = this.jobGroup;
    let job;

    if ( jobGroup === "adventurer") {
      const classes = Object.keys(Professions.jobs[jobGroup]);
      job = classes[ Utils.randomArrayIndex(0, classes.length) ];
    } else if ( Array.isArray(Professions.jobs[jobGroup].list) ) {
      job = Professions.jobs[jobGroup].list;
      job = job[ Utils.randomArrayIndex(0, job.length) ];
    } else {
      job = Professions.jobs[jobGroup].list;
      let keys = Object.keys(job);
      job = job[keys[ Utils.randomArrayIndex(0, keys.length) ]];
      job = job[ Utils.randomArrayIndex(0, job.length) ];
    }

    return job;
  }

  checkJobVerbage() {
    // for jobs with gender specific verbage.
    if ( this.occupation.includes("*") ) {
      let noun = ( this.sex === "male" ) ? "man" : "woman";
      this.occupation = this.occupation.replace("*", noun);
    }
  }

  getAlignment(options){
    const tendancy = Races[this.race].alignmentTendancies;
    const alignmentWeight = 2;
    const alignments = {
      "any good": ["lawful good","neutral good","chaotic good"],
      "any evil": ["lawful evil","neutral evil","chaotic evil"],
      "any lawful": ["lawful good","lawful neutral","lawful evil"],
      "any chaotic": ["chaotic good","chaotic neutral","chaotic evil"],
      "any neutral": ["neutral good","neutral evil","lawful neutral","true neutral","chaotic neutral"]
    };

    let authority = ["lawful","neutral","chaotic"];
    let morality = ["good","neutral","evil"];
    
    if ( options.alignment && options.alignment.includes("any") ) {
      return alignments[options.alignment][ Utils.randomArrayIndex(0, alignments[options.alignment].length) ];
    } else if ( options.alignment !== undefined ) {
      return options.alignment;
    } else {
      if (tendancy) {
        let a = new Array(alignmentWeight).fill(tendancy[0]);
        let m = new Array(alignmentWeight).fill(tendancy[1]);

        authority = [...authority, ...a];
        morality = [...morality, ...m];
      }

      let output = `${authority[ Utils.randomArrayIndex(0, authority.length) ]} ${morality[ Utils.randomArrayIndex(0, morality.length) ]}`;
      if (output === "neutral neutral")  output = "true neutral";

      return output;
    }
  }


}
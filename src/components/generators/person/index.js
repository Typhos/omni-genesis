import Utils from "components/utils";

import Races from "data/races";
import Professions from "data/professions";

export default class Person {

  constructor ( options = {} ) {
    
    this.race = (typeof options.race === "string") ? options.race : this.getRace(options.race);
    this.sex = options.sex || this.getSex();
    this.name = options.name || this.getName(options);    
    this.age = options.age || this.getAge(options);
    this.occupation = options.occupation || this.getOccupation(options);
    this.alignment = options.alignment || this.getAlignment(options);
  }

  getRace(raceOptions) {
    let racesArray = (raceOptions) ? raceOptions : Object.keys(Races);

    return racesArray[ Utils.randomArrayIndex(0, racesArray.length) ];
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
    let lifespan = Races[this.race].lifespan;

    if ( options.child ) {
      age = Utils.randomInt(0, lifespan/5 - 1 );

      if ( age === 0 ) age = "newborn";

    } else if ( options.elderly ) {
      const old = lifespan - lifespan/4;
      const max = lifespan + lifespan/6;

      age = Utils.randomInt(old, max);
    } else {
      age = Utils.randomInt(lifespan/10, lifespan - lifespan/10);
    }

    return age;
  }

  getOccupation(options){
    // What? You can just "get a job?". This really is a fantasy world.
    const allJobs = Object.keys(Professions.jobs);
    let jobGroup = allJobs[ Utils.randomArrayIndex(0, allJobs.length) ];
    let job;

    if ( jobGroup === "adventurer") {



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

  getAlignment(options){
    const tendancy = Races[this.race].alignmentTendancies;
    const alignmentWeight = 2;

    let authority = ["lawful","neutral","chaotic"];
    let morality = ["good","neutral","evil"];
    
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
const settlement_data = {

  
  "settlements" : {
    "thorp": {
      "population": [40,100],
      // "races": ["human","dwarf","elf","gnome","halfling","dragonborn","tiefling","goblin","hobgoblin","goliath"],
      "races": ["human",],
      "locations": ["forest","coastal","mountains","river","lake","swamp","desert",],
    },

    "hamlet": {
      "population": [101,1000],
      // "races": ["human","dwarf","elf","gnome","halfling","dragonborn","tiefling",],
      "races": ["human",],
      "locations": ["forest","coastal","mountains","river","lake","swamp","desert",],
    },

    // "village": {
    //   "population": [401,900],
    //   "races": ["human","dwarf","elf","gnome","halfling","dragonborn","tiefling"],
    //   "locations": ["forest","coastal","mountains","river","lake","swamp","desert",],
    // },

    // "town": {
    //   "population": [1001,6000],
    //   "races": ["human","dwarf","elf","gnome",],
    //   "locations": ["coastal","river","lake","forest","swamp",],
    // },

    // "city": {
    //   "population": [6001,12000],
    //   "races": ["human",],
    //   // "races": ["human","dwarf","elf","gnome",],
    //   "locations": ["coastal","river","lake",],
    // },
  },

  "locations": {
    "forest":{
      "required_terrain": ["forest"],
      "variation": ["is surrounded by","sits on the edge of","lies deep within","sits on a hill surrounded by"],
      "terrain_options": ["hills","river","creek","lake","coastal","swamp","mountains","caves","structures"],
    },
    "coastal":{ 
      "required_terrain": ["coastal"],
      "variation": ["sits on the edge of the turbulent *","is located on a small island just off the coastal of the *","sits on a hill overlooking the vast *","resides on a peninsula that juts out into"],
      "terrain_options": ["forest","hills","river","creek","lake","swamp","mountains","caves","structures"],
    },
    "mountains":{
      "required_terrain": ["mountains"],
      "variation": ["is located in the foothills of the vast *","sits on the cliffs of the * overlooking a wooded valley below","is nestled in a valley surrounded by the rocky peaks of","resides at the entrance to a pass through"],
      "terrain_options": ["forest","hills","river","creek","lake","swamp","mountains","caves","structures"],
    },
    "river":{
      "required_terrain": ["river"],
      "variation": ["is located on the bank of","spans a tributary of","is a port sitting on"],
      "terrain_options": ["forest","hills","river","creek","lake","swamp","coastal","mountains","caves","structures"],
    },
    "lake":{
      "required_terrain": ["lake"],
      "variation": ["is located on the shore of","sits on the edge of","sits on a small hill overlooking"],
      "terrain_options": ["forest","hills","river","creek","lake","swamp","coastal","mountains","caves","structures"],
    },
    "swamp":{
      "required_terrain": ["swamp"],
      "variation": ["is located deep within the oppressive *","resides on the edge of the vast *","has been built on the soggy *"],
      "terrain_options": ["forest","hills","river","creek","lake","swamp","coastal","mountains","caves","structures"],
    },
    "desert":{
      "required_terrain": ["desert"],
      "variation": ["has been built around an oasis in the rocky *","sits on a small river surrounded by the sand dunes of","is located on a rocky cliff overlooking the vast, rocky outcroppings of"],
      "terrain_options": ["hills","coastal","mountains","caves","structures"],
    },
  },

  "name_info": {

    "location": {
      "river":      ["Run","River","Stream","Brook","Creek","Bend","Ford","Crossing","Bridge","Gate","Reach","Span","Falls","Wake",],
      "lake":       ["Pond","Lake","Basin","Loch","Mere","Valley","Spring",],
      "forest":     ["Forest","Glade","Glen","Grove","Thicket","Wood","Woods","Wald","Weald","Chase","Orchard"],
      "coastal":      ["Port","Shore","Harbor","Wharf","Gate","Haven","Landing","Retreat","Pier","Gulf","Bay","Cove","Sound","End",],
      "mountains":  ["Pass","Gate","Peak","Crest","Pinnacle","Heights","Gorge","Summit","Bluff","Ridge","Crag","Rise","End",],
      "swamp":      ["Swamp","Lagoon","Mire","Bog","Fen","Morass","Glade","Moor","Holm",],
      // "tundra":  [],
      "desert":     ["Flats","Mesa","Hollow","Oasis"],
      // "jungle":  [],
    },
    "prefix": ["New","East","West","North","South","Grand","Old","Free","Kings","Dragon"],
    "suffix": ["shire","burg","ton","ford","don","kirk","bury","wick","boro","dale","berg","stadt","furt","grad"], //"ville","pool","cott","field",

  },

  "town_shops": {
    // shops per 10,000
    "tavern": 40,
    "inn": 25,
    "weaponsmithy": 15,
    "armorsmithy": 15,
    "bowyer": 12,
    "apothecary": 20,
    "blacksmithy": 28,
    "jeweler": 12,
    "cobbler": 35,
    "clothier": 30,
    "hatter": 14,
    // "goldsmithy": 8,
    // "silversmithy": 12,
    "mercery": 8,
  },

  // non-PC-relevant shops
  "non_shop_npcs": {
    // npcs per 10,000
    "mason": 50,
    "furrier": 40,
    "weaver": 30,
    "cooper": 30,
    "baker": 25,
    "butcher": 15,
    "saddler": 10,
    "chandler": 15,
    "locksmith": 10,
    "ropemaker": 10,
    "tanner": 15,
    "rugmaker": 10,
  },  

  "peasants": {
    "farming": ["farmer"],
    "fishing": ["farmer","fisher"],
    "mining": ["farmer","miner"],
    "logging": ["farmer","forester"],
  },

  "race_info": {
    "human": {
      "thorp": {
        "governments": {
          "odds": {
            "manor": 1,
          },
          "manor": {
            "leader": {
              // goliath tribes are egaliarian?
              "sex_odds": {
                "male": 3,
                "female": 1,
              },
              "name": {
                "male": "reeve",
                "female": "reeve",
              },
              "class": "all", // class options, all = full list
              "age": [0.225,0.6], // age percentage range of leader
              "description": "The * is a freeman granted their title by the local lord or authority. They hold local jurisdiction.",
            },
            "council": {
              "name": "Thorp Elders",
              "positions": [
                {
                  "name": "elder",
                  "non_noble": true,
                  "number": [0,3],
                  "class": "all",
                  "sex_requirement": false,
                  "age": [0.7,1],
                  "description": "An elder in the thorp who can pass on their wisdom to the next generation.",
                },
              ],      
            },
          },
        },
        "titles": ["Thorp","Settlement","Outpost",],
        "race_ratio": {
          "human": [500,1000],
          "half-elf":[40,100],
          "dwarf":[15,20],
          "half-orc":[15,30],
          "elf":[10,15],
          "gnome":[10,15],
          "halfling":[10,15],
          "dragonborn":[5,10],
          "tiefling":[5,10],
          "goblin": [1,2],
          "hobgoblin": [1,2],
          "goliath": [1,5],
          "aasimar": [1,2],
          "firbolg": [1,2],
          "kenku": [1,2],
          "kobold": [1,2],
        },
      },
      "hamlet": {
        "governments": {
          "odds": {
            // "manor": 1,
            "barony": 1,
          },
          "manor": {
            "leader": {
              // goliath tribes are egaliarian?
              "sex_odds": {
                "male": 3,
                "female": 1,
              },
              "name": {
                "male": "steward",
                "female": "steward",
              },
              "class": "all", // class options, all = full list
              "age": [0.225,0.6], // age percentage range of leader
              "description": "The * is an appointed official who supervises a lord's estate. In the lord's absense, the * holds local authority.",
            },
            "council": {
              "name": "Local Officials",
              "positions": [
                {
                  "name": "reeve",
                  "number": [1,1],
                  "class": "all",
                  "sex_requirement": false,
                  "age": [0.225,0.7],
                  "description": "A bailiff is an official appointed by the local lord who is in charge of supervising the cultivation of the lord's holdings.",
                },
                {
                  "name": "elder",
                  "non_noble": true,
                  "number": [0,3],
                  "class": "all",
                  "sex_requirement": false,
                  "age": [0.7,1],
                  "description": "An elder in the thorp who can pass on their wisdom to the next generation.",
                },
              ],      
            },
          },
          "barony": {
            "leader": {
              // goliath tribes are egaliarian?
              "sex_odds": {
                "male": 5,
                "female": 2,
              },
              "name": {
                "male": "baron",
                "female": "baroness",
              },
              "job_group": "greater nobility",
              "class": "all", // class options, all = full list
              "age": [0.225,0.85], // age percentage range of leader
              "description": "A * is a low-ranking noble who holds the claim over a small fiefdom, usually a manor or a castle, as well as the surrounding lands.",
            },
            "council": {
              "name": "Local Officials",
              "positions": [
                {
                  "name": "steward",
                  "job_group": "lesser nobility",
                  "number": [0,1],
                  "class": "all", // class options, all = full list
                  "age": [0.225,0.8], // age percentage range of leader
                  "description": "The steward is an appointed official who supervises a lord's estate. In the lord's absense, the steward holds local authority.",
                },
                {
                  "name": "marshal",
                  "job_group": "lesser nobility",
                  "number": [0,1],
                  "class": ["fighter","paladin",], // class options, all = full list
                  "age": [0.225,0.75], // age percentage range of leader
                  "description": "The chaplain is an appointed official who oversees the temples and religious elements of a baron's estate.",
                },
                {
                  "name": "chanellor",
                  "job_group": "lesser nobility",
                  "number": [0,1],
                  "class": ["rogue","bard",], // class options, all = full list
                  "age": [0.225,0.75], // age percentage range of leader
                  "description": "The chanellor acts as the lord's advisor on political affairs, and acts as the lord's spymaster. They collect information and carry out the lord's orders descreetly.",
                },
                {
                  "name": "chaplain",
                  "non_noble": true,
                  "job_group": "religious",
                  "number": [0,1],
                  "class": ["cleric"], // class options, all = full list
                  "age": [0.225,0.8], // age percentage range of leader
                  "description": "A chaplain is an appointed cleric who oversees the temples and religious elements of a baron's estate.",
                },
                {
                  "name": "constable",
                  "job_group": "lesser nobility",
                  "number": [0,1],
                  "class": "all", // class options, all = full list
                  "age": [0.225,0.8], // age percentage range of leader
                  "description": "The constable is appointed by the lord to manage the communication from the court, as well as the stable and pages.",
                },
              ],      
            },
          },
        },
        "titles": ["Hamlet","Castle-town",],
        "race_ratio": {
          "human": [500,750],
          "half-elf":[40,100],
          "dwarf":[15,30],
          "half-orc":[15,30],
          "elf":[5,20],
          "gnome":[10,20],
          "halfling":[20,30],
          "dragonborn":[10,25],
          "tiefling":[5,25],
          "goblin": [1,3],
          "hobgoblin": [1,2],
          "goliath": [1,5],
          "aasimar": [1,5],
          "firbolg": [1,5],
          "kenku": [1,5],
          "kobold": [1,2],
        },
      },
      "village": {
        "titles": ["Village",],
        "race_ratio": {
          "human": [500,1000],
          "half-elf":[40,100],
          "dwarf":[15,20],
          "half-orc":[15,30],
          "elf":[10,15],
          "gnome":[10,15],
          "halfling":[10,15],
          "dragonborn":[5,10],
          "tiefling":[5,10],
          "goblin": [1,2],
          "hobgoblin": [1,2],
          "lizardfolk": [1,2],
          "goliath": [1,5],
          "aasimar": [1,2],
          "firbolg": [1,2],
          "kenku": [1,2],
          "kobold": [1,2],
        },
      },
      "town": {
        "titles": ["Town",],
        "race_ratio": {
          "human": [500,750],
          "half-elf":[40,100],
          "dwarf":[15,20],
          "half-orc":[15,30],
          "elf":[10,15],
          "gnome":[10,15],
          "halfling":[10,15],
          "dragonborn":[5,10],
          "tiefling":[5,10],
          "goblin": [1,2],
          "hobgoblin": [1,2],
          "goliath": [1,5],
          "aasimar": [1,2],
          "firbolg": [1,2],
          "kenku": [1,2],
          "kobold": [1,2],
        },
      },
      "city": {
        "titles": ["City",],
        "race_ratio": {
          "human": [500,750],
          "half-elf":[40,100],
          "dwarf":[15,20],
          "half-orc":[15,30],
          "elf":[10,15],
          "gnome":[10,15],
          "halfling":[10,15],
          "dragonborn":[5,10],
          "tiefling":[5,10],
          "goblin": [1,2],
          "hobgoblin": [1,2],
          "goliath": [1,5],
          "aasimar": [1,2],
          "firbolg": [1,2],
          "kenku": [1,2],
          "kobold": [1,2],
        },
        "governments": {
          "odds": {
            // "barony": 1,
            "republic": 1,
          },
          "republic": {
            "leader": {
              "sex_odds": {
                "male": 5,
                "female": 2,
              },
              "name": {
                "male": "lord mayor",
                "female": "lady mayor",
              },
              "job_group": "lesser nobility",
              "class": "all", // class options, all = full list
              "age": [0.225,0.85], // age percentage range of leader
              "description": "A * is an elected officially, usually from the noble or merchantile classes.",
            },
            "council": {
              "name": "Local Officials",
              "positions": [
                {
                  "name": "captain of the guard",
                  "job_group": "lesser nobility",
                  "number": [0,1],
                  "class": ["fighter","paladin",], // class options, all = full list
                  "age": [0.225,0.75], // age percentage range of leader
                  "description": "The captain of the guard runs the military defense of the city.",
                },
                {
                  "name": "chanellor",
                  "job_group": "lesser nobility",
                  "number": [0,1],
                  "class": ["rogue","bard",], // class options, all = full list
                  "age": [0.225,0.75], // age percentage range of leader
                  "description": "The chanellor acts as the mayor's advisor on political affairs. They collect information and carry out the mayor's orders descreetly.",
                },
                {
                  "name": "bishop",
                  "job_group": "religious",
                  "number": [0,1],
                  "class": ["cleric"], // class options, all = full list
                  "age": [0.225,0.8], // age percentage range of leader
                  "description": "A bishop is an appointed cleric who oversees the temples and religious needs of the city.",
                },
                {
                  "name": "constable",
                  "job_group": "lesser nobility",
                  "number": [0,1],
                  "class": "all", // class options, all = full list
                  "age": [0.225,0.8], // age percentage range of leader
                  "description": "The constable is appointed by the lord to manage the communication from the government, as well as the stable and pages.",
                },
              ],      
            },
          },
        },
      },
    },
    "dwarf": {
      "thorp": {
        "titles": ["Thorp","Outpost","Enclave"],
        "race_ratio": {
          "dwarf": [500,1000],
          "gnome":[20,25],
          "human": [10,15],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "elf":[5,10],
          "halfling":[10,15],
          "dragonborn":[5,10],
          "tiefling":[5,10],
          "goliath": [1,5],
        },
      },
      "hamlet": {
        "titles": ["Hillock","Hamlet",],
        "race_ratio": {
          "dwarf": [500,1000],
          "gnome":[20,25],
          "human": [10,15],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "elf":[5,10],
          "halfling":[10,15],
          "dragonborn":[5,10],
          "tiefling":[5,10],
          "goliath": [1,5],
        },
      },
      "village": {
        "titles": ["Village",],
        "race_ratio": {
          "dwarf": [500,1000],
          "gnome":[20,25],
          "human": [10,15],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "elf":[5,10],
          "halfling":[10,15],
          "dragonborn":[5,10],
          "tiefling":[5,10],
          "goliath": [1,5],
        },
      },
      "town": {
        "titles": ["Town",],
        "race_ratio": {
          "dwarf": [500,1000],
          "gnome":[20,25],
          "human": [10,15],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "elf":[5,10],
          "halfling":[10,15],
          "dragonborn":[5,10],
          "tiefling":[5,10],
          "goliath": [1,5],
        },
      },
      "city": {
        "titles": ["City",],
        "race_ratio": {
          "dwarf": [500,1000],
          "gnome":[20,25],
          "human": [10,15],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "elf":[5,10],
          "halfling":[10,15],
          "dragonborn":[5,10],
          "tiefling":[5,10],
          "goliath": [1,5],
        },
      },
    },
    "elf": {
      "thorp": {
        "titles": ["Thorp","Outpost","Enclave","Settlement",],
        "race_ratio": {
          "elf": [500,1000],
          "human":[15,20],
          "dwarf":[10,15],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "gnome":[10,15],
          "halfling":[10,15],
          "dragonborn":[5,10],
          "tiefling":[5,10],
          "goblin": [1,2],
          "hobgoblin": [1,2],
          "lizardfolk": [1,2],
          "goliath": [1,5],
        },
      },
      "hamlet": {
        "titles": ["Hamlet","Retreat",],
        "race_ratio": {
          "elf": [500,1000],
          "human":[15,20],
          "dwarf":[10,15],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "gnome":[10,15],
          "halfling":[10,15],
          "dragonborn":[5,10],
          "tiefling":[5,10],
          "goblin": [1,2],
          "hobgoblin": [1,2],
          "lizardfolk": [1,2],
          "goliath": [1,5],
        },
      },
      "village": {
        "titles": ["Village",],
        "race_ratio": {
          "elf": [500,1000],
          "human":[15,20],
          "dwarf":[10,15],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "gnome":[10,15],
          "halfling":[10,15],
          "dragonborn":[5,10],
          "tiefling":[5,10],
          "goblin": [1,2],
          "hobgoblin": [1,2],
          "lizardfolk": [1,2],
          "goliath": [1,5],
        },
      },
      "town": {
        "titles": ["Town",],
        "race_ratio": {
          "elf": [500,1000],
          "human":[15,20],
          "dwarf":[10,15],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "gnome":[10,15],
          "halfling":[10,15],
          "dragonborn":[5,10],
          "tiefling":[5,10],
          "goblin": [1,2],
          "hobgoblin": [1,2],
          "lizardfolk": [1,2],
          "goliath": [1,5],
        },
      },
      "city": {
        "titles": ["City",],
        "race_ratio": {
          "elf": [500,1000],
          "human":[15,20],
          "dwarf":[10,15],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "gnome":[10,15],
          "halfling":[10,15],
          "dragonborn":[5,10],
          "tiefling":[5,10],
          "goblin": [1,2],
          "hobgoblin": [1,2],
          "lizardfolk": [1,2],
          "goliath": [1,5],
        },
      },
    },
    "gnome": {
      "thorp": {
        "titles": ["Thorp","Outpost","Enclave","Settlement",],
        "race_ratio": {
          "gnome": [500,1000],
          "dwarf":[10,15],
          "human": [5,10],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "elf":[15,20],
          "halfling":[10,15],
          "dragonborn":[5,10],
          "tiefling":[5,10],
        },
      },
      "hamlet": {
        "titles": ["Hamlet","Fort Town",],
        "race_ratio": {
          "gnome": [500,1000],
          "dwarf":[10,15],
          "human": [5,10],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "elf":[15,20],
          "halfling":[10,15],
          "dragonborn":[5,10],
          "tiefling":[5,10],
        },
      },
      "village": {
        "titles": ["Village",],
        "race_ratio": {
          "gnome": [500,1000],
          "dwarf":[10,15],
          "human": [5,10],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "elf":[15,20],
          "halfling":[10,15],
          "dragonborn":[5,10],
          "tiefling":[5,10],
        },
      },
      "town": {
        "titles": ["Town",],
        "race_ratio": {
          "gnome": [500,1000],
          "dwarf":[10,15],
          "human": [5,10],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "elf":[15,20],
          "halfling":[10,15],
          "dragonborn":[5,10],
          "tiefling":[5,10],
        },
      },
      "city": {
        "titles": ["City",],
        "race_ratio": {
          "gnome": [500,1000],
          "dwarf":[10,15],
          "human": [5,10],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "elf":[15,20],
          "halfling":[10,15],
          "dragonborn":[5,10],
          "tiefling":[5,10],
        },
      },
    },
    "halfling": {
      "thorp": {
        "titles": ["Thorp","Outpost","Enclave","Settlement",],
        "race_ratio": {
          "halfling": [500,1000],
          "gnome":[10,15],
          "human": [5,10],
          "dwarf":[1,10],
          "half-elf":[1,10],
          "half-orc":[1,5],
          "elf":[1,5],
          "dragonborn":[1,5],
          "tiefling":[1,5],
        },
      },
      "hamlet": {
        "titles": ["Hamlet","Hillock","Commune",],
        "race_ratio": {
          "halfling": [500,1000],
          "gnome":[10,15],
          "dwarf":[10,15],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "human": [5,10],
          "elf":[1,5],
          "dragonborn":[1,5],
          "tiefling":[1,5],
        },
      },
      "village": {
        "titles": ["Village"],
        "race_ratio": {
          "halfling": [500,1000],
          "gnome":[10,15],
          "dwarf":[10,15],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "human": [5,10],
          "elf":[1,5],
          "dragonborn":[1,5],
          "tiefling":[1,5],
        },
      },
    },
    "dragonborn": {
      "thorp": {
        "titles": ["Settlement","Outpost","Enclave"],
        "race_ratio": {
          "dragonborn":[500,1000],
          "human": [15,20],
          "dwarf":[15,20],
          "elf":[10,15],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "gnome":[5,15],
          "halfling":[5,15],
          "tiefling":[1,5],
          "goliath": [1,5],
        },
      },
      "hamlet": {
        "titles": ["Hamlet","Castle-town"],
        "race_ratio": {
          "dragonborn":[500,1000],
          "human": [15,20],
          "dwarf":[15,20],
          "elf":[10,15],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "gnome":[5,15],
          "halfling":[5,15],
          "tiefling":[1,5],
          "goliath": [1,5],
        },
      },
      "village": {
        "titles": ["Village"],
        "race_ratio": {
          "dragonborn":[500,1000],
          "human": [15,20],
          "dwarf":[15,20],
          "elf":[10,15],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "gnome":[5,15],
          "halfling":[5,15],
          "tiefling":[1,5],
          "goliath": [1,5],
        },
      },
    },
    "tiefling": {
      "thorp": {
        "titles": ["Settlement","Outpost","Enclave"],
        "race_ratio": {
          "tiefling":[500,1000],
          "human": [15,20],
          "dwarf":[5,10],
          "elf":[10,15],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "gnome":[5,15],
          "halfling":[5,15],
          "dragonborn":[1,5],
          "goliath": [1,5],
        },
      },
      "hamlet": {
        "titles": ["Hamlet","Castle-town"],
        "race_ratio": {
          "tiefling":[500,1000],
          "human": [15,20],
          "dwarf":[5,10],
          "elf":[10,15],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "gnome":[5,15],
          "halfling":[5,15],
          "dragonborn":[1,5],
          "goliath": [1,5],
        },
      },
      "village": {
        "titles": ["Village"],
        "race_ratio": {
          "tiefling":[500,1000],
          "human": [15,20],
          "dwarf":[5,10],
          "elf":[10,15],
          "half-elf":[10,15],
          "half-orc":[5,10],
          "gnome":[5,15],
          "halfling":[5,15],
          "dragonborn":[1,5],
          "goliath": [1,5],
        },
      },
    },
    "goblin": {
      "thorp": {
        "titles": ["Fort","Camp","Outpost",],
        "race_ratio": {
          "goblin": [200,300],
          "hobgoblin": [10,15],
          "bugbear": [1,5],
        },
      },
    },
    "hobgoblin": {
      "thorp": {
        "titles": ["Fort","Camp","Outpost"],
        "race_ratio": {
          "goblin": [15,20],
          "hobgoblin": [200,400],
          "bugbear": [10,15],
        },
      },
    },
    "goliath": {
      "thorp": {
        "governments": {
          "odds": {
            "tribal": 1,
          },
          "tribal": {
            "leader": {
              // goliath tribes are egaliarian?
              "sex_odds": {
                "male": 1,
                "female": 1,
              },
              "name": {
                "male": "chieftan",
                "female": "chieftan",
              },
              "class": "all", // class options, all = full list
              "age": [0.3,0.6], // age percentage range of leader
              "description": "The * is the primary authority figure in the tribe and is responsible for choosing when the tribe should move on to new lands. The * also chooses who will fill the other key roles in the tribe. The tribe * only maintains power as long as they can prove they are suitable for the role. Any goliath can challenge the * in an attempt to replace them. In order to become the new *, the challenger must best the current * in three contests.",
            },
            "council": {
              "name": "Tribal Council",
              "positions": [
                {
                  "name": "adjudicator",
                  "number": [1,1],
                  "class": "all",
                  "sex_requirement": false,
                  "age": [0.25,0.5],
                  "description": "Adjudicators settle disputes. Tough decisions are often settled with a contest of the adjudicator's devising.",
                },
                {
                  "name": "skywatcher",
                  "number": [1,1],
                  "class": ["druid"],
                  "sex_requirement": false,
                  "age": [0.25,0.5],
                  "description": "The Skywatcher oversees festivals, rituals, and celebrations. Skywatchers also make sure that resources are not over harvested and game animals aren't needlessly slaughtered.",
                },
                {
                  "name": "hunt-captain",
                  "number": [2,2],
                  "class": ["ranger","fighter","barbarian"],
                  "sex_requirement": false,
                  "age": [0.25,0.5],
                  "description": "Hunt-captains are responsible for hunting, gathering and scouting. Two captains are selected to encourage a healthy rivalry.",
                },
                {
                  "name": "camp mother",
                  "number": [1,1],
                  "class": ["druid","cleric","ranger","bard"],
                  "sex_requirement": ["female"],
                  "age": [0.25,0.5],
                  "description": "The camp-mother is responsible for care and teaching of the tribe's infants and toddlers, as their parents are often busy with other responsibilities. It is also camp-mother who decides when young goliaths are old enough to start contributing to the tribe (usually around the age of 10).",
                },
                {
                  "name": "elder",
                  "number": [0,2],
                  "class": "all",
                  "sex_requirement": false,
                  "age": [0.6,1],
                  "description": "Tribal elders are members of the tribe that are too old to hold other posts, but too venerable and wise to exile. The advise other members of the council.",
                },
              ],      
            },
          },
        },
        "titles": ["Hold","Camp",],
        "race_ratio": {
          "goliath": [1,5],
        },
      },
    },
  },

  "castles": {
    "names": {
      "human": {
        "prefix": ["Castle","Kaer","Vár",],
        "suffix": ["Castle","Fortress","Keep","Citadel"],
        "adjectives": ["",],
        "nouns": ["",],
      },
    },
  },

  "terrain": {
    "forest": {
      "combined_named": true,
      "prefix": ["Haunted","Whispering","Rustling","Howling","Black","Crimson","Silver","Blue","Amber","Dark","Barbed","Biting","Screaching","Wailing","Weeping","Lamenting","Crooked","Fanged","Witch","Thorn","Astral","Fey","Dusk","Troll","Broken","Bleak","Watching","Twilight","Shaded","Lonely","Glowing","Cursed","Profane","Growling","Laughing","Shambling","Sickly","Dread","Blighted","Sacred","Somber","Grim","Gloomy","Solemn","Clouded","Misty","Hallowed","Pious","Murky","Hazy","Stone","Petrified","Moody","Eldritch","Sulking","Majestic","Strange","Dead","Maimed","Frozen","Troubled","Mad","Old","Weary","Primal","Eternal","Ancient","Pale",],
      "suffix": ["Wood","Woods","Wald","Glade","Glen","Forest","Spur","Weald","Grove",],
    },
    "mountains": {
      "combined_named": false,
      "prefix": ["Azure","Skytalon","Dragonfang","Wyrmblight","Skycutter","Starfall","Haunted","Whispering","Rustling","Howling","Black","Crimson","Silver","Blue","Amber","Dark","Barbed","Biting","Screaching","Wailing","Weeping","Lamenting","Crooked","Fanged","Witch","Thorn","Astral","Fey","Dusk","Troll","Broken","Bleak","Watching","Twilight","Shaded","Lonely","Glowing","Cursed","Profane","Growling","Laughing","Shambling","Sickly","Dread","Blighted","Sacred","Somber","Grim","Gloomy","Solemn","Clouded","Misty","Hallowed","Pious","Murky","Hazy","Stone","Petrified","Moody","Eldritch","Sulking","Majestic","Strange","Dead","Maimed","Frozen","Troubled","Mad","Old","Weary","Primal","Eternal","Ancient","Pale",],
      "suffix": ["Mountains",],
    },
    "hills": {
      "combined_named": false,
      "prefix": ["Rocky","Looming","Haunted","Whispering","Rustling","Howling","Black","Crimson","Silver","Blue","Amber","Dark","Barbed","Biting","Screaching","Wailing","Weeping","Lamenting","Crooked","Fanged","Witch","Thorn","Astral","Fey","Dusk","Troll","Broken","Bleak","Watching","Twilight","Shaded","Lonely","Glowing","Cursed","Profane","Growling","Laughing","Shambling","Sickly","Dread","Blighted","Sacred","Somber","Grim","Gloomy","Solemn","Clouded","Misty","Hallowed","Pious","Murky","Hazy","Stone","Petrified","Moody","Eldritch","Sulking","Majestic","Strange","Dead","Maimed","Frozen","Troubled","Mad","Old","Weary","Primal","Eternal","Ancient","Pale",],
      "suffix": ["Hills",],
    },
    "lake": {
      "reverse": true,
      "no_the": true,
      "combined_named": false,
      "prefix": ["Haunted","Whispering","Rustling","Howling","Black","Crimson","Silver","Blue","Amber","Dark","Barbed","Biting","Screaching","Wailing","Weeping","Lamenting","Crooked","Fanged","Witch","Thorn","Astral","Fey","Dusk","Troll","Broken","Bleak","Watching","Twilight","Shaded","Lonely","Glowing","Cursed","Profane","Growling","Laughing","Shambling","Sickly","Dread","Blighted","Sacred","Somber","Grim","Gloomy","Solemn","Clouded","Misty","Hallowed","Pious","Murky","Hazy","Stone","Petrified","Moody","Eldritch","Sulking","Majestic","Strange","Dead","Maimed","Frozen","Troubled","Mad","Old","Weary","Primal","Eternal","Ancient","Pale",],
      "suffix": ["Lake","Loch"],
    },
    "river": {
      "combined_named": false,
      "prefix": ["Haunted","Whispering","Rustling","Howling","Black","Crimson","Silver","Blue","Amber","Dark","Barbed","Biting","Screaching","Wailing","Weeping","Lamenting","Crooked","Fanged","Witch","Thorn","Astral","Fey","Dusk","Troll","Broken","Bleak","Watching","Twilight","Shaded","Lonely","Glowing","Cursed","Profane","Growling","Laughing","Shambling","Sickly","Dread","Blighted","Sacred","Somber","Grim","Gloomy","Solemn","Clouded","Misty","Hallowed","Pious","Murky","Hazy","Stone","Petrified","Moody","Eldritch","Sulking","Majestic","Strange","Dead","Maimed","Frozen","Troubled","Mad","Old","Weary","Primal","Eternal","Ancient","Pale",],
      "suffix": ["River"],
    },
    "creek": {
      "combined_named": false,
      "prefix": ["Haunted","Whispering","Rustling","Howling","Black","Crimson","Silver","Blue","Amber","Dark","Barbed","Biting","Screaching","Wailing","Weeping","Lamenting","Crooked","Fanged","Witch","Thorn","Astral","Fey","Dusk","Troll","Broken","Bleak","Watching","Twilight","Shaded","Lonely","Glowing","Cursed","Profane","Growling","Laughing","Shambling","Sickly","Dread","Blighted","Sacred","Somber","Grim","Gloomy","Solemn","Clouded","Misty","Hallowed","Pious","Murky","Hazy","Stone","Petrified","Moody","Eldritch","Sulking","Majestic","Strange","Dead","Maimed","Frozen","Troubled","Mad","Old","Weary","Primal","Eternal","Ancient","Pale",],
      "suffix": ["Brook","Creek",],
    },
    "swamp": {
      "combined_named": false,
      "prefix": ["Fetid","Stinking","Ghostlight","Foul","Rotting","Restless","Haunted","Whispering","Rustling","Howling","Black","Crimson","Silver","Blue","Amber","Dark","Barbed","Biting","Screaching","Wailing","Weeping","Lamenting","Crooked","Fanged","Witch","Thorn","Astral","Fey","Dusk","Troll","Broken","Bleak","Watching","Twilight","Shaded","Lonely","Glowing","Cursed","Profane","Growling","Laughing","Shambling","Sickly","Dread","Blighted","Sacred","Somber","Grim","Gloomy","Solemn","Clouded","Misty","Hallowed","Pious","Murky","Hazy","Petrified","Moody","Eldritch","Sulking","Majestic","Strange","Dead","Maimed","Frozen","Troubled","Mad","Old","Weary","Primal","Eternal","Ancient","Pale",],
      "suffix": ["Swamp","Mire","Bog","Fen","Morass","Moor",],
    },
    "coastal": {
      "combined_named": false,
      "prefix": ["Haunted","Whispering","Rustling","Howling","Black","Crimson","Silver","Blue","Amber","Dark","Barbed","Biting","Screaching","Wailing","Weeping","Lamenting","Crooked","Fanged","Witch","Thorn","Astral","Fey","Dusk","Troll","Broken","Bleak","Watching","Twilight","Shaded","Lonely","Glowing","Cursed","Profane","Growling","Laughing","Shambling","Sickly","Dread","Blighted","Sacred","Somber","Grim","Gloomy","Solemn","Clouded","Misty","Hallowed","Pious","Murky","Hazy","Stone","Petrified","Moody","Eldritch","Sulking","Majestic","Strange","Dead","Maimed","Frozen","Troubled","Mad","Old","Weary","Primal","Eternal","Ancient","Pale",],
      "suffix": ["Sea","Ocean",],
    },
    "desert": {
      "combined_named": false,
      "prefix": ["Haunted","Whispering","Rustling","Howling","Black","Crimson","Silver","Blue","Amber","Dark","Barbed","Biting","Screaching","Wailing","Weeping","Lamenting","Crooked","Fanged","Witch","Thorn","Astral","Fey","Dusk","Troll","Broken","Bleak","Watching","Twilight","Shaded","Lonely","Glowing","Cursed","Profane","Growling","Laughing","Shambling","Sickly","Dread","Blighted","Sacred","Somber","Grim","Gloomy","Solemn","Clouded","Misty","Hallowed","Pious","Murky","Hazy","Stone","Petrified","Moody","Eldritch","Sulking","Majestic","Strange","Dead","Maimed","Frozen","Troubled","Mad","Old","Weary","Primal","Eternal","Ancient","Pale",],
      "suffix": ["Wasteland","Desert","Flats","Badlands","Dunes",],
    },
    "caves": {
      "combined_named": false,
      "prefix": ["Bottomless","Writhing","Blasted","Grinning","Perilous","Perilous","Treacherous","Haunted","Whispering","Rustling","Howling","Black","Crimson","Silver","Blue","Amber","Dark","Barbed","Biting","Screaching","Wailing","Weeping","Lamenting","Crooked","Fanged","Witch","Thorn","Astral","Fey","Dusk","Troll","Broken","Bleak","Watching","Twilight","Shaded","Lonely","Glowing","Cursed","Profane","Growling","Laughing","Shambling","Sickly","Dread","Blighted","Sacred","Somber","Grim","Gloomy","Solemn","Clouded","Misty","Hallowed","Pious","Murky","Hazy","Stone","Petrified","Moody","Eldritch","Sulking","Majestic","Strange","Dead","Maimed","Frozen","Troubled","Mad","Old","Weary","Primal","Eternal","Ancient","Pale",],
      "suffix": ["Caves","Grotto","Caverns","Hollow","Gorge","Chasm","Ravine","Canyon","Abyss","Crevasse","Fissure",],
    }, 
    "structures": {
      "types": ["holy","ruins","abandoned","industrial","military","arcane"],
      "holy": {
        "type": ["is * shrine","is * temple","is * graveyard","is an unholy fane"],
        "race": ["a human","an elven","a dwarven","a gnomish","a halfling","a tiefling","a dragonborn"]
      },
      "abandoned": {
        "type": ["is an abandoned * village","is an abandoned * town","is an abandoned * shrine"],
        "race": ["human","elven","dwarven","gnomish","halfling","tiefling","dragonborn"]
      },
      "ruins": {
        "type": ["is a long forgotten dungeon","are the ruins of a castle","is a ruined tower","are the ruins of a temple"],
      },
      "industrial": {
        "type": ["is * logging camp","is * mine","is * quarry","is * sawmill","is * trading post",],
        "race": ["a human","an elven","a dwarven","a gnomish","a halfling","a tiefling","a dragonborn"]
      },
      "military": {
        "type": ["is * fort","is * watchtower","is * outpost","is * encampment",],
        "race": ["a human","an elven","a dwarven","a gnomish","a halfling","a tiefling","a dragonborn","an orc","a goblin","a hobgoblin",]
      },
      "arcane": {
        "type": ["is a mage tower","is an arcane monolith","is a wizard's college","is an arcane rift","is a witch's hut"],
      },
    },
  },

};

export { settlement_data };
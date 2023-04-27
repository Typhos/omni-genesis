import Utils from "../../components/utils";
import demiHumanNames from "../../data/names/allNames";
import nobleHouses from "../../data/names/nobleHouses";

class HirelingRoster {
  constructor(params = {}) {
    if (params.seed) {
      global.seed = params.seed;
    } else if (!global.seed) {
      Utils.setNewSeed();
    }

    const { crier, level, townSize } = params;

    this.townSize = townSize;
    this.crier = crier;
    this.partyLevel = level;
    this.cost = this.calculateCost();
    this.roster = this.generateSellswordRoster();
  }

  calculateCost() {
    let base = this.crier ? 5 : 0;

    switch (this.townSize) {
      case "village":
        return base + 5;
      case "town":
        return base + 10;
      case "city":
        return base + 15;
      // no default
    }
  }

  generateSellswordRoster() {
    const applicantCount = this.getNumberOfHirelings();
    const levelProbabilityArray = this.getLevelProbabilityArray();

    const hirelingsArray = new Array(applicantCount).fill(undefined);
    return hirelingsArray.map(
      () => new Hireling(levelProbabilityArray[Utils.randomArrayIndex(levelProbabilityArray)])
    );
  }

  getNumberOfHirelings() {
    const applicantRange = {
      village: {
        min: 1,
        max: 5
      },
      town: {
        min: 2,
        max: 6
      },
      city: {
        min: 3,
        max: 7
      }
    };
    const bonus = this.crier ? Utils.randomInt(1, 3) : 0;
    const min = applicantRange[this.townSize].min + bonus;
    const max = applicantRange[this.townSize].max + bonus;

    return Utils.randomInt(min, max);
  }

  getLevelProbabilityArray() {
    const maxHirelingLevel = this.partyLevel - 1;
    let array = new Array(100).fill(0);

    for (let i = 0; i < maxHirelingLevel; i++) {
      const odds = new Array((10 - i) ** 2).fill(i);
      array.push(...odds);
    }

    return array;
  }
}

const oseCharacterRaces = {
  Human: {
    odds: 25,
    maxLvl: 14,
    classes: {
      Acrobat: {
        hd: 4,
        odds: 1,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["Pole arm", "Short bow", "Spear", "Staff", "Dagger"],
        armorOptions: ["Leather"]
      },
      Assassin: {
        hd: 6,
        odds: 1,
        alignments: ["Neutral", "Chaos"],
        weaponOptions: [
          "Battle axe",
          "Crossbow",
          "Dagger",
          "Hand axe",
          "Mace",
          "Pole arm",
          "Short bow",
          "Short sword",
          "Silver dagger",
          "Sling",
          "Spear",
          "Sword",
          "Warhammer"
        ],
        armorOptions: ["Leather", "Leather & Shield"]
      },
      Barbarian: {
        hd: 8,
        odds: 2,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: [
          "Battle axe",
          "Crossbow",
          "Dagger",
          "Hand axe",
          "Mace",
          "Pole arm",
          "Short bow",
          "Short sword",
          "Silver dagger",
          "Sling",
          "Spear",
          "Sword",
          "Warhammer"
        ],
        armorOptions: ["Leather", "Leather & Shield", "Chainmail", "Chainmail & Shield"]
      },
      Bard: {
        hd: 6,
        odds: 1,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["Crossbow", "Short sword", "Sling", "Sword"],
        armorOptions: ["Leather", "Chainmail"]
      },
      Cleric: {
        hd: 6,
        odds: 1,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["Mace", "Warhammer", "Staff", "Sling"],
        armorOptions: ["Leather", "Leather & Shield", "Chainmail", "Chainmail & Shield"]
      },
      Druid: {
        hd: 6,
        odds: 1,
        alignments: ["Neutral"],
        weaponOptions: ["Club", "Dagger", "Sling", "Spear", "Staff"],
        armorOptions: ["Leather", "Leather & Shield"]
      },
      Fighter: {
        hd: 8,
        odds: 5,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: [
          "Battle axe",
          "Crossbow",
          "Dagger",
          "Hand axe",
          "Mace",
          "Pole arm",
          "Short bow",
          "Short sword",
          "Silver dagger",
          "Sling",
          "Spear",
          "Sword",
          "Warhammer"
        ],
        armorOptions: ["Chainmail", "Chainmail & Shield", "Plate mail", "Plate mail & Shield"]
      },
      Illusionist: {
        hd: 4,
        odds: 1,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["Staff", "Dagger"],
        armorOptions: ["None"]
      },
      Knight: {
        hd: 8,
        odds: 1,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["Lance", "Short sword", "Sword", "Warhammer"],
        armorOptions: ["Chainmail", "Chainmail & Shield", "Plate mail", "Plate mail & Shield"]
      },
      "Magic-User": {
        hd: 4,
        odds: 2,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["Staff", "Dagger"],
        armorOptions: ["None"]
      },
      Paladin: {
        hd: 8,
        odds: 1,
        alignments: ["Law"],
        weaponOptions: [
          "Battle axe",
          "Crossbow",
          "Dagger",
          "Hand axe",
          "Mace",
          "Pole arm",
          "Short bow",
          "Short sword",
          "Silver dagger",
          "Sling",
          "Spear",
          "Sword",
          "Warhammer"
        ],
        armorOptions: ["Chainmail", "Chainmail & Shield", "Plate mail", "Plate mail & Shield"]
      },
      Ranger: {
        hd: 8,
        odds: 1,
        alignments: ["Law", "Neutral"],
        weaponOptions: [
          "Battle axe",
          "Crossbow",
          "Dagger",
          "Hand axe",
          "Mace",
          "Pole arm",
          "Short bow",
          "Short sword",
          "Silver dagger",
          "Sling",
          "Spear",
          "Sword",
          "Warhammer"
        ],
        armorOptions: ["Leather", "Leather & Shield", "Chainmail", "Chainmail & Shield"]
      },
      Thief: {
        hd: 4,
        odds: 3,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: [
          "Battle axe",
          "Crossbow",
          "Dagger",
          "Hand axe",
          "Mace",
          "Pole arm",
          "Short bow",
          "Short sword",
          "Silver dagger",
          "Sling",
          "Spear",
          "Sword",
          "Warhammer"
        ],
        armorOptions: ["Leather"]
      }
    },
    henchman: {
      "Man-at-Arms": {
        odds: 15,
        weaponOptions: [
          "Battle axe",
          "Crossbow",
          "Dagger",
          "Hand axe",
          "Mace",
          "Pole arm",
          "Short bow",
          "Short sword",
          "Silver dagger",
          "Sling",
          "Spear",
          "Sword",
          "Warhammer"
        ],
        alignments: ["Law", "Neutral", "Chaos"],
        armorOptions: ["Leather", "Leather & Shield", "Chainmail", "Chainmail & Shield"]
      },
      "Torch-Bearer": {
        odds: 6,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["None"],
        armorOptions: ["None"]
      },
      Porter: {
        odds: 3,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["None"],
        armorOptions: ["None"]
      },
      Scout: {
        odds: 1,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["Hand axe", "Short bow", "Spear", "Sling"],
        armorOptions: ["None", "Leather"]
      },
      Scribe: {
        odds: 1,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["None"],
        armorOptions: ["None"]
      },
      Hunter: {
        odds: 1,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["Short bow"],
        armorOptions: ["None"]
      },
      Cook: {
        odds: 1,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["Knife"],
        armorOptions: ["None"]
      }
    }
  },
  Dwarf: {
    odds: 1,
    maxLvl: 12,
    hd: 8,
    alignments: ["Law", "Neutral"],
    weaponOptions: [
      "Battle axe",
      "Crossbow",
      "Dagger",
      "Hand axe",
      "Mace",
      "Pole arm",
      "Short bow",
      "Short sword",
      "Silver dagger",
      "Sling",
      "Spear",
      "Sword",
      "Warhammer"
    ],
    armorOptions: ["Leather", "Leather & Shield", "Chainmail", "Chainmail & Shield"]
  },
  Elf: {
    odds: 1,
    maxLvl: 10,
    hd: 6,
    alignments: ["Law", "Neutral"],
    weaponOptions: [
      "Battle axe",
      "Crossbow",
      "Dagger",
      "Hand axe",
      "Mace",
      "Pole arm",
      "Short bow",
      "Short sword",
      "Silver dagger",
      "Sling",
      "Spear",
      "Sword",
      "Warhammer"
    ],
    armorOptions: ["Leather", "Leather & Shield", "Chainmail", "Chainmail & Shield"]
  },
  Gnome: {
    odds: 1,
    maxLvl: 8,
    hd: 4,
    alignments: ["Law", "Neutral", "Chaos"],
    weaponOptions: [
      "Crossbow",
      "Dagger",
      "Hand axe",
      "Mace",
      "Short bow",
      "Short sword",
      "Silver dagger",
      "Sling",
      "Spear",
      "Sword",
      "Warhammer"
    ],
    armorOptions: ["Leather", "Leather & Shield"]
  },
  "Half-Elf": {
    odds: 1,
    maxLvl: 12,
    hd: 6,
    alignments: ["Law", "Neutral"],
    weaponOptions: [
      "Battle axe",
      "Crossbow",
      "Dagger",
      "Hand axe",
      "Mace",
      "Pole arm",
      "Short bow",
      "Short sword",
      "Silver dagger",
      "Sling",
      "Spear",
      "Sword",
      "Warhammer"
    ],
    armorOptions: ["Leather", "Leather & Shield", "Chainmail", "Chainmail & Shield"]
  },
  Halfling: {
    odds: 1,
    maxLvl: 8,
    hd: 6,
    alignments: ["Law", "Neutral"],
    weaponOptions: [
      "Crossbow",
      "Dagger",
      "Hand axe",
      "Mace",
      "Short bow",
      "Short sword",
      "Silver dagger",
      "Sling",
      "Spear",
      "Sword",
      "Warhammer"
    ],
    armorOptions: ["Leather", "Leather & Shield", "Chainmail", "Chainmail & Shield"]
  },
  "Half-Orc": {
    odds: 1,
    maxLvl: 8,
    hd: 6,
    alignments: ["Law", "Neutral", "Chaos"],
    weaponOptions: [
      "Battle axe",
      "Crossbow",
      "Dagger",
      "Hand axe",
      "Mace",
      "Pole arm",
      "Short bow",
      "Short sword",
      "Silver dagger",
      "Sling",
      "Spear",
      "Sword",
      "Warhammer"
    ],
    armorOptions: ["Leather", "Leather & Shield", "Chainmail", "Chainmail & Shield"]
  }
};

const quirks = {
  "Pet (small mammal)": 1,
  "Pet (bird)": 1,
  "Pet (reptile)": 1,
  Eyepatch: 1,
  "Gold tooth": 1,
  "Lazy eye": 1,
  "Face tattoo": 1,
  "Close talker": 1,
  Lazy: 1,
  Glutton: 1,
  Skeptical: 1,
  Zealot: 1,
  Gregarious: 1,
  Bold: 1,
  Craven: 1,
  Chaste: 1,
  Ambitious: 1,
  Stubborn: 1,
  Fickle: 1,
  Vengful: 1,
  Greedy: 1,
  Humble: 1,
  Arrogant: 1,
  Trusting: 1,
  Paranoid: 1,
  Impatient: 1,
  Patient: 1,
  Cynical: 1,
  Callous: 1,
  Sadistic: 1,
  Compassionate: 1,
  "Afraid of dark": 1,
  "Always cold": 1,
  "Always hot": 1,
  "Always itching": 1,
  "Animals despise": 1,
  Attractive: 1,
  Awkward: 1,
  "Bad breath": 1,
  "Baggy eyes": 1,
  Bearded: 1,
  "Big ears": 1,
  "Big feet": 1,
  "Big nose": 1,
  Birthmark: 1,
  "Booming voice": 1,
  Bowlegged: 1,
  "Broken nose": 1,
  "Burn scars": 1,
  Butterfingers: 1,
  "Cat-like eyes": 1,
  "Chews straw": 1,
  "Close-talker": 1,
  "Colorful eyes": 1,
  "Colorful hair": 1,
  "Crooked teeth": 1,
  Daydreamer: 1,
  "Deep voice": 1,
  "Doesn't bathe": 1,
  "Doesn't laugh": 1,
  Drunkard: 1,
  "Flaking skin": 1,
  "Funny mustache": 1,
  "Gnarled hands": 1,
  Graceful: 1,
  Hairy: 1,
  "Hissing voice": 1,
  Hugger: 1,
  Hunchback: 1,
  "Incessant sniff": 1,
  Jittery: 1,
  Juggles: 1,
  "Just a kid": 1,
  "Likes to bet": 1,
  Limp: 1,
  "Long legs": 1,
  "Long nails": 1,
  "Long neck": 1,
  "Meat-only eater": 1,
  "Missing ear": 1,
  "Missing eye": 1,
  "Missing fingers": 1,
  "Missing teeth": 1,
  Moles: 1,
  Monochrome: 1,
  "Mouth breather": 1,
  "Much makeup": 1,
  Mute: 1,
  "Nasally voice": 1,
  "Neat freak": 1,
  Old: 1,
  Overdressed: 1,
  "Overly polite": 1,
  "Peg-leg": 1,
  "Persistent cough": 1,
  "Picks teeth": 1,
  Piercings: 1,
  "Pop-eyed": 1,
  "Pops bones": 1,
  "Pot-bellied": 1,
  "Quiet voice": 1,
  "Raspy voice": 1,
  "Rubs chin": 1,
  "Sharp fingernails": 1,
  Sings: 1,
  "Six-fingered": 1,
  Slob: 1,
  "Slow-talker": 1,
  Smokes: 1,
  Snoozer: 1,
  Snorts: 1,
  Spits: 1,
  "Sticky-fingers": 1,
  Stinky: 1,
  "Stubby Ears": 1,
  Stutter: 1,
  Superstitious: 1,
  Sweaty: 1,
  Tattoos: 1,
  "Twiddles fingers": 1,
  Twitch: 1,
  Ugly: 1,
  Vegetarian: 1,
  "Very muscular": 1,
  "Very short": 1,
  "Very tall": 1,
  "Weathered skin": 1,
  "Weird eye": 1,
  Wheezy: 1,
  "Winning smile": 1,
  "Yawns a lot": 1
};

const descriptors = [
  "Abrasive",
  "Active",
  "Adventurous",
  "Affectionate",
  "Aggressive",
  "Agreeable",
  "Alluring",
  "Aloof",
  "Ambitious",
  "Angry",
  "Anxious",
  "Apathetic",
  "Artistic",
  "Athletic",
  "Attractive",
  "Authoritative",
  "Bitter",
  "Boastful",
  "Bold",
  "Brave",
  "Brooding",
  "Callous",
  "Careless",
  "Cautious",
  "Charming",
  "Cheerless",
  "Cheery",
  "Clever",
  "Compassionate",
  "Conceited",
  "Condescending",
  "Confident",
  "Confused",
  "Conscientious",
  "Cooperative",
  "Cowardly",
  "Critical",
  "Crude",
  "Cruel",
  "Cunning",
  "Dangerous",
  "Daring",
  "Deceitful",
  "Dependent",
  "Determined",
  "Disabled",
  "Disciplined",
  "Disfigured",
  "Disturbed",
  "Doomed",
  "Driven",
  "Dying",
  "Experienced",
  "Feisty",
  "Fervent",
  "Frantic",
  "Friendly",
  "Furtive",
  "Generous",
  "Glorious",
  "Glum",
  "Grandiose",
  "Greedy",
  "Gregarious",
  "Grumpy",
  "Guarded",
  "Hardhearted",
  "Harsh",
  "Haughty",
  "Helpful",
  "Honest",
  "Honorable",
  "Hostile",
  "Hot-tempered",
  "Ignorant",
  "Imperial",
  "Impulsive",
  "Incompetent",
  "Indifferent",
  "Infamous",
  "Influential",
  "Inquisitive",
  "Insensitive",
  "Insightful",
  "Intolerant",
  "Intrepid",
  "Jealous",
  "Judgmental",
  "Kind",
  "Loyal",
  "Manic",
  "Manipulative",
  "Melancholy",
  "Moody",
  "Naïve",
  "Oblivious",
  "Obsessed",
  "Old",
  "Oppressed",
  "Optimistic",
  "Pacifist",
  "Passive",
  "Perfectionist",
  "Pessimistic",
  "Pious",
  "Plucky",
  "Powerful",
  "Practical",
  "Pretentious",
  "Proper",
  "Proud",
  "Pushy",
  "Quiet",
  "Quirky",
  "Rational",
  "Rebellious",
  "Reckless",
  "Reclusive",
  "Relaxed",
  "Relentless",
  "Religious",
  "Remorseful",
  "Resolute",
  "Resourceful",
  "Romantic",
  "Ruthless",
  "Saintly",
  "Sarcastic",
  "Secretive",
  "Selfish",
  "Selfless",
  "Sheepish",
  "Shrewd",
  "Sick",
  "Skilled",
  "Slovenly",
  "Smug",
  "Sociable",
  "Spiteful",
  "Stealthy",
  "Stern",
  "Stingy",
  "Stoic",
  "Strong",
  "Stubborn",
  "Successful",
  "Surly",
  "Suspicious",
  "Tactless",
  "Talented",
  "Tenacious",
  "Thoughtful",
  "Timid",
  "Trusting",
  "Ugly",
  "Unfeeling",
  "Unpredictable",
  "Unscrupulous",
  "Unusual",
  "Valiant",
  "Vengeful",
  "Violent",
  "Virtuous",
  "Wary",
  "Weak",
  "Weary",
  "Wild",
  "Wise",
  "Witty",
  "Worry-wort",
  "Wounded",
  "Young",
  "Zealous"
];

const goals = [
  "Obtain an object",
  "Make an agreement",
  "Build a relationship",
  "Undermine a relationship",
  "Seek a truth",
  "Pay a debt",
  "Refute a falsehood",
  "Harm a rival",
  "Cure an ill",
  "Find a person",
  "Find a home",
  "Seize power",
  "Restore a relationship",
  "Create an item",
  "Travel to a place",
  "Secure provisions",
  "Rebel against power",
  "Collect a debt",
  "Protect a secret",
  "Spread faith",
  "Enrich themselves",
  "Protect a person",
  "Protect the status quo",
  "Advance status",
  "Defend a place",
  "Avenge a wrong",
  "Fulfill a duty",
  "Gain knowledge",
  "Prove worthiness",
  "Find redemption",
  "Escape from something",
  "Resolve a dispute"
];

const hirelingBackgrounds = {
  "Noble bastard": 1,
  Beggar: 2,
  Bowyer: 1,
  Butcher: 1,
  "Caravan hand": 1,
  Cultist: 3,
  Servant: 1,
  Deserter: 1,
  "Disowned noble": 1,
  Farmhand: 2,
  Fisherman: 2,
  Gambler: 1,
  Gravedigger: 1,
  "Grave robber": 1,
  Historian: 1,
  Indebted: 2,
  Juggler: 1,
  Lumberjack: 1,
  Slaver: 1,
  Mason: 1,
  Messenger: 1,
  Militia: 1,
  Mercenary: 1,
  Miller: 1,
  Minstrel: 1,
  Monk: 1,
  Peddler: 1,
  Poacher: 3,
  Refugee: 2,
  Tailor: 1,
  Vagabond: 2,
  "Temple acolyte": 1,
  Criminal: 2,
  Hermit: 1,
  Pirate: 1,
  Smuggler: 1,
  Carpenter: 1,
  Thug: 2,
  "Failed merchant": 1,
  "Failed apprentice mage": 1,
  "Stable hand": 1,
  Healer: 2,
  Bandit: 2,
  Guide: 3,
  Performer: 3,
  Miner: 3,
  Outcast: 3,
  Vagrant: 3,
  Forester: 3,
  Traveler: 3,
  Mystic: 3,
  Priest: 3,
  Sailor: 3,
  Pilgrim: 3,
  Thief: 3,
  Adventurer: 3,
  Forager: 3,
  Leader: 3,
  Guard: 3,
  Scout: 3,
  Herder: 4,
  Fisher: 3,
  Hunter: 3,
  Raider: 5,
  Trader: 2
};

class Hireling {
  constructor(level) {
    this.race = this.getRace();
    this.level = this.checkLevel(level);
    this.charClass = this.getClass();
    this.hp = this.rollHP();
    this.sex = this.rollSex();
    this.name = this.getName();
    this.surname = this.getSurname();
    this.goal = this.getGoal();
    this.descriptor = this.getDescriptor();
    this.background = this.getRandomBackground();
    this.quirk = this.getQuirk();
    this.alignment = this.getAlignment();
    this.armor = this.getArmor();
    this.weapons = this.getWeapons();
  }

  getRace() {
    const { level } = this;
    const racesArray = [];

    // level 0 peasants are always human
    if (level === 0) return "Human";

    for (const [key, value] of Object.entries(oseCharacterRaces)) {
      const { odds } = value;
      const raceArray = new Array(odds).fill(key);
      racesArray.push(...raceArray);
    }

    return racesArray[Utils.randomArrayIndex(racesArray)];
  }

  getName() {
    const { race } = this;
    const sex = this.sex === "M" ? "male" : "female";

    switch (race) {
      case "Dwarf":
        return demiHumanNames.dwarven.first[sex][
          Utils.randomArrayIndex(demiHumanNames.dwarven.first[sex])
        ];
      case "Elf":
        return demiHumanNames.elf.first[sex][Utils.randomArrayIndex(demiHumanNames.elf.first[sex])];
      case "Gnome":
        const frontCompound =
          demiHumanNames.gnome.first[sex].front[
            Utils.randomArrayIndex(demiHumanNames.gnome.first[sex].front)
          ];
        const backCompound =
          demiHumanNames.gnome.first[sex].back[
            Utils.randomArrayIndex(demiHumanNames.gnome.first[sex].back)
          ];
        return `${frontCompound}${backCompound}`;
      case "Halfling":
        return demiHumanNames.halfling.first[sex][
          Utils.randomArrayIndex(demiHumanNames.halfling.first[sex])
        ];
      case "Half-Elf":
        return demiHumanNames["half-elf"].first[sex][
          Utils.randomArrayIndex(demiHumanNames["half-elf"].first[sex])
        ];
      case "Half-Orc":
        return demiHumanNames["half-orc"].first[sex][
          Utils.randomArrayIndex(demiHumanNames["half-orc"].first[sex])
        ];
      default:
        return demiHumanNames.human.first[sex][
          Utils.randomArrayIndex(demiHumanNames.human.first[sex])
        ];
    }
  }

  getSurname() {
    const { race, sex } = this;

    switch (race) {
      case "Dwarf":
        let front =
          demiHumanNames.dwarven.last.frontCompound[
            Utils.randomArrayIndex(demiHumanNames.dwarven.last.frontCompound)
          ];
        const rear =
          demiHumanNames.dwarven.last.backCompound[
            Utils.randomArrayIndex(demiHumanNames.dwarven.last.backCompound)
          ];
        front = front.substr(0, 1).toUpperCase() + front.substr(1, front.length);
        return front.concat(rear);
      case "Elf":
        return demiHumanNames.elf.last[Utils.randomArrayIndex(demiHumanNames.elf.last)];
      case "Gnome":
        const sexTransform = sex === "M" ? "male" : "female";
        let frontCompound =
          demiHumanNames.gnome.first[sexTransform].front[
            Utils.randomArrayIndex(demiHumanNames.gnome.first[sexTransform].front)
          ];
        const backCompound =
          demiHumanNames.gnome.first[sexTransform].back[
            Utils.randomArrayIndex(demiHumanNames.gnome.first[sexTransform].back)
          ];
        frontCompound =
          frontCompound.substr(0, 1).toUpperCase() + frontCompound.substr(1, frontCompound.length);
        return `${frontCompound}${backCompound}`;
      case "Half-Elf":
        return demiHumanNames["half-elf"].last[
          Utils.randomArrayIndex(demiHumanNames["half-elf"].last)
        ];
      case "Half-Orc":
        return demiHumanNames["half-orc"].last[
          Utils.randomArrayIndex(demiHumanNames["half-orc"].last)
        ];
      default:
        const part1 = nobleHouses.rand1[Utils.randomArrayIndex(nobleHouses.rand1)];
        const part2 = nobleHouses.rand2[Utils.randomArrayIndex(nobleHouses.rand2)];

        return part1.concat(part2);
    }
  }

  checkLevel(level) {
    let maxLevel = oseCharacterRaces[this.race].maxLevel;
    if (maxLevel > 8) maxLevel = 8;

    if (level === 0 && this.race !== "Human") {
      this.race = "Human";
      return level;
    }

    return level > maxLevel ? maxLevel : level;
  }

  getClass() {
    const classesArray = [];

    if (this.race !== "Human") return "Adventurer";

    if (this.level >= 1) {
      for (const [key, value] of Object.entries(oseCharacterRaces.Human.classes)) {
        const { odds } = value;
        const classCount = new Array(odds).fill(key);
        classesArray.push(...classCount);
      }

      return classesArray[Utils.randomArrayIndex(classesArray)];
    } else {
      for (const [key, value] of Object.entries(oseCharacterRaces.Human.henchman)) {
        const { odds } = value;
        const classCount = new Array(odds).fill(key);
        classesArray.push(...classCount);
      }

      return classesArray[Utils.randomArrayIndex(classesArray)];
    }
  }

  rollHP() {
    if (this.level === 0) {
      switch (this.charClass) {
        case "Man-at-Arms":
          return Utils.randomInt(2, 6);
        case "Torch-Bearer":
          return Utils.randomInt(2, 4);
        default:
          return 2;
      }
    }

    let HD = 8;
    if (this.race !== "Human") {
      HD = oseCharacterRaces[this.race].hd;
    } else {
      HD = oseCharacterRaces.Human.classes[this.charClass].hd;
    }

    let hpArray = new Array(this.level).fill(undefined);

    return hpArray.map(() => Utils.randomInt(2, HD)).reduce((total, val) => total + val);
  }

  rollSex() {
    return Utils.randomInt(1, 10) > 3 ? "M" : "F";
  }

  getGoal() {
    return goals[Utils.randomArrayIndex(goals)];
  }

  getDescriptor() {
    return descriptors[Utils.randomArrayIndex(descriptors)];
  }

  getQuirk() {
    const quirksArray = [];

    for (let [key, odds] of Object.entries(quirks)) {
      const array = new Array(odds).fill(key);
      quirksArray.push(...array);
    }

    return quirksArray[Utils.randomArrayIndex(quirksArray)];
  }

  getRandomBackground() {
    const backgroundArray = [];

    for (let [key, odds] of Object.entries(hirelingBackgrounds)) {
      const array = new Array(odds).fill(key);
      backgroundArray.push(...array);
    }

    return backgroundArray[Utils.randomArrayIndex(backgroundArray)];
  }

  getAlignment() {
    let alignArray = undefined;
    if (this.race !== "Human") {
      alignArray = oseCharacterRaces[this.race].alignments;
    } else {
      if (this.level > 0) {
        alignArray = oseCharacterRaces.Human.classes[this.charClass].alignments;
      } else {
        alignArray = oseCharacterRaces.Human.henchman[this.charClass].alignments;
      }
    }
    return alignArray[Utils.randomArrayIndex(alignArray)];
  }

  getArmor() {
    let armorArray = undefined;
    if (this.race !== "Human") {
      armorArray = oseCharacterRaces[this.race].armorOptions;
    } else {
      if (this.level > 0) {
        armorArray = oseCharacterRaces.Human.classes[this.charClass].armorOptions;
      } else {
        armorArray = oseCharacterRaces.Human.henchman[this.charClass].armorOptions;
      }
    }
    return armorArray[Utils.randomArrayIndex(armorArray)];
  }

  getWeapons() {
    const singleRollClasses = [
      "Magic-User",
      "Illusionist",
      "Porter",
      "Torch-Bearer",
      "Scribe",
      "Scout",
      "Hunter",
      "Cook"
    ];
    let weaponsArray = undefined;
    let cClass = undefined;
    let primary = [];
    let secondary = [undefined];

    if (this.race !== "Human") {
      cClass = oseCharacterRaces[this.race];
    } else {
      cClass =
        this.level > 0
          ? oseCharacterRaces.Human.classes[this.charClass]
          : oseCharacterRaces.Human.henchman[this.charClass];
    }

    primary = cClass.weaponOptions;
    if (!singleRollClasses.includes(this.charClass)) secondary = cClass.weaponOptions;
    weaponsArray = [
      primary[Utils.randomArrayIndex(primary)],
      secondary[Utils.randomArrayIndex(secondary)]
    ].filter((e) => e !== undefined);

    return weaponsArray.length > 1 ? weaponsArray.join(", ") : weaponsArray;
  }
}

export { HirelingRoster, Hireling };

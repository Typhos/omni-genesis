import Utils from "../../components/utils";
import City from "../city";

import samuraiNamesData from "../../data/samurai/names";
import samuraiData from "../../data/samurai/samurai";
import clanQualitiesData from "../../data/samurai/clanQualities";
import clanWealthData from "../../data/samurai/wealth";
import alignmentsData from "../../data/samurai/alignments";

export default class ClanGenerator {
  constructor(params = {}) {
    this.size = this.getSize(params);
    const {
      clanHeadTitle,
      clanSize,
      clanTier,
      enterprises,
      importLimit,
      purchaseLimit,
      memberCount,
      readyWarriors,
    } = this.size;

    this.stats = {
      honor: 2,
      morale: 2,
      lore: 1,
      society: -2,
    };

    this.clanHeadTitle = clanHeadTitle;
    this.clanSize = clanSize;
    this.clanTier = clanTier;
    this.enterpriseCount = enterprises;
    this.importLimit = importLimit;
    this.purchaseLimit = purchaseLimit;
    this.memberCount = memberCount;
    this.readyWarriors = readyWarriors;

    this.alignment = this.getAlignment(params, true);
    this.alignmentShorthand = this.getAlignmentShorthand();
    this.clanName = this.getClanName();
    this.daimyo = this.getDaimyo();
    this.clanHead = new Samurai(this.clanName, this.clanHeadTitle);

    const { clanTraits, clanTraitsDescriptions } = this.getClanQualities();
    this.qualities = clanTraits;
    this.qualitiesDescriptions = clanTraitsDescriptions;
    this.wealth = this.getClanWealth();

    this.importLimit = this.importLimit * this.wealth.wealthModifier;
    this.purchaseLimit = this.purchaseLimit * this.wealth.wealthModifier;

    this.enterprises = this.getEnterprises();
    this.members = this.getNotableMembers(this.readyWarriors);

    const { name: provinceName } = new City({ culture: "japanese", size: "hamlet" });
    this.province = provinceName;
  }

  getClanName() {
    let {
      clanNames: { prefix, suffix },
    } = samuraiNamesData;

    let surname = new Array(2).fill(undefined).map((_, i) => {
      if (i === 0) {
        const rand = Utils.randomArrayIndex(prefix);
        let { part, kanji } = prefix[rand];
        return { part, kanji };
      } else {
        const rand = Utils.randomArrayIndex(suffix);
        let { part, kanji } = suffix[rand];
        part = part.toLowerCase();
        return { part, kanji };
      }
    });

    return {
      clanNameText: surname.map((el) => el.part).join(""),
      clanNameKanji: surname
        .map((el) => el.kanji)
        .join("")
        .concat("氏"), //Shi, or "Clan" is added to the end of clan names.
    };
  }

  getDaimyo() {
    const daimyoIsPartofClan = ["Large Clan", "Major Clan"];
    const { clanSize } = this.size;
    let daimyoClanName = this.clanName;

    if (!daimyoIsPartofClan.includes(clanSize)) {
      daimyoClanName = this.getClanName();
    }

    return new Samurai(daimyoClanName, "Daimyō");
  }

  getAlignment(params = {}) {
    const { alignment: userDefinedAlignment } = params;
    const { alignments: alignmentsArray } = alignmentsData;
    let output;

    if (userDefinedAlignment === "random" || !userDefinedAlignment) {
      const randNum = Utils.randomInt(1, 100);
      const { alignment } = alignmentsArray.find((el) => {
        const { range } = el;

        if (Array.isArray(range)) {
          if (randNum >= range[0] && randNum <= range[1]) return el;
        } else {
          if (range === randNum) return el;
        }
      });

      output = alignment;
    } else {
      const { alignment } = alignmentsArray.find((el) => {
        const { alignment: name } = el;
        return name.toLowerCase().includes(userDefinedAlignment);
      });

      output = alignment;
    }

    let { honor, morale, lore, society } = alignmentsArray.find((el) => el.alignment === output);

    this.stats.honor = this.stats.honor + honor;
    this.stats.morale = this.stats.morale + morale;
    this.stats.lore = this.stats.lore + lore;
    this.stats.society = this.stats.society + society;

    return output;
  }

  getAlignmentShorthand() {
    const { alignment } = this;
    const { alignments: alignmentsArray } = alignmentsData;

    return alignmentsArray.find((el) => el.alignment === alignment).shorthand;
  }

  getClanWealth() {
    let { importLimit, purchaseLimit } = this;
    const { tiers: wealthTiersArray } = clanWealthData;

    const randNum = Utils.randomInt(1, 10);

    const { level, modifier: wealthModifier } = wealthTiersArray.find((el) => {
      const { range } = el;

      if (Array.isArray(range)) {
        if (randNum >= range[0] && randNum <= range[1]) return el;
      } else {
        if (range === randNum) return el;
      }
    });

    return { level, wealthModifier };
  }

  getSize(params = {}) {
    const { size: userDefinedSize } = params;
    const clanSizeArray = ["Small Clan", "Medium Clan", "Large Clan", "Major Clan"];
    const membersCountArray = [
      [50, 1000],
      [1001, 5000],
      [5001, 10000],
      [10001, 20000],
    ];
    const clanEnterprisesArray = [1, 2, 4, 6];
    const purchaseLimitArray = [5000, 10000, 25000, 50000];
    const importLimitArray = [10000, 20000, 50000, 100000];
    const clanHeadTitleArray = ["Monogashira", "Monogashira", "Taishō", "Taishō"];

    let randNum =
      userDefinedSize !== "random"
        ? clanSizeArray.findIndex((el) => el.toLowerCase().includes(userDefinedSize))
        : Utils.randomArrayIndex(clanSizeArray);
    const clanSize = clanSizeArray[randNum];
    const clanTier = clanSize.substring(0, clanSize.indexOf(" "));

    const membersSize = membersCountArray[randNum];
    const memberCount = Utils.randomInt(membersSize[0], membersSize[1]);
    const enterprises = clanEnterprisesArray[randNum];
    const purchaseLimit = purchaseLimitArray[randNum];
    const importLimit = importLimitArray[randNum];
    const clanHeadTitle = clanHeadTitleArray[randNum];

    const readyWarriors = Math.round(memberCount * (Utils.randomInt(20, 40) / 100));

    return {
      clanSize,
      clanTier,
      readyWarriors,
      memberCount,
      enterprises,
      purchaseLimit,
      importLimit,
      clanHeadTitle,
    };
  }

  getClanQualities() {
    const { steps, alignments: alignmentsArray } = alignmentsData;
    const { traits: daimyoTraits } = this.daimyo;
    const { traits: clanHeadTraits, alignment: clanHeadAlignment } = this.clanHead;
    const { alignment: clanAlignment } = this;
    let clanTraits = [];
    let clanTraitsDescriptions = [];

    if (!steps[clanAlignment].includes(clanHeadAlignment) && clanAlignment !== clanHeadAlignment) {
      clanTraits.push("Fractured");
      const randomNum = Utils.randomArrayIndex(clanHeadTraits);
      clanTraits.push(clanHeadTraits[randomNum]);
    } else {
      const shuffleDaimyoTraits = Utils.shuffleArray(daimyoTraits);
      const shuffleClanHeadTraits = Utils.shuffleArray(clanHeadTraits);

      clanTraits.push(shuffleDaimyoTraits[0]);

      if (shuffleDaimyoTraits[0] === shuffleClanHeadTraits[0]) {
        clanTraits.push(shuffleClanHeadTraits[1]);
      } else {
        clanTraits.push(shuffleClanHeadTraits[0]);
      }
    }

    let trait3Array = alignmentsArray
      .find((el) => el.alignment === clanAlignment)
      .qualities.filter((val) => !clanTraits.includes(val));

    clanTraits.push(trait3Array[Utils.randomArrayIndex(trait3Array)]);

    clanTraits.forEach((trait) => {
      let { honor, morale, lore, society, text } = clanQualitiesData[trait];

      clanTraitsDescriptions.push(text);
      this.stats.honor = this.stats.honor + honor;
      this.stats.morale = this.stats.morale + morale;
      this.stats.lore = this.stats.lore + lore;
      this.stats.society = this.stats.society + society;
    });

    return { clanTraits, clanTraitsDescriptions };
  }

  getEnterprises() {
    const { enterprises } = clanWealthData;
    let enterpriseArray = [...enterprises];

    let output = new Array(this.enterpriseCount).fill(undefined).map((_) => {
      const randNum = Utils.randomArrayIndex(enterpriseArray);
      const result = enterpriseArray[randNum];
      enterpriseArray.splice(randNum, 1);
      return result;
    });

    return output;
  }

  getStats() {
    return {
      honor: 0,
      morale: 0,
      lore: 0,
      society: 0,
    };
  }

  getNotableMembers(warriors) {
    const count = Math.ceil(warriors / 1000);
    return new Array(count).fill(null).map((_) => new Samurai(this.clanName));
  }
}

class Samurai {
  constructor(clanName = this.clanName, title = "") {
    let { givenNames } = samuraiNamesData;
    let giveNamesArray = [...givenNames];

    const names = new Array(2).fill(undefined).map((_, i) => {
      const randNum = Utils.randomArrayIndex(giveNamesArray);

      if (i === 0) {
        let { part, kanji, meaning } = giveNamesArray[randNum];
        giveNamesArray.splice(randNum, 1);
        return { part, kanji, meaning };
      } else {
        let { part, kanji, meaning } = giveNamesArray[randNum];
        part = part.toLowerCase();
        return { part, kanji, meaning };
      }
    });

    let traits = this.getSamuraiTraits();

    // Character Classes
    const multiclass = Utils.randomInt(1, 4) === 4 ? true : false;
    const totalLevels = Utils.randomInt(5, 14);
    let characterClasses = [];

    if (!multiclass) {
      const characterLevel = totalLevels;
      const className = this.getCharacterClass();
      characterClasses.push(`${className} ${characterLevel}`);
    } else {
      const levelSplit = Utils.randomInt(1, Math.floor(totalLevels / 2));
      const classALevels = totalLevels - levelSplit;
      const classBLevels = totalLevels - classALevels;

      const classA = this.getCharacterClass();
      const classB = this.getCharacterClass(classA);

      characterClasses.push(`${classA} ${classALevels}`);
      characterClasses.push(`${classB} ${classBLevels}`);
    }

    return {
      ...clanName,
      title,
      ...traits,
      characterClasses,
      givenNameKanji: names.map((el) => el.kanji).join(""),
      givenNameText: names.map((el) => el.part).join(""),
      givenNameMeaning: names.map((el) => el.meaning).join(", "),
    };
  }

  getCharacterClass(multiclass) {
    const { samuraiClasses } = samuraiData;
    const randNum = Utils.randomInt(1, 20);
    const { name } = samuraiClasses.find((el) => {
      const { range } = el;

      if (Array.isArray(range)) {
        if (randNum >= range[0] && randNum <= range[1]) return el;
      } else {
        if (range === randNum) return el;
      }
    });

    if (name === multiclass) return this.getCharacterClass(multiclass);

    return name;
  }

  getSamuraiTraits() {
    const alignment = this.getAlignment();
    const alignmentShorthand = this.getAlignmentShorthand(alignment);
    const traitDescriptions = clanQualitiesData;

    const { samuraiTraits: traitsKeys } = samuraiData;
    const { alignments: alignmentsArray } = alignmentsData;
    const { qualities: qualitiesArray } = alignmentsArray.find((a) => a.alignment === alignment);

    const cloneArray = [...traitsKeys];

    const randInt1 = Utils.randomArrayIndex(qualitiesArray);
    const trait1 = qualitiesArray[randInt1];
    cloneArray.splice(
      cloneArray.findIndex((key) => key === qualitiesArray[randInt1]),
      1
    );

    const randInt2 = Utils.randomArrayIndex(cloneArray);
    const trait2 = cloneArray[randInt2];
    cloneArray.splice(randInt2, 1);
    const trait3 = cloneArray[Utils.randomArrayIndex(cloneArray)];

    const traits = [trait1, trait2, trait3];
    const traitsDescription = traits.map((t) => traitDescriptions[t].text);

    return { alignment, alignmentShorthand, traits, traitsDescription };
  }

  getAlignment() {
    const { alignments: alignmentsArray } = alignmentsData;
    const randNum = Utils.randomInt(1, 100);
    const { alignment } = alignmentsArray.find((el) => {
      const { range } = el;

      if (Array.isArray(range)) {
        if (randNum >= range[0] && randNum <= range[1]) return el;
      } else {
        if (range === randNum) return el;
      }
    });

    return alignment;
  }

  getAlignmentShorthand(alignment) {
    const { alignments: alignmentsArray } = alignmentsData;

    return alignmentsArray.find((el) => el.alignment === alignment).shorthand;
  }
}

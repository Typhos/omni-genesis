import Armor from "../../data/items/armor";
import ArmorNames from "../../data/items/armorNames";
import Engraving from "./engraving";
import InscriptionElements from "../../data/items/inscriptionElements";
import Items from "../../data/items/items";
import Jewelry from "../../data/items/jewelry";
import JewelryNames from "../../data/items/jewelryNames";
import MaterialData from "../../data/items/materials";
import Noble from "../person/noble";
import Person from "../person/person";
import PersonGenerator from "../person/person";
import Utils from "../../components/utils";
import WeaponNames from "../../data/items/weaponNames";
import Weapons from "../../data/items/weapons";
import magicTierData from "../../data/items/magic/tiers";
import qualityData from "../../data/items/itemQuality";

// DATA
const itemsData = {
  ...Weapons,
  ...Armor,
  ...Jewelry,
  ...Items,
};

export default class Item {
  constructor(options = {}) {
    if (global.seed === undefined) {
      Utils.setNewSeed();
    }

    const { category, type, subtype, crafter, crafterRace, qualityRange, forceMagicItem } = options;

    // either assign or randomly pick the item category, type and subtype.
    this.category = this.getRandomGroup(itemsData, category);
    this.type = this.getRandomGroup(itemsData[this.category], type);
    this.subtype = this.getRandomGroup(itemsData[this.category][this.type].subtype, subtype);

    // construct item now that we have the category, type and subtype.
    Object.assign(this, this.itemConstruction());

    // get the item quality descriptor and value modifier;
    Object.assign(this, this.getItemQuality(qualityRange, forceMagicItem));
    Object.assign(this, this.getMagical(forceMagicItem));
    Object.assign(this, this.getItemName());

    this.crafter = crafter || this.getCrafter(crafterRace);
    this.formerOwner = this.getFormerOwner();

    Object.assign(this, this.writeDescription());

    this.value = this.getItemValue();

    // console.log(this);
  }

  getRandomGroup(relativeItemDataObj, specificItemType) {
    if (specificItemType !== "all" && specificItemType !== undefined) {
      return specificItemType;
    } else {
      const categories = Object.keys(relativeItemDataObj);
      return categories[Utils.randomArrayIndex(categories)];
    }
  }

  itemConstruction() {
    // Primary item construction function

    let details = {};

    const type = itemsData[this.category][this.type];
    const item = type.subtype[this.subtype];
    const materials = item.materials || type.materials;

    details = this.getRequiredParts();
    details.primary = materials.primary;

    let prime = details.parts.find((x) => x.part === details.primary);

    if (
      prime.materialGroup === "bone" ||
      prime.materialGroup === "wood" ||
      prime.materialGroup === "glass"
    ) {
      details.primaryMaterial = `${prime.material} ${prime.materialGroup}`;
      details.primaryMaterialBaseline = `${prime.material}`;
      details.primaryGroup = prime.materialGroup;
    } else {
      details.primaryMaterial = prime.material;
      details.primaryMaterialBaseline = `${prime.material}`;
      details.primaryGroup = prime.materialGroup;
    }

    details.fiveEStats = item.stats;
    details.count = item.count;
    details.consumable = item.consumable;

    return details;
  }

  getRequiredParts() {
    const type = itemsData[this.category][this.type];
    const item = type.subtype[this.subtype];
    const materials = item.materials || type.materials;
    const requiredItemPieces = materials.required;

    let materialGroupsArray = [];
    let materialsArray = [];
    let parts = [];

    const requiredPartNames = Object.keys(requiredItemPieces);
    requiredPartNames.forEach((requiredPart) => {
      const partMaterialArray = requiredItemPieces[requiredPart];
      let partObj = {};

      partObj.part = requiredPart;

      const materialGroup = partMaterialArray[Utils.randomArrayIndex(partMaterialArray)];
      partObj.materialGroup = materialGroup;
      materialGroupsArray.push(materialGroup);

      parts.push(partObj);
    });

    // remove duplicate materials so you only have 1 metal, wood, stone, gemstone, etc.
    materialGroupsArray = Array.from(new Set(materialGroupsArray));

    // determine what each material group is specifically, ie. metal -> iron, wood -> maple.
    materialsArray = materialGroupsArray.map((material) => {
      return this.getMaterial(materials.restricted, material);
    });

    parts = parts.map((part) => {
      const index = materialGroupsArray.indexOf(part.materialGroup);
      part.material = materialsArray[index];

      return part;
    });

    return {
      parts: parts,
      materials: materialsArray,
    };
  }

  setOptionalParts(qualityRoll) {
    const type = itemsData[this.category][this.type];
    const item = type.subtype[this.subtype];
    const buildMaterials = item.materials || type.materials;
    const { optionalParts } = {
      ...buildMaterials,
    };

    // only try to make optional parts if there are any to begin with.
    if (optionalParts) {
      let { parts, materials } = this;

      if (qualityRoll >= 9) {
        Object.keys(optionalParts).forEach((part) => {
          const materialsArray = optionalParts[part];
          const materialGroup = materialsArray[Utils.randomArrayIndex(materialsArray)];
          const partMaterial = this.getMaterial(buildMaterials.restricted, materialGroup);

          parts.push({
            part: part,
            materialGroup: materialGroup,
            material: partMaterial,
          });
          materials.push(partMaterial);
        });
      } else if (qualityRoll >= 6) {
        // console.log(this);
        const partsArray = Object.keys(optionalParts);
        const part = partsArray[Utils.randomArrayIndex(partsArray)];
        const materialsArray = optionalParts[part];
        const materialGroup = materialsArray[Utils.randomArrayIndex(materialsArray)];
        const partMaterial = this.getMaterial(buildMaterials.restricted, materialGroup);

        parts.push({
          part: part,
          materialGroup: materialGroup,
          material: partMaterial,
        });
        materials.push(partMaterial);
      }

      this.parts = parts;
      this.materials = materials;
    }
  }

  getMaterial(restricted, materialGroup) {
    let group = Object.keys(MaterialData[materialGroup]);

    if (restricted && Object.keys(restricted).includes(materialGroup)) {
      // const restrictedGroup = restricted[materialGroup];
      group = group.filter((g) => !restricted[materialGroup].includes(g));
    }

    return group[Utils.randomArrayIndex(group)];
  }

  getItemQuality(
    qualityRange = {
      minQuality: 1,
      maxQuality: 10,
    },
    forceMagicItem
  ) {
    // quality roll is between 1 and 10. Each quality tier is determined by the itemQuality json
    // quality range parameter is an object with a min and max value.
    let { minQuality, maxQuality } = qualityRange;

    if (forceMagicItem) minQuality = 2;

    const qualityRoll = Utils.randomInt(minQuality, maxQuality);
    // const qualityRoll = Utils.randomInt(6, maxQuality);
    const { itemQuality } = qualityData;
    const { descriptor, valueModifier, statModifier } = itemQuality.find((quality) => {
      return Utils.numberInRange(qualityRoll, quality.rangeMin, quality.rangeMax);
    });

    let result = {
      qualityDescriptor: descriptor,
      qualityStatModifier: statModifier,
      qualityValueModifier: valueModifier,
    };

    this.setOptionalParts(qualityRoll);
    Object.assign(result, this.getExtraDetails(qualityRoll));

    return result;
  }

  getExtraDetails(qualityRoll) {
    // Determine if the item gets engravings, carvings or anything else.
    const { category, type, subtype } = this;
    let result = {};

    if (qualityRoll >= 9) {
      // add all extras
      const materials =
        itemsData[category][type].subtype[subtype].materials || itemsData[category][type].materials;
      const { extra } = materials;

      if (extra) {
        extra.forEach((element) => {
          if (element === "emblem")
            result.engraving = this.getPartEngraving(materials[element], qualityRoll);
          if (element === "carving") result.carving = this.getPartCarving(materials[element]);
        });
      }
    } else if (qualityRoll >= 6) {
      // add 1 extra
      const materials =
        itemsData[category][type].subtype[subtype].materials || itemsData[category][type].materials;
      const { extra } = materials;

      if (extra) {
        const itemEnhancement = extra[Utils.randomArrayIndex(extra)];

        if (itemEnhancement === "emblem")
          result.engraving = this.getPartEngraving(materials[itemEnhancement], qualityRoll);
        if (itemEnhancement === "carving")
          result.carving = this.getPartCarving(materials[itemEnhancement]);
      }
    }

    return result;
  }

  getPartEngraving(buildDataObj, qualityRoll) {
    // engrave a part of the item with some kind of symbol

    let engravingCount = 1;
    if (qualityRoll >= 10) {
      engravingCount = Utils.randomInt(1, 3);
    } else if (qualityRoll >= 8) {
      engravingCount = Utils.randomInt(1, 2);
    } else if (qualityRoll >= 6) {
      engravingCount = Utils.randomInt(0, 1);
    }

    let engravingString = "";

    new Array(engravingCount)
      .fill(null)
      .map(() => {
        return new Engraving(this, buildDataObj);
      })
      .forEach((engraving) => (engravingString += engraving.description));

    return engravingString;
  }

  getPartCarving(buildDataObj) {
    // shape a part to look like something else, such as a wolf-head pommel.
    const expandedDescriptionGroups = ["wood", "bone", "leather", "glass", "feather"];
    const constructionMethod = {
      metal: "forged",
      stone: "chiseled",
      leather: "bound",
    };

    const { parts } = this;
    const carveOptions = buildDataObj.parts;

    // find what parts can be carved. make an array of options from the current items.
    const carvingOptions = parts
      .map((partObj) => {
        const { part } = partObj;
        let result = null;
        carveOptions.forEach((option) => {
          if (part === option) result = part;
        });
        return result;
      })
      .filter((x) => x !== null);

    // if there is a piece to carve, do so.
    if (carvingOptions.length > 0) {
      // pick one part to carve out of the array of options.
      const pieceToCarve = carvingOptions[Utils.randomArrayIndex(carvingOptions)];
      // get the object form parts matching the piece to carve.
      const pieceObj = parts.find((p) => p.part === pieceToCarve);

      let madeBy = Object.keys(constructionMethod).find(
        (material) => pieceObj.materialGroup === material
      );
      madeBy = constructionMethod[madeBy] || "carved";

      const expandMaterialDescription = expandedDescriptionGroups.some(
        (group) => group === pieceObj.materialGroup
      );
      const materialDescription = expandMaterialDescription
        ? `${pieceObj.material} ${pieceObj.materialGroup}`
        : pieceObj.material;

      const {
        person: { single },
      } = InscriptionElements.detailThings;
      let carvingShape = single[Utils.randomArrayIndex(single)];
      let randomDataShapeDescription =
        buildDataObj.shape[Utils.randomArrayIndex(buildDataObj.shape)];

      if (randomDataShapeDescription.length > 0)
        carvingShape = carvingShape.concat(randomDataShapeDescription);

      const theEach =
        this.count > 1 || /(?!.*ss).+s$.*/.test(pieceObj.part) ? "Each of the" : "The";

      let description = `${theEach} ${materialDescription} ${pieceObj.part} is ${madeBy} in the shape of a ${carvingShape}.`;

      return description;
    }
  }

  getMagical(forceMagicItem) {
    const { itemQuality } = qualityData;
    const magicRoll = Utils.randomInt(1, 100);
    const { magicChance } = itemQuality.find((quality) => {
      return this.qualityDescriptor === quality.descriptor;
    });

    const isMagical = forceMagicItem || magicRoll <= magicChance;

    let magicalProperties = {
      isMagical: isMagical,
    };

    if (isMagical) {
      // magic item cost can range +- 20% of the base cost
      const { tiers } = magicTierData;
      const costModifier = 1 + Utils.randomInt(-20, 20) / 100;
      const tierRoll = Utils.randomInt(1, 100);
      const rolledTier = tiers.find((tier) => {
        return Utils.numberInRange(tierRoll, tier.odds[0], tier.odds[1]);
      });

      const { tier, tierValue } = rolledTier;

      magicalProperties.magicTier = tier;
      magicalProperties.magicValue = tierValue * costModifier;
      magicalProperties.enchanter = new Noble({
        jobGroup: "magic",
      });
    }

    return magicalProperties;
  }

  getItemName() {
    const { isMagical, qualityDescriptor, primaryMaterial, subtype } = this;

    let name = "";
    let descriptiveName = `${qualityDescriptor} ${primaryMaterial} ${subtype}`;

    if (isMagical) {
      name = this.getUniqueItemName();
    } else {
      name = descriptiveName;
    }

    return {
      displayName: name,
      descriptiveName: descriptiveName,
    };
  }

  getUniqueItemName() {
    const { category } = this;

    switch (category) {
      case "weapons":
        return this.getWeaponName();
      case "armor":
        // UPDATE THIS
        return this.getArmorName();
      case "items":
        return this.getGenericNames(this.subtype);
      default:
        return this.getGenericNames(this.type);
    }
  }

  getWeaponName() {
    const { weaponNames } = WeaponNames;
    const options = ["n1", "prefix", "dual", "suffix", "diablo"];
    const method = options[Utils.randomArrayIndex(options)];

    switch (method) {
      case "n1": {
        const { n1 } = weaponNames;
        return n1[Utils.randomArrayIndex(n1)];
      }
      case "dual": {
        let { n2, n3 } = weaponNames;
        const { synonyms } = itemsData[this.category][this.type];
        const synonym = synonyms[Utils.randomArrayIndex(synonyms)];

        n2 = n2[Utils.randomArrayIndex(n2)];
        n3 = n3[Utils.randomArrayIndex(n3)];

        return `${synonym} of ${n2} ${n3}`;
      }
      case "prefix": {
        let { synonyms } = itemsData[this.category][this.type];
        let synonym = synonyms[Utils.randomArrayIndex(synonyms)];

        let { n5 } = weaponNames;
        n5 = n5[Utils.randomArrayIndex(n5)];

        return `${synonym} ${n5}`;
      }
      case "suffix": {
        let { synonyms } = itemsData[this.category][this.type];
        let synonym = synonyms[Utils.randomArrayIndex(synonyms)];

        let { n4 } = weaponNames;
        n4 = n4[Utils.randomArrayIndex(n4)];

        return `${n4} ${synonym}`;
      }
      default: {
        let { synonyms } = itemsData[this.category][this.type];
        let synonym = synonyms[Utils.randomArrayIndex(synonyms)];

        let { n6 } = weaponNames;
        n6 = n6[Utils.randomArrayIndex(n6)];

        return `${synonym} of ${n6}`;
      }
    }
  }

  getArmorName() {
    const { armorNames } = ArmorNames;
    const options = ["compound", "possessive"];
    const method = options[Utils.randomArrayIndex(options)];

    switch (method) {
      case "compound": {
        let { n1, n2 } = armorNames;
        let { type } = this;
        const removal = ["light", "medium", "heavy"];
        removal.forEach((word) => {
          if (type.includes(word)) type = type.replace(word, "");
        });

        n1 = n1[Utils.randomArrayIndex(n1)];
        n2 = n2[Utils.randomArrayIndex(n2)];

        return `${type} of ${n1} ${n2}`;
      }
      default: {
        let { n3 } = armorNames;
        let { type } = this;
        const removal = ["light", "medium", "heavy"];
        removal.forEach((word) => {
          if (type.includes(word)) type = type.replace(word, "");
        });

        n3 = n3[Utils.randomArrayIndex(n3)];

        return `${n3} ${type}`;
      }
    }
  }

  getGenericNames(type) {
    const { jewelryNames } = JewelryNames;
    let { n1 } = jewelryNames;

    n1 = n1[Utils.randomArrayIndex(n1)];

    return `${type} of ${n1}`;
  }

  writeDescription() {
    const { count, type, subtype, parts, materials, enchanter, crafter } = this;
    let result = {};
    result.description = "";

    const plural = count > 1 ? true : false;
    const isAre = plural ? "are" : "is";
    const itTheyCaps = plural ? "They" : "It";

    // opening sentence.
    if (count > 1) {
      result.description += `These ${isAre} ${subtype}`;
    } else {
      result.description += `This ${isAre} a ${subtype}`;
    }
    result.description += !subtype.includes(type) ? `, a type of ${type}. ` : ". ";

    // parts
    if (parts.length > 1) result.description += `The ${subtype} has ${parts.length} parts. `;

    // console.log(materials);

    materials.forEach((mat) => {
      let arr = [];
      let materialGroups = [];

      parts.forEach((part) => {
        if (part.material === mat) {
          arr.push(part.part);
          materialGroups.push(part.materialGroup);
        }
      });

      result.description += plural ? "Each " : "The ";

      arr.forEach((part, i) => {
        if (i === 0) {
          if (materialGroups[0] === "gemstone") {
            result.description += `gemstone `;
          }
        }

        if (i >= arr.length - 1 && i !== 0) {
          result.description += ` & ${part} `;
        } else if (i < arr.length - 1 && i !== 0) {
          result.description += `, ${part}`;
        } else {
          result.description += ` ${part}`;
        }
      });

      if (arr.length >= 2 || /(?!.*ss).+s$.*/.test(result.description)) {
        result.description += ` are made of ${mat}`;
      } else {
        result.description += ` is made of ${mat}`;
      }

      if (
        materialGroups[0] === "wood" ||
        materialGroups[0] === "bone" ||
        materialGroups[0] === "leather" ||
        materialGroups[0] === "glass" ||
        materialGroups[0] === "feather"
      ) {
        result.description += ` ${materialGroups[0]}. `;
      } else {
        result.description += ". ";
      }
    });

    result.crafter = `The ${subtype} was made by the ${crafter.race} ${crafter.occupation}, ${crafter.name.displayName}.`;

    if (enchanter) {
      result.enchanter = ` ${itTheyCaps} was enchanted by the ${enchanter.race} ${enchanter.occupation}, ${enchanter.name.displayName}.`;
    }

    return result;
  }

  getCrafter(crafterRace) {
    // MAKE 10,000 people to just test for errors
    // let x = new Array(10000).fill(undefined);
    // x.map( x => new PersonGenerator());

    const materials =
      itemsData[this.category][this.type].subtype[this.subtype].materials ||
      itemsData[this.category][this.type].materials;
    const occupation = materials.maker[this.primaryGroup];
    if (crafterRace === "all") crafterRace = undefined;

    if (!this.crafter) {
      return new PersonGenerator({
        race: crafterRace,
        occupation: occupation,
      });
    }
  }

  getItemValue() {
    let {
      fiveEStats: { value },
      magicValue,
      qualityValueModifier,
      primaryGroup,
      primaryMaterialBaseline,
    } = this;

    let worth = 1;

    if (magicValue) {
      worth = Math.round(magicValue);
    } else {
      // multiply the worth of the item by the valueMultiplier of the primary material. Gold swords are worth more than bronze ones.
      const materialValueModifier =
        MaterialData[primaryGroup][primaryMaterialBaseline].valueMultiplier;
      worth = Math.round(value * qualityValueModifier * materialValueModifier);

      if (worth < 1) {
        worth = (value * qualityValueModifier).toFixed(1);
      }
    }

    return worth;
  }

  getFormerOwner() {
    const { subtype, consumable } = this;
    const hadPreviousOwner = Utils.randomInt(1, 3) >= 2;
    const formerOwner = new Person();
    const description = `This ${subtype.toLowerCase()} was once owned by ${
      formerOwner.name.displayName
    } ${formerOwner.alignmentDescription}, ${formerOwner.race} ${formerOwner.occupation}.`;

    if (hadPreviousOwner && !consumable) {
      return {
        fullStats: formerOwner,
        description,
      };
    }

    return undefined;
  }
}

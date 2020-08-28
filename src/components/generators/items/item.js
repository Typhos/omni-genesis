import Utils from "../../utils";
import PersonGenerator from "../person/person";

// DATA
import Armor from "../../../data/armor";
import Items from "../../../data/items";
import Jewelry from "../../../data/jewelry";
import MaterialData from "../../../data/materials";
import Weapons from "../../../data/weapons";

const itemsData = { ...Weapons, ...Armor, ...Jewelry, ...Items };

export default class Item {
  constructor(options = {}) {
    if (global.seed === undefined) {
      Utils.setNewSeed();
    }

    const { category, type, subtype, name, magical, artifact, engraved, carved, crafter } = options;

    this.category = category;
    this.type = type;
    this.subtype = subtype;
    this.name = name;
    this.magical = magical;
    this.artifact = artifact;
    this.engraved = engraved;
    this.carved = carved;
    this.crafter = crafter;

    this.initializeItem();
  }

  initializeItem() {
    if (this.category === "all" || this.category === undefined) {
      this.category = this.getRandomGroup(itemsData);
    }

    if (this.type === "all" || this.type === undefined) {
      this.type = this.getRandomGroup(itemsData[this.category]);
    }

    if (this.subtype === "all" || this.subtype === undefined) {
      this.subtype = this.getRandomGroup(itemsData[this.category][this.type].subtype);
    }

    Object.assign(this, this.itemConstruction());
    this.crafter = this.getCrafter();

    this.description = this.writeDescription();
  }

  getRandomGroup(obj) {
    const categories = Object.keys(obj);
    return categories[Utils.randomArrayIndex(categories)];
  }

  itemConstruction() {
    // Primary item construction function

    let details = {};

    const type = itemsData[this.category][this.type];
    const item = type.subtype[this.subtype];
    const materials = item.materials || type.materials;

    details = this.getParts(materials);
    details.primary = materials.primary;

    let prime = details.parts.find((x) => x.part === details.primary);

    if (prime.matGroup === "bone" || prime.matGroup === "wood" || prime.matGroup === "glass") {
      details.primaryMaterial = `${prime.material} ${prime.matGroup}`;
      details.primaryGroup = prime.matGroup;
    } else {
      details.primaryMaterial = prime.material;
      details.primaryGroup = prime.matGroup;
    }

    details.fiveEStats = item.stats;
    details.count = item.count;

    return details;
  }

  getParts(materials) {
    let parts = [];
    let required = materials.required;
    // let optional = materials.optional || null;
    let groupsArr = [];
    let tempMaterialsArray = [];
    let specificsArray = [];

    // randomize the various pieces of an object.
    Object.keys(required).forEach((req) => {
      groupsArr.push(required[req][Utils.randomArrayIndex(required[req])]);
    });

    //remove duplicate values with a Set
    tempMaterialsArray = Array.from(new Set(groupsArr));

    // get materials
    specificsArray = tempMaterialsArray.map((m) => this.getMaterial(materials.restricted, m));

    // loop through required parts and insert specific materials into their group holder
    Object.keys(required).forEach((req, i) => {
      let piece = {};

      piece.part = req;
      piece.matGroup = groupsArr[i];

      tempMaterialsArray.forEach((mat, i) => {
        if (mat === piece.matGroup) {
          let result = specificsArray[i];
          piece.material = result;
        }
      });

      parts.push(piece);
    });

    return {
      parts: parts,
      materials: specificsArray,
    };
  }

  getMaterial(restricted, matGroup) {
    let group = Object.keys(MaterialData[matGroup]);

    if (restricted && Object.keys(restricted).includes(matGroup)) {
      // const restrictedGroup = restricted[matGroup];
      group = group.filter((g) => !restricted[matGroup].includes(g));
    }

    return group[Utils.randomArrayIndex(group)];
  }

  writeDescription() {
    let descrip = "";

    const plural = this.count > 1 ? true : false;
    const isAre = plural ? "are" : "is";
    const itTheyCaps = plural ? "They" : "It";

    // opening sentence.
    if (this.count > 1) {
      descrip += `These ${isAre} ${this.subtype}`;
    } else {
      descrip += `This ${isAre} a ${this.subtype}`;
    }
    descrip += !this.subtype.includes(this.type) ? `, a type of ${this.type}. ` : ". ";

    // parts
    if (this.parts.length > 1) descrip += `The ${this.subtype} has ${this.parts.length} parts. `;

    this.materials.forEach((mat) => {
      let arr = [];
      let matGroups = [];

      this.parts.forEach((part) => {
        if (part.material === mat) {
          arr.push(part.part);
          matGroups.push(part.matGroup);
        }
      });

      descrip += plural ? "Each " : "The ";

      arr.forEach((part, i) => {
        if (i === 0) {
          if (matGroups[0] === "gemstone") {
            descrip += `gemstone `;
          }
        }

        if (i >= arr.length - 1 && i !== 0) {
          descrip += ` & ${part} `;
        } else if (i < arr.length - 1 && i !== 0) {
          descrip += `, ${part}`;
        } else {
          descrip += ` ${part}`;
        }
      });

      // kind of a shitty way to
      if (arr.length >= 2 || /(?!.*ss).+s$.*/.test(descrip)) {
        descrip += ` are made of ${mat}`;
      } else {
        descrip += ` is made of ${mat}`;
      }

      if (
        matGroups[0] === "wood" ||
        matGroups[0] === "bone" ||
        matGroups[0] === "leather" ||
        matGroups[0] === "glass" ||
        matGroups[0] === "feather"
      ) {
        descrip += ` ${matGroups[0]}. `;
      } else {
        descrip += ". ";
      }
    });

    descrip += `\n ${itTheyCaps} was made by the ${this.crafter.race} ${this.crafter.occupation}, ${this.crafter.name.displayName}.`;

    return descrip;
  }

  getCrafter() {
    // MAKE 10,000 people to just test for errors
    // let x = new Array(10000).fill(undefined);
    // x.map( x => new PersonGenerator());

    const materials =
      itemsData[this.category][this.type].subtype[this.subtype].materials ||
      itemsData[this.category][this.type].materials;
    const occupation = materials.maker[this.primaryGroup];

    if (!this.crafter) {
      return new PersonGenerator({ occupation: occupation });
    }
  }
}

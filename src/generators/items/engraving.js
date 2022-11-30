import InscriptionElements from "../../data/items/old/inscriptionElements";
import Materials from "../../data/items/old/materials";
import Utils from "../../components/utils";

class Part {
  constructor(item, partObj) {
    let part = this.getPartsToEngrave(partObj);
    let elements = this.getInscriptionElements(partObj);

    this.description = this.formDescriptiveSentence(item, part, elements);
  }

  getInscriptionElements(partObj) {
    const { detailThings } = InscriptionElements;
    const { design } = partObj;

    // to provide even distribution of possible results, create an array with one key entry for each element in the given array. This will provide a more even spread.
    let elementGroupKeys = design;

    if (!design) {
      elementGroupKeys = getEvenKeyDistribution();
    }

    function getEvenKeyDistribution() {
      let array = [];

      Object.keys(detailThings).forEach((key) => {
        let child = detailThings[key];
        if (!Array.isArray(child)) {
          // sub object like "person" group.
          const keys = Object.keys(child);
          keys.forEach((subKey) => {
            let count = child[subKey].length > 20 ? 20 : child[subKey].length;
            for (let i = 1; i < count; i++) {
              array.push(key);
            }
          });
        } else {
          for (let i = 1; i < child.length; i++) {
            array.push(key);
          }
        }
      });
      return array;
    }

    const elementGroupName = elementGroupKeys[Utils.randomArrayIndex(elementGroupKeys)];

    if (elementGroupName === "pattern") {
      // Patterns are just shown alone.
      const patternsArray = detailThings[elementGroupName];
      const pattern = patternsArray[Utils.randomArrayIndex(patternsArray)];
      const aAn = /^[aeiouAEIOU]/.test(pattern) ? "an" : "a";

      return `${aAn} ${pattern} pattern`;
    } else if (elementGroupName === "person") {
      return this.getPeopleEngraving(detailThings[elementGroupName]);
    } else {
      const elementArray = detailThings[elementGroupName];
      let word = elementArray[Utils.randomArrayIndex(elementArray)];
      word = this.checkForWordReplacement(word);
      const aAn = /^[aeiouAEIOU]/.test(word) ? "an" : "a";

      return `an image of ${aAn} ${word}`;
    }
  }

  checkForWordReplacement(word) {
    if (/\*(.*)\*/.test(word)) {
      word = word.replace(/\*/g, "");
      const replacementArray = Object.keys(Materials[word]);

      return replacementArray[Utils.randomArrayIndex(replacementArray)];
    }
    return word;
  }

  getPeopleEngraving(dataObj) {
    // obj of more options, currently only people obj qualifies.
    const elementSubgroupKeys = Object.keys(dataObj);

    if (Utils.coinFlip()) {
      // pose a single figure in the engraving
      const { name, isAre, aAn, plural } = getPersonElement();
      let pose = this.getCharacterPose();

      if (plural) {
        pose = pose.replace(/( a )|( an )/, " ").replace(/\(|\)/, "");
      } else {
        pose = pose.replace(/\((.*)\)/, "");
      }

      return `image of ${aAn} ${name}. The ${name} ${isAre} ${pose}`;
    } else {
      // engraving of two creatures
      const personOne = getPersonElement();
      const personTwo = getPersonElement();
      const interaction = this.getCharacterInteraction();

      const generalDescription = `image of ${personOne.plural ? "" : `${personOne.aAn}`} ${
        personOne.name
      } and ${personTwo.plural ? "" : `${personTwo.aAn}`} ${personTwo.name}.`;

      const interactionDescription = `The ${personOne.name} is ${interaction} the ${personTwo.name}`;

      return generalDescription + " " + interactionDescription;
    }

    function getPersonElement() {
      const elementSubgroupName = elementSubgroupKeys[Utils.randomArrayIndex(elementSubgroupKeys)];
      const elementSubgroup = dataObj[elementSubgroupName];
      const person = elementSubgroup[Utils.randomArrayIndex(elementSubgroup)];
      const plural = elementSubgroupName.includes("plural");

      const aAn = /^[aeiouAEIOU]/.test(person) ? "an" : "a";
      const isAre = plural ? "are" : "is";

      return {
        name: person,
        isAre: isAre,
        aAn: aAn,
        plural: plural,
      };
    }
  }

  getCharacterPose() {
    const { poses } = InscriptionElements;

    return poses[Utils.randomArrayIndex(poses)];
  }

  getCharacterInteraction() {
    const { interactions } = InscriptionElements;

    return interactions[Utils.randomArrayIndex(interactions)];
  }

  getPartsToEngrave(partObj) {
    const { parts } = partObj;

    return parts[Utils.randomArrayIndex(parts)];
  }

  formDescriptiveSentence(item, part, elements) {
    const theEach = item.count > 1 || /(?!.*ss).+s$.*/.test(item.subtype) ? "Each" : "The";
    return `${theEach} ${part} of the ${item.subtype} is engraved with ${elements}. `;
  }
}

export default Part;

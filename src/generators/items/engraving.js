import Utils from "../../components/utils";

class Part {
  constructor(partName) {
    console.log(partName);
  }
}

export default Part;

// materials: ["steel","blackthorn","bone"],
// parts: [{matGroup: "metal"
// material: "steel"
// part: "head"},{matGroup: "wood"
// material: "blackthorn"
// part: "haft"},{matGroup: ""
// material: ""
// part: "pommel"}]

// let parts = [];
//     let requiredItemPieces = materials.required;
//     let materialGroupsArray = [];
//     let tempMaterialsArray = [];
//     let specificsArray = [];

//     // for each required part of an item, ie. hilt, cross guard, blade, etc, randomly pick one of the possible material options.
//     // ie. A hilt could be made of wood or metal.
//     Object.keys(requiredItemPieces).forEach((requiredPart) => {
//       const pieces = requiredItemPieces[requiredPart];
//       materialGroupsArray.push(pieces[Utils.randomArrayIndex(pieces)]);
//     });

//     // remove duplicate values with a Set. This allows the materials to be more streamlined and logical.
//     // without this you end up with sword made of 4 different metals for no logical reason. It is simpler to have a sword where all the metal is steel instead.
//     tempMaterialsArray = Array.from(new Set(materialGroupsArray));

//     // Get the specific materials for each part of the
//     specificsArray = tempMaterialsArray.map((m) => this.getMaterial(materials.restricted, m));

//     // loop through required parts and insert specific materials into their group holder
//     Object.keys(requiredItemPieces).forEach((req, i) => {
//       let piece = {};

//       piece.part = req;
//       piece.matGroup = materialGroupsArray[i];

//       tempMaterialsArray.forEach((mat, i) => {
//         if (mat === piece.matGroup) {
//           let result = specificsArray[i];
//           piece.material = result;
//         }
//       });

//       parts.push(piece);
//     });

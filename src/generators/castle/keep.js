import Utils from "../../components/utils";
import Bailey from "./bailey";

export default class Keep extends Bailey {
  // a keep is a type of bailey which also has a central fortified tower.
  constructor(params) {
    super(params);

    this.centralTower = this.getKeep();
  }

  getKeep() {
    const material = this.getMaterial();

    return {
      material: material,
    };
  }
}

import dragonborn from "./dragonborn";
import dwarf from "./dwarf";
import elf       from "./elf";
import gnome from "./gnome";
import halfElf from "./half-elf";
import halfOrc from "./half-orc";
import halfling from "./halfling";
import human from "./human";
import tiefling from "./tiefling";

// import aasimar     from "./aasimar";
// import anubari from "./anubari";
// import drow from "./drow";
// import firbolg from "./firbolg";
// import goblin from "./goblin";
// import goliath from "./goliath";
// import hobgoblin from "./hobgoblin";
// import kenku from "./kenku";
// import kobold from "./kobold";
// import lizardfolk from "./lizardfolk";
// import marus from "./marus";
// import orc from "./orc";
// import serbonji from "./serbonji";
// import uklang from "./uklang";

export default {
  ...dwarf,
  ...elf,
  ...halfElf,
  ...human,
  ...gnome,
  ...halfling,
  ...dragonborn,
  ...halfOrc,
  ...tiefling
}

// export default {
//   ...aasimar,
//   ...anubari,
//   ...drow,
//   ...dwarf,
//   ...elf,
//   ...firbolg,
//   ...gnome,
//   ...goblin,
//   ...goliath,
//   ...halfElf,
//   ...halfling,
//   ...hobgoblin,
//   ...human,
//   ...kenku,
//   ...kobold,
//   ...lizardfolk,
//   ...marus,
//   ...orc,
//   ...serbonji,
//   ...uklang
// }
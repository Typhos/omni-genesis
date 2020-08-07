import dragonborn from "data/races/dragonborn";
import dwarf from "data/races/dwarf";
import elf       from "data/races/elf";
import gnome from "data/races/gnome";
import halfElf from "data/races/half-elf";
import halfOrc from "data/races/half-orc";
import halfling from "data/races/halfling";
import human from "data/races/human";
import tiefling from "data/races/tiefling";

// import aasimar     from "data/races/aasimar";
// import anubari from "data/races/anubari";
// import drow from "data/races/drow";
// import firbolg from "data/races/firbolg";
// import goblin from "data/races/goblin";
// import goliath from "data/races/goliath";
// import hobgoblin from "data/races/hobgoblin";
// import kenku from "data/races/kenku";
// import kobold from "data/races/kobold";
// import lizardfolk from "data/races/lizardfolk";
// import marus from "data/races/marus";
// import orc from "data/races/orc";
// import serbonji from "data/races/serbonji";
// import uklang from "data/races/uklang";

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
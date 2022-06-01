import dwarf from "./dwarf";
import elf from "./elf";
import gnome from "./gnome";
import halfElf from "./half-elf";
import halfOrc from "./half-orc";
import halfling from "./halfling";
import human from "./human";

export default {
  ...dwarf,
  ...elf,
  ...halfElf,
  ...human,
  ...gnome,
  ...halfling,
  ...halfOrc,
};

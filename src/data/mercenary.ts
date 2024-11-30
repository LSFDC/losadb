import { Mercenary } from "@/types/mercenary";

export const mercenary: Mercenary[] = [
  {
    id: "001",
    name: "Iron Knight",
    types: ["Normal", "Melee"],
  },
  {
    id: "002",
    name: "Captain Hook",

    types: ["Normal", "Melee"],
  },
  {
    id: "003",
    name: "Cowboy",
    types: ["Normal", "Range"],
  },
  {
    id: "004",
    name: "Fire Mage",
    types: ["Normal", "Magic"],
  },
  {
    id: "005",
    name: "Cyber Medic",
    types: ["Normal", "Special"],
  },
  {
    id: "006",
    name: "Savage Berserker",
    types: ["Normal", "Melee"],
  },
].map((m) => ({
  ...m,
  image: `/images/mercenary/${m.id}/${m.id}_thumb_male.jpg`,
}));

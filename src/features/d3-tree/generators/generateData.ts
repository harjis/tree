import d3 from "d3";

import { Name } from "../types";

const names: Name[] = [
  { id: 1, name: "Eve", parentId: null },
  { id: 2, name: "Cain", parentId: 1 },
  { id: 3, name: "Seth", parentId: 1 },
  { id: 4, name: "Enos", parentId: 3 },
  { id: 5, name: "Noam", parentId: 3 },
  { id: 6, name: "Abel", parentId: 1 },
  { id: 7, name: "Awan", parentId: 1 },
  { id: 8, name: "Enoch", parentId: 7 },
  { id: 9, name: "Azura", parentId: 1 },
];

export const generateData = () => {
  return d3
    .stratify<Name>()
    .id((d) => String(d.id))
    .parentId((d) => String(d.parentId))(names);
};

import React from "react";
import { Story, Meta } from "@storybook/react";

import { Tree, TreeProps } from "../index";

type Name = {
  id: number;
  name: string;
  parentId: number | null;
};

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

export default {
  title: "D3Tree",
  argTypes: {},
} as Meta;

const Template: Story<TreeProps<Name>> = (args) => {
  return (
    <div>
      <Tree
        height={args.height}
        idKey="id"
        items={names}
        labelKey="name"
        parentKey="parentId"
        width={args.width}
      />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  height: 800,
  width: 800,
};

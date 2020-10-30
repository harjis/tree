import React from "react";
import { Story, Meta } from "@storybook/react";

import { Canvas, CanvasProps, Cluster, stratify } from "../index";

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

const Template: Story<CanvasProps> = (args) => {
  const hierarchicalNames = stratify(names, "id", "parentId");
  return (
    <div>
      <Canvas height={args.height} width={args.width}>
        <Cluster
          height={args.height}
          root={hierarchicalNames}
          width={args.width}
        />
      </Canvas>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  height: 800,
  width: 800,
};

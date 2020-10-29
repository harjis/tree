import React from "react";
import { Story, Meta } from "@storybook/react";

import { Canvas, CanvasProps } from "../features/d3-tree";

export default {
  title: "Example/D3Tree",
  component: Canvas,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<CanvasProps> = (args) => (
  <div>
    <Canvas height={args.height} width={args.width}>
      <text x={10} y={10} width={10} height={10}>
        a
      </text>
    </Canvas>
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  height: 200,
  width: 200,
};

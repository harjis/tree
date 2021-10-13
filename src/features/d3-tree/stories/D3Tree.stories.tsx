import React from "react";
import { Story, Meta } from "@storybook/react";

import { Tree, TreeProps } from "../index";

import "./tree.css";
import { useSelectedTree } from "../../../hooks/useSelectedTree";

interface BaseType {
  type: string;
}
interface Folder extends BaseType {
  id: number;
  name: string;
  parentId: number | null;
  type: "folder";
}
interface Report extends BaseType {
  id: number;
  name: string;
  parentId: number | null;
  type: "report";
}

const folders: Folder[] = [
  { id: 1, name: "Root", parentId: null, type: "folder" },
  { id: 2, name: "Cats", parentId: 1, type: "folder" },
  { id: 3, name: "Dogs", parentId: 1, type: "folder" },
  { id: 4, name: "Small", parentId: 2, type: "folder" },
  { id: 5, name: "Big", parentId: 2, type: "folder" },
];

const reports: Report[] = [
  { id: 10, name: "Kitten", parentId: 4, type: "report" },
  { id: 20, name: "Kitten2", parentId: 4, type: "report" },
  { id: 30, name: "Buldog", parentId: 3, type: "report" },
  { id: 40, name: "Under root", parentId: 1, type: "report" },
  { id: 50, name: "Fatcat", parentId: 5, type: "report" },
];

export default {
  title: "D3Tree",
  argTypes: {},
} as Meta;

const Template: Story<TreeProps<Folder | Report>> = (args) => {
  const combined: Array<Report | Folder> = [...folders, ...reports];
  return (
    <div>
      <Tree
        height={args.height}
        idKey="id"
        items={combined}
        labelKey="name"
        parentKey="parentId"
        width={args.width}
        useSelectedTreeFn={useSelectedTree}
      />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  height: 800,
  width: 800,
};

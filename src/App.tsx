import React from "react";

import { Tree } from "./features/d3-tree";
import { generate } from "./dataGenerator";

/*
* Perf results:
*
* generate(3, 10)
* 1k nodes dev: useSelectedTree: 50ms which is ran 4 times. Whole thing with rendering ~270ms
* 1k nodes prod: useSelectedTree: 80ms which is ran 2 times. Whole thing with rendering ~230ms
*
* optimized 1k nodes prod: useSelectedTree: ~100ms which is ran 1 times. Whole thing with rendering ~170ms
*
* generate(3, 15)
* optimized 3k nodes prod: useSelectedTree: ~800ms which is ran 1 times. Whole thing with rendering ~1s
*
* generate(3, 20)
* 8k nodes dev: useSelectedTree: 2,5s which is ran 4 times. Whole thing with rendering ~10s
* 8k nodes prod: useSelectedTree: 3,7s which is ran 2 times. Whole thing with rendering ~8s
*
* optimized 8k nodes dev: useSelectedTree: 2.5s which is ran 2 times. Whole thing with rendering ~5.6s
* optimized 8k nodes prod: useSelectedTree: 3,7s which is ran 1 times. Whole thing with rendering ~4,5s
*
* further optimized 8k nodes prod: useSelectedTree: 20ms which is ran 1 times. Whole thing with rendering ~500ms
* */
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

function App() {
  // const combined: Array<Report | Folder> = [...folders, ...reports];
  const combined = React.useMemo(() => generate(3, 20), []);
  console.log(combined.length);
  return (
    <Tree
      height={20000}
      idKey="id"
      items={combined}
      labelKey="name"
      parentKey="parentId"
      width={500}
    />
  );
}

export default App;

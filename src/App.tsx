import React from "react";

import { Tree } from "./features/d3-tree";
import { generate } from "./dataGenerator";
import { useSelectedTreeOptimized } from "./hooks/useSelectedTreeOptimized";
import { useSelectedTree } from "./hooks/useSelectedTree";

/*
 * Perf results:
 *
 * generate(3, 10)
 * 1k nodes dev: useSelectedTree: 50ms which is ran 4 times. Whole thing with rendering ~270ms
 * 1k nodes prod: useSelectedTree: 80ms which is ran 2 times. Whole thing with rendering ~230ms
 *
 * optimized 1k nodes prod: useSelectedTree: ~100ms which is ran 1 times. Whole thing with rendering ~170ms
 * more optimized 1k nodes prod: useSelectedTree: ~100ms which is ran 1 times. Whole thing with rendering ~113ms
 *
 *
 * generate(3, 15)
 * optimized 3k nodes prod: useSelectedTree: ~800ms which is ran 1 times. Whole thing with rendering ~1s
 * more-optimized 3k nodes prod: useSelectedTree: ~800ms which is ran 1 times. Whole thing with rendering ~430ms
 *
 *
 * generate(3, 20)
 * 8k nodes dev: useSelectedTree: 2,5s which is ran 4 times. Whole thing with rendering ~10s
 * 8k nodes prod: useSelectedTree: 3,7s which is ran 2 times. Whole thing with rendering ~8s
 *
 * optimized 8k nodes dev: useSelectedTree: 2.5s which is ran 2 times. Whole thing with rendering ~5.6s
 * optimized 8k nodes prod: useSelectedTree: 3,7s which is ran 1 times. Whole thing with rendering ~4,5s
 *
 * more-optimized 8k nodes prod: useSelectedTree: 1.2s which is ran 1 times. Whole thing with rendering ~2s
 * -> Sometimes I get really weird results: search takes 20ms and whole thing around ~800ms
 * */

function App() {
  // const combined: Array<Report | Folder> = staticData();
  const combined = React.useMemo(() => generate(3, 10), []);
  const itemLength = combined.length;
  console.log("items in data structure: ", itemLength);
  let height = 1000;
  if (itemLength < 100) {
    height = 800;
  } else if (itemLength < 2000) {
    height = 40000;
  } else if (itemLength > 2000 && itemLength < 7000) {
    height = 130000;
  } else if (itemLength > 7000) {
    height = 300000;
  }

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div>
        Optimised: (Or at least tries to be)
        <Tree
          height={height}
          idKey="id"
          items={combined}
          labelKey="name"
          parentKey="parentId"
          width={500}
          useSelectedTreeFn={useSelectedTreeOptimized}
        />
      </div>

      <div>
        Un-optimised:
        <Tree
          height={height}
          idKey="id"
          items={combined}
          labelKey="name"
          parentKey="parentId"
          width={500}
          useSelectedTreeFn={useSelectedTree}
        />
      </div>
    </div>
  );
}

export default App;

// interface BaseType {
//   type: string;
// }
// interface Folder extends BaseType {
//   id: number;
//   name: string;
//   parentId: number | null;
//   type: "folder";
// }
// interface Report extends BaseType {
//   id: number;
//   name: string;
//   parentId: number | null;
//   type: "report";
// }
//
// function staticData() {
//   const folders: Folder[] = [
//     { id: 1, name: "Root", parentId: null, type: "folder" },
//     { id: 2, name: "Cats", parentId: 1, type: "folder" },
//     { id: 3, name: "Dogs", parentId: 1, type: "folder" },
//     { id: 4, name: "Small", parentId: 2, type: "folder" },
//     { id: 5, name: "Big", parentId: 2, type: "folder" },
//     { id: 6, name: "Empty folder", parentId: 1, type: "folder" },
//   ];
//
//   const reports: Report[] = [
//     { id: 10, name: "Kitten", parentId: 4, type: "report" },
//     { id: 20, name: "Kitten2", parentId: 4, type: "report" },
//     { id: 30, name: "Buldog", parentId: 3, type: "report" },
//     { id: 40, name: "Under root", parentId: 1, type: "report" },
//     { id: 50, name: "Fatcat", parentId: 5, type: "report" },
//   ];
//
//   return [...folders, ...reports];
// }

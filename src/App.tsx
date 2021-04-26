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
* generate(3, 20)
* 8k nodes dev: useSelectedTree: 2,5s which is ran 4 times. Whole thing with rendering ~10s
* 8k nodes prod: useSelectedTree: 3,7s which is ran 2 times. Whole thing with rendering ~8s
* */
function App() {
  const combined = React.useMemo(() => generate(3, 10), []);
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

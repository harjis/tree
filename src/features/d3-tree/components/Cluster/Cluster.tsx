import React from "react";
import { HierarchyNode } from "d3";

import { render } from "./Cluster-d3";

export type Props<T> = {
  height: number;
  highlightedItemId: string | undefined;
  labelKey: keyof T;
  tree: HierarchyNode<T>;
  selectedItemIds: Set<string>;
  width: number;
};

const InternalCluster = <T,>(props: Props<T>) => {
  const ref = React.useRef<SVGGElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      render(ref.current, props);
    }
  }, [props]);
  return <g ref={ref} />;
};

// Memo hack: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087#issuecomment-568218789
interface IdentityFunction {
  <T>(fn: T): T;
}
const typedMemo: IdentityFunction = React.memo;
export const Cluster = typedMemo(InternalCluster);

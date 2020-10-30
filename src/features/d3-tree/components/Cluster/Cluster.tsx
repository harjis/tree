import React, { PropsWithChildren } from "react";
import { HierarchyNode } from "d3";

import { render } from "./Cluster-d3";

export type Props<T> = {
  root: HierarchyNode<T>;
  labelKey: keyof T;
  height: number;
  width: number;
};
export const Cluster = <T,>(props: PropsWithChildren<Props<T>>) => {
  const ref = React.useRef<SVGGElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      render(ref.current, props);
    }
  }, [props]);
  return <g ref={ref} />;
};

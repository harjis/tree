import React, { PropsWithChildren } from "react";

import { Canvas } from "../Canvas";
import { Cluster } from "../Cluster";
import { stratify } from "../../utils/stratify";

export type Props<T> = {
  height: number;
  idKey: keyof T;
  items: T[];
  labelKey: keyof T;
  parentKey: keyof T;
  width: number;
};
export const Tree = <T,>(props: PropsWithChildren<Props<T>>) => {
  const hierarchicalNames = stratify(props.items, props.idKey, props.parentKey);
  return (
    <div>
      <Canvas height={props.height} width={props.width}>
        <Cluster
          height={props.height}
          root={hierarchicalNames}
          labelKey={props.labelKey}
          width={props.width}
        />
      </Canvas>
    </div>
  );
};

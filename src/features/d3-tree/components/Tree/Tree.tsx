import React, { PropsWithChildren } from "react";

import { Canvas } from "../Canvas";
import { Cluster } from "../Cluster";
import { stratify } from "../../utils/stratify";
import { useSelectedTree } from "../../../../hooks/useSelectedTree";

export type Props<T> = {
  height: number;
  idKey: keyof T;
  items: T[];
  labelKey: keyof T;
  parentKey: keyof T;
  width: number;
};
export const Tree = <T,>(props: PropsWithChildren<Props<T>>) => {
  const tree = stratify(props.items, props.idKey, props.parentKey);
  const { search, onSearch, selectedTree } = useSelectedTree({
    idKey: props.idKey,
    items: props.items,
    itemKey: props.labelKey,
    tree,
  });
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(event) => {
          const value = event.currentTarget.value;
          onSearch(value);
        }}
      />
      <Canvas height={props.height} width={props.width}>
        <Cluster
          height={props.height}
          idKey={props.idKey}
          labelKey={props.labelKey}
          root={tree}
          selectedItemIds={new Set()}
          width={props.width}
        />
      </Canvas>
    </div>
  );
};

import React, { PropsWithChildren } from "react";

import { Canvas } from "../Canvas";
import { Cluster } from "../Cluster";
import { stratify } from "../../utils/stratify";
import useSearch from "../../../../hooks/useSearch";

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
  const { filteredItems, search, onSearch } = useSearch({
    items: props.items,
    itemKey: props.labelKey,
  });
  console.log(filteredItems);
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
          root={hierarchicalNames}
          labelKey={props.labelKey}
          width={props.width}
        />
      </Canvas>
    </div>
  );
};

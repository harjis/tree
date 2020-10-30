import React, { PropsWithChildren } from "react";

import { Canvas } from "../Canvas";
import { Cluster } from "../Cluster";
import { stratify } from "../../utils/stratify";
import { useSelectedItems } from "../../../../hooks/useSelectedItems";

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
  const { selectedItems, search, onSearch } = useSelectedItems({
    items: props.items,
    itemKey: props.labelKey,
  });
  const selectedItemIds = React.useMemo(
    () => new Set([...selectedItems.map((item) => item[props.idKey])]),
    [selectedItems]
  );
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
          root={hierarchicalNames}
          selectedItemIds={selectedItemIds}
          width={props.width}
        />
      </Canvas>
    </div>
  );
};

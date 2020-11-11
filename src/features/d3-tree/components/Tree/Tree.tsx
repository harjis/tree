import React, { PropsWithChildren } from "react";

import { BaseItem } from "../../types";
import { Canvas } from "../Canvas";
import { Cluster } from "../Cluster";
import { stratify } from "../../utils/stratify";
import { useSelectedTree } from "../../../../hooks/useSelectedTree";
import { useHighlightedTreeItem } from "../../../../hooks/useHighlightedTreeItem";

export type Props<T> = {
  height: number;
  idKey: keyof T;
  items: T[];
  labelKey: keyof T;
  parentKey: keyof T;
  width: number;
};
export const Tree = <T extends BaseItem>(
  props: PropsWithChildren<Props<T>>
) => {
  // In our app all d3 related stuff could be completely inside the useSelectedTree hook
  // I have them here because Cluster takes tree as props
  const tree = React.useMemo(
    () => stratify(props.items, props.idKey, props.parentKey),
    [props.items, props.idKey, props.parentKey]
  );
  const { search, onSearch, selectedItemIds } = useSelectedTree({
    items: props.items,
    itemKey: props.labelKey,
    tree,
  });

  const highlightedTreeItem = useHighlightedTreeItem({ tree });

  return (
    <div tabIndex={0} ref={highlightedTreeItem.hotkeyRef}>
      Press arrow keys to navigate! <br />
      Search:{" "}
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
          highlightedItemId={highlightedTreeItem.highlightedItemId}
          labelKey={props.labelKey}
          tree={tree}
          selectedItemIds={selectedItemIds}
          width={props.width}
        />
      </Canvas>
    </div>
  );
};

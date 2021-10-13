import React, { PropsWithChildren } from "react";

import s from "./Tree.module.css";

import { BaseItem } from "../../types";
import { Canvas } from "../Canvas";
import { Cluster } from "../Cluster";
import { stratify } from "../../utils/stratify";
import { useHighlightedTreeItem } from "../../../../hooks/useHighlightedTreeItem";
import { IUseSelectedTree } from "../../../../hooks/IUseSelectedTree";

export const hookStart = "hook-start";
export const hookEnd = "hook-end";

export type Props<T> = {
  height: number;
  idKey: keyof T;
  items: T[];
  labelKey: keyof T;
  parentKey: keyof T;
  width: number;
  useSelectedTreeFn: IUseSelectedTree;
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
  const { useSelectedTreeFn } = props;
  performance.mark(hookStart);
  const { search, onSearch, selectedItemIds } = useSelectedTreeFn({
    items: props.items,
    itemKey: props.labelKey,
    tree,
  });
  performance.mark(hookEnd);
  performance.measure("measure hook-start to hook-end", hookStart, hookEnd);

  console.log(
    `Hook performance (${useSelectedTreeFn.name}): ${
      performance.getEntriesByType("measure")[0].duration
    }ms`
  );
  performance.clearMeasures();

  const highlightedTreeItem = useHighlightedTreeItem({ tree });

  return (
    <div
      className={s.container}
      tabIndex={0}
      ref={highlightedTreeItem.hotkeyRef}
    >
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
      <div className={s.canvasContainer}>
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
    </div>
  );
};

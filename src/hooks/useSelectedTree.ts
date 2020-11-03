import React from "react";
import { HierarchyNode } from "d3";

import {
  Props as UseSelectedItemsProps,
  ReturnType as UseSelectedItemsReturnType,
  useSelectedItems,
} from "./useSelectedItems";
import { BaseItem } from "../features/d3-tree/types";

type ItemMap<T> = { [id: string]: T };
type Props<T> = {
  items: UseSelectedItemsProps<T>["items"];
  itemKey: UseSelectedItemsProps<T>["itemKey"];
  tree: HierarchyNode<T>;
};

type ReturnType<T> = {
  search: UseSelectedItemsReturnType<T>["search"];
  onSearch: UseSelectedItemsReturnType<T>["onSearch"];
  selectedItemIds: Set<string>;
};
export const useSelectedTree = <T extends BaseItem>(
  props: Props<T>
): ReturnType<T> => {
  const { selectedItems, search, onSearch } = useSelectedItems<T>({
    items: props.items,
    itemKey: props.itemKey,
  });

  const itemsMap: ItemMap<T> = React.useMemo(
    () =>
      props.items.reduce((acc, cur) => ({ ...acc, [String(cur.id)]: cur }), {}),
    [props.items]
  );

  const selectedItemIds = React.useMemo(() => {
    const selectedItemIds = getSelectedIds(selectedItems);
    const selectedNodes = getSelectedNodes(
      selectedItemIds,
      itemsMap,
      props.tree
    );
    return getSelectedNodesAndAllTheirParents(props.tree, selectedNodes);
  }, [itemsMap, props.tree, selectedItems]);

  return {
    search,
    onSearch,
    selectedItemIds,
  };
};

function getSelectedIds<T extends BaseItem>(selectedItems: T[]): string[] {
  return selectedItems.map((item) => {
    const value = item["id"];
    if (typeof value === "number") {
      return String(value);
    } else if (typeof value === "string") {
      return value;
    } else {
      throw new Error("Only strings and numbers are supported for ids");
    }
  });
}

function getSelectedNodes<T extends BaseItem>(
  selectedItemIds: string[],
  itemsMap: ItemMap<T>,
  tree: HierarchyNode<T>
): HierarchyNode<T>[] {
  return selectedItemIds.flatMap((id) => {
    const selectedItem = itemsMap[id];
    // TODO It would be better to abstract folders and reports out from this and use more generic
    // terms for node's which don't have children and which do.
    // I think d3 uses "leaf node" and "node" respectively
    if (selectedItem.type === "folder") {
      //@ts-ignore missing from types
      const treeItem = tree.find((d) => d.id === id);
      return treeItem ? treeItem.children : [];
    } else {
      //@ts-ignore missing from types
      return [tree.find((d) => d.id === id)];
    }
  });
}

function getSelectedNodesAndAllTheirParents<T extends BaseItem>(
  tree: HierarchyNode<T>,
  selectedNodes: HierarchyNode<T>[]
) {
  // String(node.id) because of d3 type is id?: string; but we always have id
  return new Set(
    selectedNodes
      .flatMap((node) => {
        return tree.path(node);
      })
      .map((node) => String(node.id))
  );
}

import React from "react";
import { HierarchyNode } from "d3";

import {
  Props as UseSelectedItemsProps,
  ReturnType as UseSelectedItemsReturnType,
  useSelectedItems,
} from "./useSelectedItems";
import { BaseItem } from "../features/d3-tree/types";

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

  const itemsMap: { [id: string]: T } = React.useMemo(
    () =>
      props.items.reduce((acc, cur) => ({ ...acc, [String(cur.id)]: cur }), {}),
    [props.items]
  );

  const selectedItemIds = React.useMemo(() => {
    const selectedItemIds = selectedItems.map((item) => {
      const value = item["id"];
      if (typeof value === "number") {
        return String(value);
      } else if (typeof value === "string") {
        return value;
      } else {
        throw new Error("Only strings and numbers are supported for ids");
      }
    });

    const selectedNodes: HierarchyNode<T>[] = selectedItemIds.flatMap((id) => {
      const selectedItem = itemsMap[id];
      // TODO It would be better to abstract folders and reports out from this and use more generic
      // terms for node's which don't have children and which do.
      // I think d3 uses "leaf node" and "node" respectively
      if (selectedItem.type === "folder") {
        //@ts-ignore missing from types
        const treeItem = props.tree.find((d) => d.id === id);
        return treeItem ? treeItem.children : [];
      } else {
        //@ts-ignore missing from types
        return [props.tree.find((d) => d.id === id)];
      }
    });

    const selectedPaths = selectedNodes.flatMap((node) => {
      return props.tree.path(node);
    });

    // String(node.id) because of d3 type is id?: string; but we always have id
    return new Set([...selectedPaths.map((node) => String(node.id))]);
  }, [itemsMap, props.tree, selectedItems]);

  return {
    search,
    onSearch,
    selectedItemIds,
  };
};

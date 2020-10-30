import React from "react";
import { HierarchyNode } from "d3";

import {
  Props as UseSelectedItemsProps,
  ReturnType as UseSelectedItemsReturnType,
  useSelectedItems,
} from "./useSelectedItems";

type Props<T> = {
  idKey: keyof T;
  items: UseSelectedItemsProps<T>["items"];
  itemKey: UseSelectedItemsProps<T>["itemKey"];
  tree: HierarchyNode<T>;
};

type ReturnType<T> = {
  search: UseSelectedItemsReturnType<T>["search"];
  onSearch: UseSelectedItemsReturnType<T>["onSearch"];
  selectedItemIds: Set<string>;
};
export const useSelectedTree = <T>(props: Props<T>): ReturnType<T> => {
  const { selectedItems, search, onSearch } = useSelectedItems({
    items: props.items,
    itemKey: props.itemKey,
  });
  const selectedItemIds = React.useMemo(() => {
    const selectedItemIds = [...selectedItems.map((item) => item[props.idKey])];
    const selectedNodes: HierarchyNode<T>[] = selectedItemIds.map((id) => {
      //@ts-ignore missing from types
      return props.tree.find((d) => d.id === String(id));
    });
    const selectedPaths = selectedNodes.flatMap((node) => {
      return props.tree.path(node);
    });
    // String(node.id) because of d3 type. Should not be needed
    return new Set([...selectedPaths.map((node) => String(node.id))]);
  }, [props.idKey, props.tree, selectedItems]);

  return {
    search,
    onSearch,
    selectedItemIds,
  };
};

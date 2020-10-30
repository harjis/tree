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
  selectedTree: HierarchyNode<T>;
};
export const useSelectedTree = <T>(props: Props<T>): ReturnType<T> => {
  const { selectedItems, search, onSearch } = useSelectedItems({
    items: props.items,
    itemKey: props.itemKey,
  });
  const selectedItemIds = React.useMemo(
    () => new Set([...selectedItems.map((item) => item[props.idKey])]),
    [props.idKey, selectedItems]
  );

  console.log(selectedItemIds);

  return {
    search: search,
    onSearch: onSearch,
    selectedTree: props.tree,
  };
};

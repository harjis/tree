import React, { useMemo } from "react";
import { HierarchyNode } from "d3";

import {
  Props as UseSelectedItemsProps,
  ReturnType as UseSelectedItemsReturnType,
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
  const [search, setSearch] = React.useState("");
  const onSearch = (value: string): void => {
    const resetSearch = (): void => {
      setSearch("");
    };
    if (value === "") return resetSearch();
    // We are not setting filteredItems here on purpose. Setting only search string ends up in the effect
    // few lines above.
    // If hook receives new items we want to maintain the search and do it for the new items. This is
    // why we have the effect and why it's not necessary the filter items in this function or in resetSearch
    // setFilteredItems(doSearch(value));
    setSearch(value);
  };

  const selectedItemIds = useMemo(() => {
    const itemsTemp: Set<string> = new Set();
    if (search.length === 0) {
      return itemsTemp;
    }
    props.items.forEach((item) => {
      const filteredItemValue = item[props.itemKey];
      if (
        typeof filteredItemValue === "string" &&
        filteredItemValue.toLocaleLowerCase().includes(search.toLowerCase())
      ) {
        // @ts-ignore
        const treeItem: HierarchyNode<T> = props.tree.find(
          //@ts-ignore missing from types
          (d) => String(d.id) === String(item.id)
        );
        const selectedNodes =
          item.type === "folder"
            ? treeItem && treeItem.children
              ? treeItem.children
              : []
            : //@ts-ignore missing from types
              [props.tree.find((d) => String(d.id) === String(item.id))];
        selectedNodes
          .flatMap((node) => {
            return props.tree.path(node);
          })
          .map((node) => itemsTemp.add(String(node.id)));
      }
    });
    return itemsTemp;
  }, [props.itemKey, props.items, props.tree, search]);

  return {
    search,
    onSearch,
    selectedItemIds,
  };
};

function getSelectedNodes<T extends BaseItem>(
  selectedItems: T[],
  tree: HierarchyNode<T>
): HierarchyNode<T>[] {
  return selectedItems.flatMap((selectedItem) => {
    // TODO It would be better to abstract folders and reports out from this and use more generic
    // terms for node's which don't have children and which do.
    // I think d3 uses "leaf node" and "node" respectively
    if (selectedItem.type === "folder") {
      //@ts-ignore missing from types
      const treeItem = tree.find(
        //@ts-ignore missing from types
        (d) => String(d.id) === String(selectedItem.id)
      );

      return treeItem && treeItem.children ? treeItem.children : [];
    } else {
      //@ts-ignore missing from types
      return [tree.find((d) => String(d.id) === String(selectedItem.id))];
    }
  });
}

function getSelectedNodesAndAllTheirParents<T extends BaseItem>(
  tree: HierarchyNode<T>,
  selectedNodes: HierarchyNode<T>[]
): Set<string> {
  // String(node.id) because of d3 type is id?: string; but we always have id
  return new Set(
    selectedNodes
      .flatMap((node) => {
        return tree.path(node);
      })
      .map((node) => String(node.id))
  );
}

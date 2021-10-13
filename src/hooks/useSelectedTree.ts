import React, { useMemo } from "react";
import { HierarchyNode } from "d3";
import { useDebounce } from "react-use";

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
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  useDebounce(
    () => {
      setDebouncedSearch(search);
    },
    200,
    [search]
  );

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
    if (debouncedSearch.length === 0) {
      return itemsTemp;
    }
    props.tree.each((treeItem) => {
      const filteredItemValue = treeItem.data[props.itemKey];
      if (
        typeof filteredItemValue === "string" &&
        filteredItemValue
          .toLocaleLowerCase()
          .includes(debouncedSearch.toLowerCase())
      ) {
        let selectedNodes = [treeItem];
        if (treeItem.data.type === "folder" && treeItem.children) {
          selectedNodes = selectedNodes.concat(treeItem.children);
        }
        selectedNodes.forEach((node) => {
          props.tree.path(node).forEach((a) => {
            itemsTemp.add(String(a.data.id));
          });
        });
      }
    });
    return itemsTemp;
  }, [props.itemKey, props.tree, debouncedSearch]);

  return {
    search,
    onSearch,
    selectedItemIds,
  };
};

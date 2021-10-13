import { HierarchyNode } from "d3";

import { BaseItem } from "../features/d3-tree/types";
import { Props as UseSelectedItemsProps } from "./useSearch";
import { ReturnType as UseSelectedItemsReturnType } from "./useSelectedItems";

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

export interface IUseSelectedTree {
  <T extends BaseItem>(props: Props<T>): ReturnType<T>;
}

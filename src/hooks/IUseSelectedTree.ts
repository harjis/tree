import { HierarchyNode } from "d3";

import { BaseItem } from "../features/d3-tree/types";
import {
  ReturnType as UseSearchReturnType,
  Props as UseSelectedItemsProps,
} from "./useSearch";

type Props<T> = {
  items: UseSelectedItemsProps<T>["items"];
  itemKey: UseSelectedItemsProps<T>["itemKey"];
  tree: HierarchyNode<T>;
};

type ReturnType<T> = {
  search: UseSearchReturnType<T>["search"];
  onSearch: UseSearchReturnType<T>["onSearch"];
  selectedItemIds: Set<string>;
};

export interface IUseSelectedTree {
  <T extends BaseItem>(props: Props<T>): ReturnType<T>;
}

import React from "react";
import { HierarchyNode } from "d3";

import { useSearch } from "./useSearch";
import { BaseItem } from "../features/d3-tree/types";
import { IUseSelectedTree } from "./IUseSelectedTree";

export const useSelectedTree: IUseSelectedTree = (props) => {
  const { filteredItems, search, onSearch } = useSearch({
    items: props.items,
    itemKey: props.itemKey,
  });

  const selectedItemIds = React.useMemo(() => {
    const selectedNodes = getSelectedNodes(filteredItems, props.tree);
    return getSelectedNodesAndAllTheirParents(props.tree, selectedNodes);
  }, [filteredItems, props.tree]);

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

      const selectedNodes = [treeItem];
      return treeItem.children
        ? selectedNodes.concat(treeItem.children)
        : selectedNodes;
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

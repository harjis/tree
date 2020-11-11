import React from "react";
import { HierarchyNode } from "d3";

import { useHotkeys } from "./useHotkeys";

type Props<Item> = {
  tree: HierarchyNode<Item>;
};
type ReturnType<Element> = {
  hotkeyRef: React.RefCallback<Element>;
  highlightedItemId: string | undefined;
};
export const useHighlightedTreeItem = <Item, Element extends HTMLElement>(
  props: Props<Item>
): ReturnType<Element> => {
  const [highlightedItemId, setHighlightedItemId] = React.useState<
    string | undefined
  >(props.tree.id);
  // useMemo so that useHotkeys refCallback doesn't cleanup on
  // every render
  const eventListeners = React.useMemo(
    () => [
      {
        keys: ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
        eventListener: (event: KeyboardEvent) => {
          event.stopPropagation();
          if (event.key === "ArrowRight") {
            setHighlightedItemId(
              selectFirstChild(props.tree, highlightedItemId)
            );
          } else if (event.key === "ArrowLeft") {
            setHighlightedItemId(selectParent(props.tree, highlightedItemId));
          } else if (event.key === "ArrowUp") {
            setHighlightedItemId(
              selectTopSideSibling(props.tree, highlightedItemId)
            );
          } else if (event.key === "ArrowDown") {
            setHighlightedItemId(
              selectBottomSideSibling(props.tree, highlightedItemId)
            );
          }
        },
      },
    ],
    [highlightedItemId, props.tree]
  );
  const hotkeyRef = useHotkeys({
    autoFocus: true,
    eventListeners,
  });

  return {
    hotkeyRef,
    highlightedItemId,
  };
};

function selectFirstChild<Item>(
  tree: HierarchyNode<Item>,
  currentlyHighlightedItemId: string | undefined
) {
  //@ts-ignore missing from types
  const highLightedItem: HierarchyNode<Item> = tree.find(
    (d: HierarchyNode<Item>) => d.id === currentlyHighlightedItemId
  );
  if (highLightedItem.children) {
    return highLightedItem.children[0].id;
  }
  return currentlyHighlightedItemId;
}

function selectParent<Item>(
  tree: HierarchyNode<Item>,
  currentlyHighlightedItemId: string | undefined
) {
  //@ts-ignore missing from types
  const highLightedItem: HierarchyNode<Item> = tree.find(
    (d: HierarchyNode<Item>) => d.id === currentlyHighlightedItemId
  );
  if (highLightedItem.parent) {
    return highLightedItem.parent.id;
  }
  return currentlyHighlightedItemId;
}

function selectTopSideSibling<Item>(
  tree: HierarchyNode<Item>,
  currentlyHighlightedItemId: string | undefined
) {
  //@ts-ignore missing from types
  const highLightedItem: HierarchyNode<Item> = tree.find(
    (d: HierarchyNode<Item>) => d.id === currentlyHighlightedItemId
  );

  const siblings: HierarchyNode<Item>[] = [];
  tree.each((d: HierarchyNode<Item>) => {
    if (d.depth === highLightedItem.depth) {
      siblings.push(d);
    }
  });
  const currentIndex = siblings.findIndex(
    (sibling) => sibling.id === highLightedItem.id
  );

  if (siblings[currentIndex - 1]) {
    return siblings[currentIndex - 1].id;
  } else {
    return highLightedItem.id;
  }
}

// Copy-pasta for now!
function selectBottomSideSibling<Item>(
  tree: HierarchyNode<Item>,
  currentlyHighlightedItemId: string | undefined
) {
  //@ts-ignore missing from types
  const highLightedItem: HierarchyNode<Item> = tree.find(
    (d: HierarchyNode<Item>) => d.id === currentlyHighlightedItemId
  );

  const siblings: HierarchyNode<Item>[] = [];
  tree.each((d: HierarchyNode<Item>) => {
    if (d.depth === highLightedItem.depth) {
      siblings.push(d);
    }
  });
  const currentIndex = siblings.findIndex(
    (sibling) => sibling.id === highLightedItem.id
  );

  if (siblings[currentIndex + 1]) {
    return siblings[currentIndex + 1].id;
  } else {
    return highLightedItem.id;
  }
}

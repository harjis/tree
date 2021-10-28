import React from "react";
import { useDebounce } from "react-use";

export type Props<T> = {
  items: T[];
  itemKey: keyof T;
  options?: { caseSensitive: boolean };
};
export type ReturnType<T> = {
  debouncedSearch: string;
  filteredItems: T[];
  onSearch: (value: string) => void;
  search: string;
};
export const initialState = {
  filteredItems: [],
  onSearch: () => {
    throw new Error("Implement onSearch");
  },
  search: "",
};
export function useSearch<T>({
  items,
  itemKey,
  options,
}: Props<T>): ReturnType<T> {
  const [search, setSearch] = React.useState("");
  const [debouncedState, setDebouncedState] = React.useState<{
    items: T[];
    debouncedSearch: string;
  }>({
    items: [],
    debouncedSearch: "",
  });

  const doSearch = React.useCallback(
    (value: string): T[] =>
      options && options.caseSensitive
        ? caseSensitiveFilteringService(items, itemKey, value)
        : filteringService(items, itemKey, value),
    [itemKey, items, options]
  );

  useDebounce(
    () => {
      if (search !== "") {
        setDebouncedState({ debouncedSearch: search, items: doSearch(search) });
      } else {
        setDebouncedState({ debouncedSearch: search, items: [] });
      }
    },
    200,
    [search]
  );

  const onSearch = (value: string): void => {
    // We are not setting filteredItems here on purpose. Setting only search string ends up in the effect
    // few lines above.
    // If hook receives new items we want to maintain the search and do it for the new items. This is
    // why we have the effect and why it's not necessary the filter items in this function or in resetSearch
    // setFilteredItems(doSearch(value));
    setSearch(value);
  };

  return {
    debouncedSearch: debouncedState.debouncedSearch,
    search,
    filteredItems: debouncedState.items,
    onSearch,
  };
}

function filteringService<T>(items: T[], itemKey: keyof T, value: string) {
  return items.reduce<T[]>((acc, filteredItem) => {
    const filteredItemValue = filteredItem[itemKey];
    if (
      typeof filteredItemValue === "string" &&
      filteredItemValue.toLocaleLowerCase().includes(value.toLowerCase())
    ) {
      return [...acc, filteredItem];
    } else {
      return acc;
    }
  }, []);
}

function caseSensitiveFilteringService<T>(
  items: T[],
  itemKey: keyof T,
  value: string
) {
  return items.reduce<T[]>((acc, filteredItem) => {
    const filteredItemValue = filteredItem[itemKey];
    if (
      typeof filteredItemValue === "string" &&
      filteredItemValue.includes(value)
    ) {
      return [...acc, filteredItem];
    } else {
      return acc;
    }
  }, []);
}

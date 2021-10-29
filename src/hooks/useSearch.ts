import React, { useMemo } from "react";
import { useDebounce } from "react-use";
import { SearchService } from "../services/SearchService";

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
  const searchService = SearchService({ items, itemKey, options });
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
    // We are not setting filteredItems here on purpose. Setting only search string ends up in the effect
    // few lines above.
    // If hook receives new items we want to maintain the search and do it for the new items. This is
    // why we have the effect and why it's not necessary the filter items in this function or in resetSearch
    // setFilteredItems(doSearch(value));
    setSearch(value);
  };

  const filteredItems = useMemo(
    () =>
      debouncedSearch !== "" ? searchService.doSearch(debouncedSearch) : [],
    [debouncedSearch, searchService]
  );

  return {
    debouncedSearch,
    search,
    filteredItems,
    onSearch,
  };
}

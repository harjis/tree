import useSearch, { Props, ReturnType as SearchReturnType } from "./useSearch";

type ReturnType<T> = {
  search: SearchReturnType<T>["search"];
  onSearch: SearchReturnType<T>["onSearch"];
  selectedItems: T[];
};
export const useSelectedItems = <T>(props: Props<T>): ReturnType<T> => {
  const search = useSearch(props);

  return {
    search: search.search,
    onSearch: search.onSearch,
    selectedItems: search.search === "" ? [] : search.filteredItems,
  };
};

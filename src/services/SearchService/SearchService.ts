import { caseSensitiveSearch, nonCaseSensitiveSearch } from "./utils";

type Options = {
  caseSensitive: boolean;
};
type Props<T> = {
  items: T[];
  itemKey: keyof T;
  options?: Options;
};
export type Return<T> = {
  doSearch: (value: string) => T[];
  search: string;
};
export function SearchService<T>(props: Props<T>): Return<T> {
  const items = props.items;
  const itemKey = props.itemKey;
  const options = props.options;
  let search = "";

  return {
    doSearch: (newSearch) => {
      search = newSearch;
      return options && options.caseSensitive
        ? caseSensitiveSearch(items, itemKey, newSearch)
        : nonCaseSensitiveSearch(items, itemKey, newSearch);
    },
    search,
  };
}

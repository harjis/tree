export function nonCaseSensitiveSearch<T>(
  items: T[],
  itemKey: keyof T,
  value: string
) {
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

export function caseSensitiveSearch<T>(
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

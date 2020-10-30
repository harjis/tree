import { stratify as d3Stratify } from "d3";

export const stratify = <T>(data: T[], id: keyof T, parentId: keyof T) => {
  return d3Stratify<T>()
    .id((d) => String(d[id]))
    .parentId((d) => {
      // For some reason null is not acceptable parentId and it that case it should be ""
      // Maybe it has something to do with CSVs since this is supposed to be used for reading CSV data
      return d[parentId] === null ? "" : String(d[parentId]);
    })(data);
};

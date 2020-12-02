import { AppItem } from "../../types";

export const filterArr = (arr: AppItem[], text: string) => {
  return arr.filter(
    (item) =>
      item.label.toLowerCase().includes(text) ||
      item.name.toLowerCase().includes(text) ||
      item.summary.toLowerCase().includes(text) ||
      item.author.toLowerCase().includes(text)
  );
};

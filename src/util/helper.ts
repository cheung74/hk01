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

export const mappingAppData = (arrData: any[]) => {
  return arrData.map((item) => ({
    averageRating: item.averageUserRating,
    ratingCount: item.userRatingCount,
    image: item.artworkUrl100,
    name: item.trackCensoredName,
    label: Array.isArray(item.genres) && item.genres[0],
    summary: item.description,
    author: item.sellerName,
  }));
};

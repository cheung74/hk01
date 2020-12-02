import { useState, useEffect, useCallback } from "react";

export const useFetchTopFreeAppList = () => {
  const [filteredTopFreeAppList, setFilteredTopFreeAppList] = useState<any[]>(
    []
  );
  const [wholeTopFreeAppList, setWholeTopFreeAppList] = useState<any[]>([]);

  const [topFreeAppListStatus, setTopFreeAppListStatus] = useState<
    boolean | null
  >(null);
  const fetchTopFreeAppList = useCallback(async () => {
    try {
      const req = await fetch(
        "https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json"
      );
      const {
        feed: { entry },
      } = await req.json();
      const mergedArr = await Promise.all(
        entry.map(async (item: any) => {
          const appId = item.id.attributes["im:id"];
          const req = await fetch(
            `https://itunes.apple.com/hk/lookup?id=${appId}`
          );
          const { results } = await req.json();
          const averageRating = results[0].averageUserRating;
          const ratingCount = results[0].userRatingCount;
          const image = item["im:image"][2].label;
          const name = item["im:name"].label;
          const label = item.category.attributes.label;
          const summary = item.summary.label;
          const author = item["im:artist"].label;
          return {
            averageRating,
            ratingCount,
            image,
            name,
            label,
            summary,
            author,
          };
        })
      );
      const currentShownList = mergedArr.slice(0, 10);
      await setWholeTopFreeAppList(mergedArr);
      await setFilteredTopFreeAppList(currentShownList);
      await setTopFreeAppListStatus(true);
    } catch (err) {
      await setTopFreeAppListStatus(false);
    }
  }, []);

  useEffect(() => {
    fetchTopFreeAppList();
  }, []);

  return {
    filteredTopFreeAppList,
    setFilteredTopFreeAppList,
    wholeTopFreeAppList,
    setWholeTopFreeAppList,
    topFreeAppListStatus,
    setTopFreeAppListStatus,
  };
};

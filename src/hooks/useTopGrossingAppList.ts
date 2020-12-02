import { useState, useEffect, useCallback } from "react";
import { AppItem } from "../../types";

export const useTopGrossingAppList = () => {
  const [topGrossingAppList, setTopGrossingAppList] = useState<AppItem[]>([]);
  const [filteredTopGrossingAppList, setFilteredTopGrossingAppList] = useState<
    AppItem[]
  >([]);
  const [fetchTopFeeAppListStatus, setFetchTopFeeAppListStatus] = useState<
    boolean | null
  >(null);
  const fetchTopGrossingAppList = useCallback(async () => {
    try {
      const req = await fetch(
        "https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json"
      );
      const {
        feed: { entry },
      } = await req.json();
      const keyDataArr: AppItem[] = await Promise.all(
        entry.map(async (item: any) => ({
          image: item["im:image"][2].label,
          name: item["im:name"].label,
          label: item.category.attributes.label,
          summary: item.summary.label,
          author: item["im:artist"].label,
        }))
      );
      await setTopGrossingAppList(keyDataArr);
      await setFilteredTopGrossingAppList(keyDataArr);
      await setFetchTopFeeAppListStatus(true);
    } catch (err) {
      await setFetchTopFeeAppListStatus(false);
    }
  }, []);
  useEffect(() => {
    if (!fetchTopFeeAppListStatus) fetchTopGrossingAppList();
  }, [fetchTopFeeAppListStatus]);
  return {
    topGrossingAppList,
    setTopGrossingAppList,
    filteredTopGrossingAppList,
    setFilteredTopGrossingAppList,
    fetchTopFeeAppListStatus,
    setFetchTopFeeAppListStatus,
  };
};

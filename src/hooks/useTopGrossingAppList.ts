import { useState, useEffect, useCallback } from "react";

export const useTopGrossingAppList = () => {
  const [topGrossingAppList, setTopGrossingAppList] = useState<any[]>([]);
  const [filteredTopGrossingAppList, setFilteredTopGrossingAppList] = useState<
    any[]
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
      await setTopGrossingAppList(entry);
      await setFilteredTopGrossingAppList(entry);
      await setFetchTopFeeAppListStatus(true);
    } catch (err) {
      await setFetchTopFeeAppListStatus(false);
    }
  }, []);
  useEffect(() => {
    fetchTopGrossingAppList();
  }, []);
  return {
    topGrossingAppList,
    setTopGrossingAppList,
    filteredTopGrossingAppList,
    setFilteredTopGrossingAppList,
    fetchTopFeeAppListStatus,
    setFetchTopFeeAppListStatus,
  };
};

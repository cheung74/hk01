import { AppItem } from "./../../types";
import { useState, useEffect, useCallback } from "react";
import { mappingAppData } from "../util/helper";

export const useFetchTopFreeAppList = () => {
  const [filteredTopFreeAppList, setFilteredTopFreeAppList] = useState<
    AppItem[]
  >([]);
  const [wholeTopFreeAppList, setWholeTopFreeAppList] = useState<AppItem[]>([]);

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
      const arr: any[] = [];

      entry.map((item: any) => {
        const appId = item.id.attributes["im:id"];
        appId && arr.push(appId);
      });
      const appDataReq = await fetch(
        `https://itunes.apple.com/hk/lookup?id=${arr}`
      );
      const { results } = await appDataReq.json();
      const mergedArr: AppItem[] = mappingAppData(results);
      const currentShownList = mergedArr.slice(0, 10);
      await setWholeTopFreeAppList(mergedArr);
      await setFilteredTopFreeAppList(currentShownList);
      await setTopFreeAppListStatus(true);
    } catch (err) {
      await setTopFreeAppListStatus(false);
    }
  }, []);

  useEffect(() => {
    if (!topFreeAppListStatus) fetchTopFreeAppList();
  }, [topFreeAppListStatus]);

  return {
    filteredTopFreeAppList,
    setFilteredTopFreeAppList,
    wholeTopFreeAppList,
    setWholeTopFreeAppList,
    topFreeAppListStatus,
    setTopFreeAppListStatus,
  };
};

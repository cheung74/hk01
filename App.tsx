import * as React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SearchHeader } from "./src/components/header";
import { AppListing } from "./src/components/listing";
import { useOrientation } from "./src/hooks/useOrientation";
export default function App() {
  const [input, setInput] = React.useState("");
  const orientation = useOrientation();
  const [topGrossingAppList, setTopGrossingAppList] = React.useState<any[]>([]);
  const [
    filteredTopGrossingAppList,
    setFilteredTopGrossingAppList,
  ] = React.useState<any[]>([]);
  const [
    fetchTopFeeAppListStatus,
    setFetchTopFeeAppListStatus,
  ] = React.useState<boolean | null>(null);

  const [filteredTopFreeAppList, setFilteredTopFreeAppList] = React.useState<
    any[]
  >([]);
  const [wholeTopFreeAppList, setWholeTopFreeAppList] = React.useState<any[]>(
    []
  );

  const [topFreeAppListStatus, setTopFreeAppListStatus] = React.useState<
    boolean | null
  >(null);
  const [page, setPage] = React.useState(1);

  const fetchTopGrossingAppList = React.useCallback(async () => {
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

  const fetchTopFreeAppList = React.useCallback(async () => {
    try {
      const req = await fetch(
        "https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json"
      );
      const {
        feed: { entry },
      } = await req.json();
      const currentShownList = entry.slice(0, 10);
      await setWholeTopFreeAppList(entry);
      await setFilteredTopFreeAppList(currentShownList);
      await setTopFreeAppListStatus(true);
    } catch (err) {
      await setTopFreeAppListStatus(false);
    }
  }, []);

  //change lazy loading list item
  React.useEffect(() => {
    if (page > 1 && input === "") {
      const currentList = wholeTopFreeAppList.slice(0, page * 10);
      setFilteredTopFreeAppList(currentList);
    }
  }, [page, input]);

  React.useEffect(() => {
    if (input) {
      const filteredData = topGrossingAppList.filter(
        (item) =>
          item["im:name"].label.includes(input) ||
          item.category.attributes.label.includes(input) ||
          item.summary.label.includes(input) ||
          item["im:artist"].label.includes(input)
      );
      setFilteredTopGrossingAppList(filteredData);
      const newFilteredList = wholeTopFreeAppList.filter(
        (item) =>
          item["im:name"].label.includes(input) ||
          item.category.attributes.label.includes(input) ||
          item.summary.label.includes(input) ||
          item["im:artist"].label.includes(input)
      );
      setFilteredTopFreeAppList(newFilteredList);
    } else {
      setFilteredTopGrossingAppList(topGrossingAppList);
    }
  }, [input]);

  React.useEffect(() => {
    Promise.all([fetchTopFreeAppList(), fetchTopGrossingAppList()]);
  }, []);
  return (
    <View style={[styles.container]}>
      {fetchTopFeeAppListStatus && topFreeAppListStatus ? (
        <>
          <SearchHeader {...{ input, setInput }} />
          <AppListing
            topFreeAppList={filteredTopFreeAppList}
            recommendationData={filteredTopGrossingAppList}
            {...{ setPage, page }}
          />
        </>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
  },
});

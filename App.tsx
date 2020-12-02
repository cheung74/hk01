import * as React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SearchHeader } from "./src/components/header";
import { AppListing } from "./src/components/listing";
import _ from "lodash";

export default function App() {
  const [input, setInput] = React.useState("");
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

  //change lazy loading list item
  React.useEffect(
    _.debounce(() => {
      if (page > 1 && input === "") {
        const currentList = wholeTopFreeAppList.slice(0, page * 10);
        setFilteredTopFreeAppList(currentList);
      }
    }, 500),
    [page, input]
  );

  const filterSearchInput = React.useCallback(
    _.debounce((input) => {
      if (input) {
        const filteredData = topGrossingAppList.filter(
          (item) =>
            item["im:name"].label.toLowerCase().includes(input.toLowerCase()) ||
            item.category.attributes.label
              .toLowerCase()
              .includes(input.toLowerCase()) ||
            item.summary.label.toLowerCase().includes(input.toLowerCase()) ||
            item["im:artist"].label.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredTopGrossingAppList(filteredData);
        const newFilteredList = wholeTopFreeAppList.filter(
          (item) =>
            item.label.toLowerCase().includes(input.toLowerCase()) ||
            item.summary.toLowerCase().includes(input.toLowerCase()) ||
            item.author.toLowerCase().includes(input.toLowerCase()) ||
            item.name.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredTopFreeAppList(newFilteredList);
      } else {
        setFilteredTopGrossingAppList(topGrossingAppList);
      }
    }, 800),
    []
  );

  const debounceHandleInput = (input: string) => {
    filterSearchInput(input);
    setInput(input);
  };

  // wait all api responses
  React.useEffect(() => {
    Promise.all([fetchTopFreeAppList(), fetchTopGrossingAppList()]);
  }, []);

  return (
    <View style={[styles.container]}>
      {fetchTopFeeAppListStatus && topFreeAppListStatus ? (
        <>
          <SearchHeader {...{ input, setInput: debounceHandleInput }} />
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

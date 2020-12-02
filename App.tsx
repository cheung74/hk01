import * as React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SearchHeader } from "./src/components/header";
import { AppListing } from "./src/components/listing";
import _ from "lodash";
import { useTopGrossingAppList } from "./src/hooks/useTopGrossingAppList";
import { useFetchTopFreeAppList } from "./src/hooks/useFetchTopFreeAppList";
export default function App() {
  const [input, setInput] = React.useState("");

  const {
    topGrossingAppList,
    filteredTopGrossingAppList,
    setFilteredTopGrossingAppList,
    fetchTopFeeAppListStatus,
  } = useTopGrossingAppList();

  const {
    filteredTopFreeAppList,
    setFilteredTopFreeAppList,
    wholeTopFreeAppList,
    topFreeAppListStatus,
  } = useFetchTopFreeAppList();

  const [page, setPage] = React.useState(1);

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
    }, 300),
    []
  );

  const debounceHandleInput = (input: string) => {
    filterSearchInput(input);
    setInput(input);
  };

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

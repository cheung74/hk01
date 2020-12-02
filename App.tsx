import * as React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SearchHeader } from "./src/components/header";
import { AppListing } from "./src/components/listing";
import _, { filter } from "lodash";
import { useTopGrossingAppList } from "./src/hooks/useTopGrossingAppList";
import { useFetchTopFreeAppList } from "./src/hooks/useFetchTopFreeAppList";
import { AppItem } from "./types";
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

  const filterArr = (arr: AppItem[], text: string) => {
    return arr.filter(
      (item) =>
        item.label.toLowerCase().includes(text) ||
        item.name.toLowerCase().includes(text) ||
        item.summary.toLowerCase().includes(text) ||
        item.author.toLowerCase().includes(text)
    );
  };
  
  const filterSearchInput = _.debounce((input: string) => {
    if (input) {
      const text = input.toLowerCase();
      const filteredData = filterArr(topGrossingAppList, text);
      setFilteredTopGrossingAppList(filteredData);
      const newFilteredList = filterArr(wholeTopFreeAppList, text);
      setFilteredTopFreeAppList(newFilteredList);
    } else {
      setFilteredTopGrossingAppList(topGrossingAppList);
    }
  }, 800);

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

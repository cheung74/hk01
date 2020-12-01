import * as React from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import { SearchHeader } from "./src/components/header";
import { AppListing } from "./src/components/listing";

export default function App() {
  const [input, setInput] = React.useState("搜尋");
  const [data, setData] = React.useState<any[]>([]);
  const [filteredData, setFilteredData] = React.useState<any[]>([]);

  const [status, setStatus] = React.useState<boolean | null>(null);
  const [list, setList] = React.useState<any[]>([]);
  const [filteredList, setFilteredList] = React.useState<any[]>([]);

  const [wholeList, setWholeList] = React.useState<any[]>([]);
  //lazy loading state
  const [listStatus, setListStatus] = React.useState<boolean | null>(null);
  const [page, setPage] = React.useState(1);
  
  const fetchList = React.useCallback(async () => {
    try {
      const req = await fetch(
        "https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json"
      );
      const res = await req.json();
      await setWholeList(res.feed.entry);
      await setList(res.feed.entry.slice(0, 10));
      await setFilteredList(res.feed.entry.slice(0, 10));
      await setListStatus(true);
    } catch (err) {
      await setListStatus(false);
    }
  }, []);

  const fetchData = React.useCallback(async () => {
    try {
      const req = await fetch(
        "https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json"
      );
      const res = await req.json();
      await setData(res.feed.entry);
      await setFilteredData(res.feed.entry);
      await setStatus(true);
    } catch (err) {
      await setStatus(false);
    }
  }, []);

  React.useEffect(() => {
    if (page > 1) {
      const currentList = wholeList.slice(0, page * 10);
      setFilteredList(currentList);
    }
  }, [page]);

  React.useEffect(() => {
    if (input) {
      const filteredData = data.filter(
        (item) =>
          item["im:name"].label.includes(input) ||
          item.category.attributes.label.includes(input) ||
          item.summary.label.includes(input) ||
          item["im:artist"].label.includes(input)
      );
      setFilteredData(filteredData);
      const newFilteredList = list.filter(
        (item) =>
          item["im:name"].label.includes(input) ||
          item.category.attributes.label.includes(input) ||
          item.summary.label.includes(input) ||
          item["im:artist"].label.includes(input)
      );
      setFilteredList(newFilteredList);
    } else {
      return;
    }
  }, [input]);

  React.useEffect(() => {
    Promise.all([fetchData(), fetchList()]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {listStatus && status ? (
        <>
          <SearchHeader {...{ input, setInput }} />
          <AppListing
            list={filteredList}
            data={filteredData}
            {...{ setPage, page }}
          />
        </>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

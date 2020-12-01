import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SearchHeader } from "./src/components/header";
import { AppListing } from "./src/components/listing";
import { AppList, Recommendation } from "./src/components/recommendation";
export default function App() {
  const [input, setInput] = React.useState("搜尋");
  const [data, setData] = React.useState<any[]>([]);
  const [status, setStatus] = React.useState<boolean | null>(null);
  const [list, setList] = React.useState<any[]>([]);
  const [wholeList, setWholeList] = React.useState<any[]>([]);
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
      await setStatus(true);
    } catch (err) {
      await setStatus(false);
    }
  }, []);

  React.useEffect(() => {
    if (page > 1) {
      const currentList = wholeList.slice(0, page * 10);
      setList(currentList);
    }
  }, [page]);

  React.useEffect(() => {
    Promise.all([fetchData(), fetchList()]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader {...{ input, setInput }} />
      <Recommendation />
      {status && <AppList {...{ data }} />}
      {listStatus && <AppListing data={list} {...{ setPage, page }} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

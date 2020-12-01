import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SearchHeader } from "./src/header";

export default function App() {
  const [input, setInput] = React.useState("搜尋");
  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader {...{ input, setInput }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    // marginHorizontal: 8,
  },
});

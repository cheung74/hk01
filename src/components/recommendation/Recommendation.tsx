import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {}

const Recommendation = (props: Props) => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>推介</Text>
    </View>
  );
};

export default React.memo(Recommendation);

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 32,
    justifyContent: "flex-start",
    alignItems: "baseline",
    flexDirection: "column",
    width: "100%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

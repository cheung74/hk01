import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppList from "./AppList";
import { color } from "../../constant/color";
interface Props {
  recommendationData: Array<any>;
}

const Recommendation: React.FC<Props> = ({ recommendationData }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recommendation</Text>
      {recommendationData && <AppList {...{ recommendationData }} />}
    </View>
  );
};

export default React.memo(Recommendation);

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    justifyContent: "flex-start",
    alignItems: "baseline",
    flexDirection: "column",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: color.darkGrey,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
    marginBottom: 16,
  },
});

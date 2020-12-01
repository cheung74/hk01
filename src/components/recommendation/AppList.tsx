import * as React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import AppItem from "./AppItem";
import { color } from "../../constant/color";
interface AppListProps {
  data: Array<any>;
}

const AppList: React.FC<AppListProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {data.map((item: any, index: number) => (
          <AppItem
            key={index}
            image={item["im:image"][2].label}
            name={item["im:name"].label}
            label={item["im:contentType"].attributes.label}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
  },
  scrollView: {
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: color.darkGrey,
  },
});
export default React.memo(AppList);

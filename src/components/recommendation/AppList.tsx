import * as React from "react";
import { ScrollView, View, StyleSheet, FlatList } from "react-native";
import AppItem from "./AppItem";
import { color } from "../../constant/color";
interface AppListProps {
  data: Array<any>;
}

const AppList: React.FC<AppListProps> = ({ data }) => {
  const renderItem = ({ item, i }: any) => (
    <AppItem
      image={item["im:image"][2].label}
      name={item["im:name"].label}
      label={item["im:contentType"].attributes.label}
    />
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal={true}
        keyExtractor={(_, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    paddingHorizontal: 8,
  },
});
export default React.memo(AppList);

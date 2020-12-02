import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AppItem from "./AppItem";
interface AppListProps {
  recommendationData: Array<any>;
}

const AppList: React.FC<AppListProps> = ({ recommendationData }) => {
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
        data={recommendationData}
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

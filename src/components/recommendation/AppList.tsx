import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AppItem from "./AppItem";
interface AppListProps {
  recommendationData: Array<any>;
}

const AppList: React.FC<AppListProps> = ({ recommendationData }) => {
  const renderItem = ({ item }: any) => (
    <AppItem image={item.image} name={item.name} label={item.label} />
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

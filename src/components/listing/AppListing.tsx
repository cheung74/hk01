import * as React from "react";
import { FlatList, ScrollView, Text } from "react-native";

import ListItem from "./ListItem";

interface Props {
  data: Array<any>;
  setPage: (page: number) => void;
  page: number;
}

const AppListing: React.FC<Props> = ({ data, setPage, page }) => {
  const renderITem = ({ item, index }: any) => (
    <ListItem
      image={item["im:image"][2].label}
      ranking={(index + 1).toString()}
      round={index % 2 ? true : false}
      name={item["im:name"].label}
      label={item["im:contentType"].attributes.label}
    />
  );
  return (
    <FlatList
      style={{ width: "100%" }}
      data={data}
      renderItem={renderITem}
      onEndReached={() => setPage(page + 1)}
      keyExtractor={(_, i) => i.toString()}
    />
  );
};

export default React.memo(AppListing);

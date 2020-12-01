import * as React from "react";
import { FlatList, Text } from "react-native";
import { Recommendation } from "../recommendation";
import ListItem from "./ListItem";

interface Props {
  list: Array<any>;
  data: Array<any>;
  setPage: (page: number) => void;
  page: number;
}

const AppListing: React.FC<Props> = ({ list, setPage, page, data }) => {
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
      data={list}
      renderItem={renderITem}
      onEndReached={() => setPage(page + 1)}
      keyExtractor={(_, i) => i.toString()}
      ListHeaderComponent={() => <Recommendation {...{ data }} />}
    />
  );
};

export default React.memo(AppListing);

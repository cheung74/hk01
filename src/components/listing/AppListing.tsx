import * as React from "react";
import { FlatList, Text } from "react-native";
import { Recommendation } from "../recommendation";
import ListItem from "./ListItem";

interface Props {
  topFreeAppList: Array<any>;
  recommendationData: Array<any>;
  setPage: (page: number) => void;
  page: number;
}

const AppListing: React.FC<Props> = ({
  topFreeAppList,
  setPage,
  page,
  recommendationData,
}) => {
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
      data={topFreeAppList}
      renderItem={renderITem}
      onEndReached={() => setPage(page + 1)}
      keyExtractor={(_, i) => i.toString()}
      ListHeaderComponent={() => <Recommendation {...{ recommendationData }} />}
    />
  );
};

export default React.memo(AppListing);

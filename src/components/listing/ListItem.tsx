import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { color } from "../../constant/color";
import { Entypo } from "@expo/vector-icons";
interface Props {
  image: string;
  name: string;
  label: string;
  ranking: string;
  round: boolean;
  averageRating: number;
  ratingCount: number;
}

const ListItem: React.FC<Props> = ({
  image,
  name,
  label,
  ranking,
  round,
  averageRating,
  ratingCount,
}) => {
  const renderRantingIcon = (rating: number) => {
    const iconActiveState = [];
    for (let i = 1; i <= rating; i++) {
      iconActiveState.push(rating - i > 0 ? true : false);
    }
    while (iconActiveState.length < 5) {
      iconActiveState.push(false);
    }
    return (
      <View style={{ flexDirection: "row" }}>
        {iconActiveState.map((status: boolean, i: number) => (
          <Entypo
            name={status ? "star" : "star-outlined"}
            size={12}
            color="orange"
            key={i.toString()}
          />
        ))}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.rank}>{ranking}</Text>
      <Image
        source={{ uri: image, cache: "force-cache" }}
        style={[styles.image, { borderRadius: round ? 30 : 16 }]}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.label}>{label}</Text>
        <View style={{ flexDirection: "row", marginTop: 3 }}>
          {renderRantingIcon(Math.round(averageRating))}
          <Text
            style={{
              fontSize: 10,
              color: color.textColor,
              alignSelf: "center",
            }}
          >
            ({ratingCount})
          </Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(ListItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: color.darkGrey,
  },
  image: {
    width: 60,
    height: 60,
    margin: 8,
  },
  rank: {
    fontSize: 16,
    marginRight: 4,
    color: color.textColor,
    width: 30,
    textAlign: "center",
  },
  textContainer: {
    justifyContent: "flex-start",
    height: 50,
    width: 200,
  },
  name: {
    marginVertical: 2,
    marginBottom: 5,
  },
  label: {
    color: color.textColor,
    fontSize: 11,
  },
});

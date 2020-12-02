import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { color } from "../../constant/color";
interface Props {
  image: string;
  name: string;
  label: string;
  ranking: string;
  round: boolean;
}

const ListItem: React.FC<Props> = ({ image, name, label, ranking, round }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.rank}>{ranking}</Text>
      <Image
        source={{ uri: image, cache: 'force-cache' }}
        style={[styles.image, { borderRadius: round ? 30 : 16 }]}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.label}>{label}</Text>
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

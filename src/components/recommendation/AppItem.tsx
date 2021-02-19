import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { color } from "../../constant/color";
interface AppItemProps {
  image: string;
  name: string;
  label: string;
}

const AppItem = ({ image, name, label }: AppItemProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image, cache: "force-cache" }}
        style={styles.image}
      />
      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default React.memo(AppItem);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 16,
  },
  name: {
    fontSize: 10,
    marginTop: 8,
    width: 75,
  },
  label: {
    fontSize: 10,
    marginTop: 8,
    color: color.textColor,
  },
});

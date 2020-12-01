import { Feather } from "@expo/vector-icons";
import * as React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { color } from "../../constant/color";
interface Props {
  input: string;
  setInput: (text: string) => void;
}

const SearchHeader: React.FC<Props> = ({ input, setInput }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Feather name="search" size={16} color={color.textColor} />
        <TextInput
          style={{ color: color.textColor }}
          value={input}
          onChangeText={(text) => setInput(text)}
          onFocus={() => setInput("")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(227,228,229)",
    height: 32,
    width: "100%",
    borderRadius: 8,
  },
  container: {
    backgroundColor: color.lightGrey,
    width: "100%",
    height: 46,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: color.darkGrey,
    paddingHorizontal: 16,
  },
});

export default React.memo(SearchHeader);
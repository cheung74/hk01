import { Feather } from "@expo/vector-icons";
import * as React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { color } from "../../constant/color";
interface Props {
  input: string;
  setInput: (text: string) => void;
}

const SearchHeader: React.FC<Props> = ({ input, setInput }) => {
  const [inActive, setInActive] = React.useState(false);
  const ref_input = React.useRef<any>(null);
  React.useEffect(() => {
    if (inActive) {
      ref_input.current.focus();
    }
  }, [inActive]);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setInActive(true)}>
        <View style={styles.textContainer}>
          <Feather name="search" size={16} color={color.textColor} />
          <TextInput
            ref={ref_input}
            style={[
              { fontSize: 16 },
              { width: inActive || input ? "90%" : 40 },
            ]}
            value={input}
            onChangeText={(text) => setInput(text)}
            onFocus={() => {
              setInActive(true);
              setInput(input ? input : "");
            }}
            onBlur={() => setInActive(false)}
            placeholder="搜尋"
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(227,228,229)",
    height: 36,
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

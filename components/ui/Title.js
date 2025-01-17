import { StyleSheet, Text } from "react-native";

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    padding: 8,
    borderWidth: 2,
    borderColor: "#ddb52f",
    marginTop: 10,
  },
});

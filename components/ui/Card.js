import { Dimensions, StyleSheet, View } from "react-native";
import Colors from "../../constant/colors";

function Card({ children }) {
  return <View style={styles.cardContainer}>{children}</View>;
}

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: deviceHeight < 450 ? 20 : 26, // Adjust margin for spacing
    marginHorizontal: 24,
    padding: 12,
    backgroundColor: Colors.primary800,
    borderRadius: 16,
    elevation: 6,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
});

export default Card;

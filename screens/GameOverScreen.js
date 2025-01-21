import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constant/colors";

function GameOverScreen({ onRestart, userNumber }) {
  return (
    <View style={styles.screen}>
      <Title>Game Over!</Title>
      <Image
        source={require("../assets/images/success.png")}
        style={styles.image}
        accessibilityLabel="Success illustration"
      />
      <Text style={styles.summaryText}>
        Your phone guessed the number{" "}
        <Text style={styles.highlight}>{userNumber}</Text>
      </Text>
      <PrimaryButton onPress={onRestart}>Start New Game</PrimaryButton>
    </View>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  image: {
    width: 200, // Responsive width
    height: 200, // Responsive height
    borderRadius: 100,
    marginVertical: 20,
    borderWidth: 3,
    borderColor: Colors.primary600,
  },
  summaryText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "open-sans",
  },
  highlight: {
    color: Colors.primary500,
    fontFamily: "open-sans-bold",
  },
});

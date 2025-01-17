import { View, Text, StyleSheet } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ onRestart, userNumber }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Game Over!</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  highlight: {
    color: "#ddb52f",
    fontWeight: "bold",
  },
});

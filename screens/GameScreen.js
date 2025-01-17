import { Alert, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/game/NumberContainer";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess == userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  function onNextHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't Lie!", "You know this is wrong.", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View style={styles.controlsContainer}>
        <Text style={styles.instructionText}>
          Is Your Number Higher or Lower?
        </Text>
        <Card>
          <View style={styles.buttonsContainer}>
            <PrimaryButton onPress={onNextHandler.bind(this, "lower")}>
              <Ionicons name="remove" size={24} />
            </PrimaryButton>
            <PrimaryButton onPress={onNextHandler.bind(this, "greater")}>
              <Ionicons name="add" size={24} />
            </PrimaryButton>
          </View>
        </Card>
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  instructionText: {
    fontSize: 18,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  controlsContainer: {
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly", // This will equally space the buttons
    width: "100%", // Full width to use available space
    marginTop: 16,
  },
});

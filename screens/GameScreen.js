import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constant/colors";

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
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

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
    setGuessRounds((prevGuessNummbers) => [newRndNumber, ...prevGuessNummbers]);
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
      <FlatList
        data={guessRounds}
        renderItem={({ item, index }) => (
          <View style={styles.guessItem}>
            <Text style={styles.roundText}>
              Round {guessRounds.length - index}:
            </Text>
            <Text style={styles.guessText}>{item}</Text>
          </View>
        )}
        contentContainerStyle={styles.guessRoundsContainer}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default GameScreen;

const deviceHeight = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    marginTop: deviceHeight < 450 ? 0 : 60,
  },
  instructionText: {
    fontSize: 18,
    marginVertical: deviceHeight < 450 ? 4 : 0,
    fontWeight: "bold",
    textAlign: "center",
  },
  controlsContainer: {
    marginTop: deviceHeight < 450 ? 15 : 20,
    width: "80%",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly", // This will equally space the buttons
    width: "50%", // Full width to use available space
    marginTop: 16,
  },
  guessRoundsContainer: {
    marginTop: 20,
    width: "80%",
    alignItems: "center",
    flexGrow: 1,
  },
  guessItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginVertical: 6,
    width: "100%",
    backgroundColor: Colors.accent500,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android shadow
  },
  roundText: {
    fontSize: 16,
    color: "#555",
    fontFamily: "open-sans-bold",
  },
  guessText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
});

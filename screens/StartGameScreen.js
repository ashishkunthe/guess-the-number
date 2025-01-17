import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constant/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  function numberInputHandler(input) {
    setEnteredNumber(input);
  }

  function resetInputHandler() {
    setEnteredNumber("");
  }

  function confirmInputNumber() {
    const choseNumber = parseInt(enteredNumber);
    if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
      Alert.alert("Invalid number", "Number must be between 1 & 99", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    onPickNumber(enteredNumber);
  }

  return (
    <View style={styles.rootContainer}>
      <Title style={styles.instructionText}>Guess The Number</Title>
      <Card>
        <Text style={styles.enterText}>Enter a Number</Text>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={numberInputHandler}
          value={enteredNumber}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputNumber}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 50, // Reduced the margin from the top for a closer alignment
    alignItems: "center",
  },

  numberInput: {
    height: 75,
    width: 70,
    fontSize: 32,
    borderRadius: 8,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 16,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#fff", // Light background to make text more visible
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly", // Equal space between buttons
    marginTop: 24,
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  instructionText: {
    color: Colors.primary500,
    fontSize: 28, // Slightly larger for better visibility
    marginBottom: 12, // Added space between title and input field
  },
  enterText: {
    fontSize: 18,
    color: Colors.accent500,
    marginBottom: 12, // Added space before the number input
  },
});

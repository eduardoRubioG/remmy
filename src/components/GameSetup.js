import React from "react";
import { StyleSheet } from "react-native";
import { default as theme } from "../../theme.json";
import { View } from "react-native";
import { Input, Button, Layout, Text } from "@ui-kitten/components";

const playerCountPostFixes = ["one's", "two's", "three's", "four's"];

function GameSetup(props) {
  return (
    <Layout style={styles.gameSetupContainer} level="3">

      {/* Player counter view */}
      <Layout style={styles.playerCountView} level="3">
        <Layout
          style={{ flexDirection: "row", justifyContent: "center", margin: 10 }} level="3"
        >
          <Text category="h4">How many players?</Text>
        </Layout>
        <Layout style={{ flexDirection: "row", justifyContent: "center" }} level="3">
          <Button
            style={styles.countButton}
            onPress={() => props.changePlayerCount(-1)}
          >
            <Text style={styles.countButtonText}>-</Text>
          </Button>
          <Text style={styles.countText}>{props.playerCount}</Text>
          <Button
            style={styles.countButton}
            onPress={() => props.changePlayerCount(1)}
          >
            <Text style={styles.countButtonText}>+</Text>
          </Button>
        </Layout>
      </Layout>

      {/* Player name inputs  */}
      <Layout style={styles.playerNameInputView} level="3">
        {[...Array(props.playerCount)].map((x, i) => {
          return (
            <Input
              style={styles.playerNameInput}
              // status="primary"
              placeholder={`Enter player ${playerCountPostFixes[i]} name!`}
              key={playerCountPostFixes[i]}
            />
          );
        })}
      </Layout>

      <Button style={styles.mainButton} size="giant">
        Start Game!
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  gameSetupContainer: {
    flex: 1,
    width: "100%",
  },
  playerCountView: {
    justifyContent: "center",
    alignContent: "center",
    textAlignVertical: "center"
  },
  countButton: {
    margin: 15
  },
  countButtonText: {
    fontSize: 30
  },
  countText: {
    alignSelf: "center",
    fontSize: 60,
    fontWeight: "300",
    margin: 5
  },
  mainButton: {
    marginHorizontal: 20
  },
  playerNameInputView: { 
    alignSelf: "center"
  },
  playerNameInput: {
    width: "80%",
    padding: 5
  }
});

export default GameSetup;

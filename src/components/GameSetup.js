import React from "react";
import { StyleSheet } from "react-native";
import { default as theme } from "../../theme.json";
import { View } from "react-native";
import { Input, Button, Layout, Text } from "@ui-kitten/components";

function GameSetup(props) {
  return (
    <Layout style={styles.gameSetupContainer} level="3">

      {/* Player counter view */}
      <Layout style={styles.playerCountView}>
        <Button style={styles.countButton} onPress={() => props.changePlayerCount(-1)}>
          <Text style={styles.countButtonText}>-</Text>
        </Button>
        <Text style={styles.countText}>{props.playerCount}</Text>
        <Button style={styles.countButton} onPress={() => props.changePlayerCount(1)}>
          <Text style={styles.countButtonText}>+</Text>
        </Button>
      </Layout>

      {/* Player name inputs  */}
      <Input style={styles.playerNameInput} status='primary' placeholder={'Enter player one\'s name!'}/>

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
    justifyContent: "flex-end",
    paddingBottom: "40%"
  },
  playerCountView: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    textAlignVertical: "center"
    // backgroundColor: "#fff",
  },
  countButton: {
    margin: 15,
  },
  countButtonText: {
    fontSize: 30,
  },
  countText: {
    alignSelf: "center",
    fontSize: 60,
    fontWeight: "300",
    margin: 5,
  },
  mainButton: {
    marginHorizontal: 20
  }
});

export default GameSetup;

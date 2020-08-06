import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Input, Button, Layout, Text, Tooltip } from "@ui-kitten/components";
import NumberTicker from "../components/NumberTicket"
import { default as theme } from "../../theme.json";

const playerCountPostFixes = ["one's", "two's"];
function GameSetup(props) {
  const [playerOneName, setPlayerOneName] = React.useState("");
  const [playerTwoName, setPlayerTwoName] = React.useState("");
  const [winScore, setWinScore] = React.useState(100);
  const [ttVisible, setTtVisible] = React.useState(false);

  const TooltipAnchor = () => (
    <View style={{ width: "100%", maxHeight: 1 }}></View>
  );

  return (
    <Layout style={styles.gameSetupContainer} level="3">
      {/* Player name inputs  */}
      <View style={{ margin: 10, flex: 1, justifyContent: "center" }}>
        <Text style={styles.header} category="h3">
          Game Setup
        </Text>
        <Input
          size="large"
          style={{ margin: 5 }}
          value={playerOneName}
          placeholder={`Enter player ${playerCountPostFixes[0]} name!`}
          onChangeText={nextValue => setPlayerOneName(nextValue)}
        />
        <Input
          size="large"
          style={{ margin: 5 }}
          value={playerTwoName}
          placeholder={`Enter player ${playerCountPostFixes[1]} name!`}
          onChangeText={nextValue => setPlayerTwoName(nextValue)}
        />
        <Input
          size="large"
          style={{ margin: 5 }}
          value={winScore}
          placeholder={`Enter the score needed to win!`}
          onChangeText={nextValue =>
            setWinScore(nextValue ? parseInt(nextValue, 10) : 0)
          }
        />
      </View>

      {/* Tooltip */}
      <Tooltip
        anchor={TooltipAnchor}
        visible={ttVisible}
        onBackdropPress={() => setTtVisible(false)}
      >
        Make sure you have the game setup before you get started!
      </Tooltip>

      <View style={styles.startGameView}>
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "center"
          }}
        >
          <Text style={{ alignSelf: "center" }} category="h4">
            First to{" "}
          </Text>
          <NumberTicker
            style={{ marginTop: -10 }}
            number={winScore}
            textSize={45}
            duration={2500}
            textStyle={{ fontWeight: "bold", color: "white" }}
          />
          <Text style={{ alignSelf: "center" }} category="h4">
            {" "}
            Wins!
          </Text>
        </View>
        <Button
          style={styles.mainButton}
          size="giant"
          onPress={() => {
            /* If any of the inputs aren't set */
            if (
              !playerOneName ||
              !playerTwoName ||
              !winScore ||
              winScore === 0
            ) {
              setTtVisible(true);
            } else {
              props.saveGameSettings(playerOneName, playerTwoName, winScore);
            }
          }}
        >
          Start Game!
        </Button>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  gameSetupContainer: {
    flex: 1,
    width: "100%"
  },
  header: {
    width: "95%",
    alignSelf: "center",
    margin: 10,
    textDecorationColor: theme["color-primary-600"],
    textDecorationLine: "underline"
  },
  mainButton: {
    marginHorizontal: 20,
    marginTop: 20
  },
  startGameView: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 65
  }
});

export default GameSetup;

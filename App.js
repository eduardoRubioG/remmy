import React, { Component } from "react";
import { StyleSheet, StatusBar } from "react-native";

import * as eva from "@eva-design/eva";
import { default as theme } from "./theme.json";
import { ApplicationProvider, Layout } from "@ui-kitten/components";

import Logo from "./src/components/Logo";
import GameSetup from "./src/components/GameSetup.js";
import CurrentGame from "./src/components/CurrentGame.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      playerCount: 2,
      playerNames: ["", ""],
      playerScores: [{ playerOne: 0, playerTwo: 0 }],
      winScore: 500
    };
    this.saveGameSettings = this.saveGameSettings.bind(this);
    this.toggleGameStarted = this.toggleGameStarted.bind(this);
    console.disableYellowBox = true;
  }

  toggleGameStarted() {
    this.setState(state => ({ gameStarted: !this.state.gameStarted }));
  }
  saveGameSettings(playerOneName, playerTwoName, winScore) {
    this.setState({
      gameStarted: true,
      playerNames: [playerOneName, playerTwoName],
      winScore: winScore
    });
  }

  render() {
    return (
      <>
        <StatusBar barStyle="light-content"></StatusBar>
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
          <Layout style={styles.app__container}>
            <Logo />
            {this.state.gameStarted ? (
              <CurrentGame
                {...this.state}
                toggleGameStarted={this.toggleGameStarted}
              />
            ) : (
              <GameSetup
                {...this.state}
                saveGameSettings={this.saveGameSettings}
              />
            )}
          </Layout>
        </ApplicationProvider>
      </>
    );
  }
}
const styles = StyleSheet.create({
  app__container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50
  }
});

export default App;

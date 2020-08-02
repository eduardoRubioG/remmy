import "react-native-gesture-handler";
import React, { Component } from "react";
import { StyleSheet } from "react-native";

import * as eva from "@eva-design/eva";
import { default as theme } from "./theme.json";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";

import Logo from "./src/components/Logo";
import GameSetup from "./src/components/GameSetup.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      playerCount: 2,
      playerNames: [],
      playerScores: [0, 0],
      winScore: 500
    };

    this.changePlayerCount = this.changePlayerCount.bind(this);
  }

  changePlayerCount(change) { 
    // TODO: add alert 
    if( (change > 0 && this.state.playerCount < 4)  || ( change < 0 && this.state.playerCount !== 2 ))
      this.setState({playerCount: this.state.playerCount + change});
  }
  
  render() {
    return (
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <Layout style={styles.app__container}>
          <Logo />
          <GameSetup {...this.state} changePlayerCount={this.changePlayerCount}/>
        </Layout>
      </ApplicationProvider>
    );
  }
}
const styles = StyleSheet.create({
  app__container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 75
  }
});

export default App;

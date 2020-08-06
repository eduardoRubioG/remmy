import React, { Component } from "react";
import {
  Input,
  Button,
  Layout,
  Text,
  Card,
  List,
  Modal,
  StyleService
} from "@ui-kitten/components";
import NumberTicker from "../components/NumberTicket"
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { default as theme } from "../../theme.json";

const RoundItem = data => {
  let p1status = "";
  let p2status = "";
  const p1score = parseInt(data.item.playerOne, 10); 
  const p2score = parseInt(data.item.playerTwo, 10); 
  if (p1score > p2score) {
    p1status = "info";
  } else if (p1score < p2score) {
    p2status = "info";
  } else if (p1score === p2score) {
    p1status = "success";
    p2status = "success";
  }
  if (p1score < 0) p1status = "danger";
  if (p2score < 0) p2status = "danger";
  return (
    <View style={{ flexDirection: "row" }}>
      <Card style={styles.roundItem} status={p1status}>
        <Text>{p1score}</Text>
      </Card>
      <Card style={styles.roundItem} status={p2status}>
        <Text>{p2score}</Text>
      </Card>
    </View>
  );
};

class CurrentGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backButtonModal: false,
      gameOverModal: false, 
      currentPlayerOneScore: 0,
      currentPlayerTwoScore: 0,
      totalPlayerOneScore: 0,
      totalPlayerTwoScore: 0,
      gameScores: []
    };
  }
  updateGame(scoreOne, scoreTwo, winScore) {
    if (scoreOne && scoreTwo) {
      const newRound = [{ playerOne: scoreOne, playerTwo: scoreTwo }];
      let rounds = this.state.gameScores; 
      const scores = this.state.gameScores
        ? rounds.concat(newRound)
        : newRound;
      const ttp1 = this.state.totalPlayerOneScore + parseInt(scoreOne, 10);
      const ttp2 = this.state.totalPlayerTwoScore + parseInt(scoreTwo, 10);
      const gameOverModal = ( (ttp1 > winScore) || (ttp2 > winScore) ) ? true : false ;
      this.setState(state => ({
        gameScores: scores,
        currentPlayerOneScore: null,
        currentPlayerTwoScore: null,
        totalPlayerOneScore: ttp1,
        totalPlayerTwoScore: ttp2,
        gameOverModal: gameOverModal
      }));
    }
  }
  render() {
    return (
      <>
        <Layout style={styles.body} level="3">
          {/* Back button  */}
          <Button
            style={{
              alignSelf: "flex-start",
              marginTop: -20,
              maxWidth: 77
            }}
            onPress={() => this.setState({ backButtonModal: true })}
          >
            {"<"}
          </Button>

          {/* Exit modal */}
          <Modal
            visible={this.state.backButtonModal}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => this.setState({ backButtonModal: false })}
          >
            <Card status="info">
              <Text style={{ padding: 15 }}>
                Wait! Are you sure you want to return to the main menu? You'll
                lose all the game progress!
              </Text>
              <View style={styles.modalButtonView}>
                <Button
                  style={styles.modalButton}
                  onPress={() => {
                    this.setState({ backButtonModal: false });
                    this.props.toggleGameStarted();
                  }}
                >
                  I'm done
                </Button>
                <Button
                  style={styles.modalButton}
                  onPress={() => this.setState({ backButtonModal: false })}
                >
                  I'll stay
                </Button>
              </View>
            </Card>
          </Modal>

          {/* Game over modal  */}
          <Modal
            visible={this.state.gameOverModal}
            backdropStyle={styles.backdropStyle}
            onBackdropPress={() => {
              this.setState({ gameOverModal: false });
            }}
          >
            <Card status='info'>
              <Text category='h4' style={{ margin: 10 }}>
                {this.state.totalPlayerOneScore > this.state.totalPlayerTwoScore
                  ? this.props.playerNames[0]
                  : this.props.playerNames[1]}{" "}
                won the game!
              </Text>
              <Button
                onPress={() => {
                  this.setState({ gameOverModal: false });
                  this.props.toggleGameStarted(); 
                }}
              >
                Yay
              </Button>
            </Card>
          </Modal>

          {/* Header Section */}
          <View style={styles.versusHeader}>
            <Text category="h4" style={styles.versusText}>
              {this.props.playerNames[0]}
            </Text>
            <Text category="h4"> vs. </Text>
            <Text category="h4" style={styles.versusText}>
              {this.props.playerNames[1]}
            </Text>
          </View>

          {/* scoreboard  */}
          <List
            style={styles.list}
            data={this.state.gameScores}
            renderItem={RoundItem}
          />

          {/* game HUD */}
          <Text category="h3" style={styles.hudText}>
            Scores
          </Text>
          <View style={styles.gameHUD}>
            <NumberTicker
              style={{ marginTop: -10 }}
              number={this.state.totalPlayerOneScore}
              textSize={45}
              duration={1500}
              textStyle={{ fontWeight: "bold", color: "white" }}
            />
            <NumberTicker
              style={{ marginTop: -10 }}
              number={this.state.totalPlayerTwoScore}
              textSize={45}
              duration={1500}
              textStyle={{ fontWeight: "bold", color: "white" }}
            />
          </View>

          {/* score entry */}
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.scoreEntryContainer}
          >
            <View style={styles.scoreEntry}>
              <Input
                size="large"
                style={styles.roundInput}
                value={this.state.currentPlayerOneScore}
                placeholder={`Enter points scored`}
                onChangeText={nextValue =>
                  this.setState({ currentPlayerOneScore: nextValue })
                }
              />
              <Input
                size="large"
                style={styles.roundInput}
                value={this.state.currentPlayerTwoScore}
                placeholder={`Enter points scored`}
                onChangeText={nextValue =>
                  this.setState({ currentPlayerTwoScore: nextValue })
                }
              />
            </View>
            <Button
              size="large"
              style={styles.submitRoundButton}
              onPress={() => {
                this.updateGame(
                  this.state.currentPlayerOneScore,
                  this.state.currentPlayerTwoScore,
                  this.props.winScore
                );
              }}
            >
              Submit round scores
            </Button>
            <View style={{ height: 60 }} />
          </KeyboardAvoidingView>
        </Layout>
      </>
    );
  }
}

const styles = StyleSheet.create({
  body: {
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
  versusHeader: {
    flexDirection: "row",
    justifyContent: "center",
    textTransform: "capitalize",
    padding: 15
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalButtonView: {
    flex: 1,
    flexDirection: "row",

  },
  modalButton: {
    flex: 1,
    margin: 8,
  },  
  versusText: {
    textDecorationColor: theme["color-primary-600"],
    textDecorationLine: "underline"
  },
  roundItem: {
    flex: 1
  },
  list: {
    flex: 1
  },
  hudText: {
    alignSelf: "center",
    padding: 10
  },
  gameHUD: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 42,
    width: "95%",
    paddingVertical: 10
  },
  scoreEntryContainer: {
    maxWidth: "90%",
    paddingBottom: 30,
    alignSelf: "center"
  },
  roundInput: {
    padding: 5,
    width: "50%"
  },
  scoreEntry: {
    flexDirection: "row",
    justifyContent: "center"
  },
  submitRoundButton: {
    marginVertical: 10
  },
  bd: {
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 3
  }
});

export default CurrentGame;

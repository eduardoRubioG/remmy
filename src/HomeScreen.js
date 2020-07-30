import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.home__container}>
      <Text style={styles.home__logo}>
        R<Text style={styles.home__logoHighlight}>em</Text>my
      </Text>
      <Button
        title="Go to game screen"
        onPress={() => navigation.navigate("Game")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  home__container: {
    flex: 5,
    backgroundColor: "#800000",
    alignItems: "center",
    justifyContent: "center"
  },
  home__logo: { 
    fontSize: 40,
    fontWeight: "700",
    color: "#fff",
  },
  home__logoHighlight: { 
    color: '#1b1b1b'
  }
});

export default HomeScreen;

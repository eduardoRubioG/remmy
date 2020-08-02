import React from "react";
import { StyleSheet  } from "react-native";
import { default as theme } from "../../theme.json";
import { Text, Divider } from "@ui-kitten/components";

const Logo = () => {
  const [easterEggModal, setEasterEggModal] = React.useState(false); 
  return (
    <React.Fragment>
        <Text style={styles.logo} category="h4">
          R
          <Text style={styles.logoHighlight} category="h4">
          em
          </Text>
          my
        </Text>
        <Divider />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  logo: {
    fontSize: 60,
    paddingBottom: 10,
  },
  logoHighlight: {
    fontSize: 60,
    textDecorationLine: "underline",
    textDecorationColor: theme["color-primary-500"]
  }
});

export default Logo;

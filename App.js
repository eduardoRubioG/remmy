import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/HomeScreen";
import GameScreen from "./src/GameScreen";

import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { default as theme } from './theme.json';

const Stack = createStackNavigator();

// Blue: #145DA0
// Maroon: #800000

function App() {
  return (
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#800000",
              shadowColor: "transparent"
            },
            headerTintColor: "#fff"
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: ""
            }}
          />
          <Stack.Screen
            name="Game"
            component={GameScreen}
            options={{
              title: ""
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

export default App;

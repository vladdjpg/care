import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import {
  NavigationContainer,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Swiper from "react-native-swiper";
import { CreateScreen } from "./screens/CreateScreen";
import { LogScreen } from "./screens/LogScreen";
import { LogItemScreen } from "./screens/LogItemScreen";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const LogNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Log" component={LogScreen} />
    <Stack.Screen name="Log item" component={LogItemScreen} />
  </Stack.Navigator>
);

export default function App() {
  const initialiseNote = async () => {
    await AsyncStorage.setItem("NOTES", "value");
  };

  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <NavigationContainer>
        <Swiper loop={false} showsPagination={false} horizontal={false}>
          <View style={{ flex: 1 }}>
            <CreateScreen />
          </View>
          <LogNavigator />
        </Swiper>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  swiperStyle: {
    //Unused
    flex: 1,
    backgroundColor: "#fff",
    color: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});

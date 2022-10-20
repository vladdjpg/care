import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";
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
  const [stat, setStat] = useState(false);

  const checker = async () => {
    try {
      const value = await AsyncStorage.getItem("NOTES");
      let n = value ? JSON.parse(value) : [];
      if (n !== []) {
        setStat(true);
      } else {
        const getDate = new Date();
        const getDay = getDate.toLocaleDateString("en-GB", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        const getTime = getDate.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const noteDate = `${getDay} at ${getTime}`;
        n.push({ date: noteDate, text: "Welcome to Care. Here's your log." });
        await AsyncStorage.setItem("NOTES", JSON.stringify(n)).then(() =>
          setStat(true)
        );
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    checker();
  });

  const InitialView = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Still initialising</Text>
    </View>
  );

  const UsualView = () => (
    <Swiper loop={false} showsPagination={false} horizontal={false}>
      <View style={{ flex: 1 }}>
        <CreateScreen />
      </View>
      <LogNavigator />
    </Swiper>
  );

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        {(stat) ? <UsualView /> : <InitialView />}
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

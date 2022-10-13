import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import React, { useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

export const LogItemScreen = ({ route }) => {
  const [notes, setNotes] = useState([]);
  const nav = useNavigation();
  const { singleNote } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      getNotes();
    }, [])
  );

  const getNotes = () => {
    AsyncStorage.getItem("NOTES").then((notes) => {
      setNotes(JSON.parse(notes));
    });
  };

  return (
    <View style={styles.swiperStyle}>
      <Text>Log item</Text>
      <Text style={{ fontSize: 22, margin: 20 }}>{singleNote.text}</Text>
      <Text style={{ fontSize: 15, margin: 20 }}>{singleNote.date}</Text>
      <Button title="Go back" onPress={() => nav.goBack()}></Button>
    </View>
  );
};

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

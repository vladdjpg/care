import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

export const CreateScreen = () => {
  const [note, setNote] = useState("");

  const saveNote = async () => {
    const value = await AsyncStorage.getItem("NOTES")
    const n = value ? JSON.parse(value) : []
    const getDate = new Date();
    const getDay = getDate.toLocaleDateString('en-GB', {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'});
    const getTime = getDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
    const noteDate = `${getDay} at ${getTime}`;
    n.push({date: noteDate, text: note});
    await AsyncStorage.setItem("NOTES", JSON.stringify(n))/*.then(() => nav.navigate("AllNotes"))*/
    setNote("")
}

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text style={{fontSize:40, fontWeight: "bold", textAlign:"center"}}>Care</Text>
          <TextInput style={styles.input} value={note} onChangeText={setNote} multiline={true} autoFocus selectionColor="yellow"/>
          <Button title="Save" onPress={saveNote}/>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    color: "black",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 50,
  },
  input: {
    height: 'auto',
    width: 300,
    margin: 12,
    borderWidth: 2,
    padding: 10
  },
});

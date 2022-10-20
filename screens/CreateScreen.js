import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Pressable,
  View,
  Dimensions,
} from "react-native";

export const CreateScreen = () => {
  const [note, setNote] = useState("");
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const saveNote = async () => {
    const value = await AsyncStorage.getItem("NOTES");
    const n = value ? JSON.parse(value) : [];
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
    n.push({ date: noteDate, text: note });
    await AsyncStorage.setItem(
      "NOTES",
      JSON.stringify(n)
    ); /*.then(() => nav.navigate("AllNotes"))*/
    setNote("");
  };

  const pressInHandler = ({ nativeEvent }) => {
    console.log("PRESS STARTED:");
    console.log(nativeEvent);
    let startLoc = nativeEvent.locationX;
    setTouchStart(startLoc);
    console.log(touchStart);
  };

  const pressOutHandler = ({ nativeEvent }) => {
    console.log("press ended");
    let endLoc = nativeEvent.locationX;
    setTouchEnd(endLoc);
    console.log(endLoc);
    touchHandler();
  };

  const touchHandler = () => {
    console.log("processing touch");
    if (touchStart !== null && touchEnd !== null) {
      let distance = touchStart - touchEnd;
      console.log(`the distance is ${distance}`);
      if (distance > 50 || distance < -50) {
        let isSwipeRight = distance > 0;
        console.log(isSwipeRight);
        console.log(
          "===this was a swipe",
          isSwipeRight ? "right===" : "left==="
        );
      } else {
        console.log("===The swipe was too short===");
      }
      setTouchEnd(null);
      setTouchStart(null);
    } else {
      console.log("===Failed to detect both touches===");
    }
  };

  const handleForget = () => {
    setNote("");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "black",
          justifyContent: "center",
          display: "none",
          opacity: "20%",
        }}
      >
        <Text style={{ color: "white", fontSize: 50, textAlign: "center" }}>
          hello?
        </Text>
      </View>

      <Pressable
        style={{ flex: 1 }}
        onPress={Keyboard.dismiss}
        onPressIn={(e) => {
          pressInHandler(e);
        }}
        onPressOut={(e) => {
          pressOutHandler(e);
        }}
      >
        <View style={styles.container}>
          <Pressable style={styles.sidecolumns} onPress={handleForget}>
            <Text
              style={[
                styles.sidetext,
                {
                  transform: [{ rotate: "90deg" }],
                  width: 500,
                  textAlign: "center",
                  color: "red",
                },
              ]}
            >
              ↑ swipe right to forget ↑
            </Text>
          </Pressable>

          <View style={styles.centercolumn}>
            <Pressable style={styles.siderows} onPress={() => setNote("")}>
              <Text style={[styles.sidetext, { marginTop: 30 }]}>
                ↓ swipe down to clear ↓
              </Text>
            </Pressable>

            <View style={styles.center}>
              <Text
                style={{
                  fontSize: 40,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Care
              </Text>
              <TextInput
                style={styles.input}
                value={note}
                onChangeText={setNote}
                multiline={true}
                selectionColor="blue"
              />
            </View>

            <View style={styles.siderows}>
              <Text style={[styles.sidetext, { marginBottom: 15 }]}>
                ↑ swipe up to view log ↑
              </Text>
            </View>
          </View>

          <Pressable style={styles.sidecolumns} onPress={saveNote}>
            <Text
              style={[
                styles.sidetext,
                {
                  transform: [{ rotate: "270deg" }],
                  width: 500,
                  textAlign: "center",
                  color: "lime",
                },
              ]}
            >
              ↑ swipe left to remember ↑
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const MAX_WIDTH = Dimensions.get("window").width;
const MAX_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "blue",
    color: "white",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 50,
  },
  sidecolumns: {
    width: 50,
    height: "100%",
    backgroundColor: "white",
    borderStyle: 'dotted',
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "space-around",
  },
  siderows: {
    height: 100,
    width: "100%",
    backgroundColor: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "space-around",
  },
  centercolumn: {
    width: MAX_WIDTH - 100,
    height: "100%",
    backgroundColor: "yellow",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  center: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 2,
    borderStyle: 'dotted',
    height: MAX_HEIGHT - 200,
  },
  input: {
    height: "80%", // 93 is good
    width: "100%",
    borderWidth: 2,
    borderStyle: 'dashed',
    padding: 10,
    backgroundColor: "gray",
    fontSize: 18
  },
  sidetext: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

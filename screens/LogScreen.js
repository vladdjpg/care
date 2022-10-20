import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { List, ListItem } from "@ui-kitten/components";
import React, { useState } from "react";
import {
  Keyboard, Pressable, StyleSheet,
  Text,
  View
} from "react-native";

export const LogScreen = () => {
  const [notes, setNotes] = useState([]);
  const nav = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      getNotes();
    }, [notes])
  );

  const getNotes = async () => {
    if (notes !== null) {
      try {
        AsyncStorage.getItem("NOTES").then((notes) => {
          setNotes(JSON.parse(notes));
        });
      } catch (err) {
        alert("No notes yet.");
      }
    }
  };

  const clearAllLogItems = async () => {
    try {
      setNotes([]);
      await AsyncStorage.setItem("Notes", JSON.stringify(notes));
    } catch (err) {
      alert("No notes may be removed.");
    }
  };

  const renderItem = ({ item, index }) => (
    <ListItem
      title={<Text style={[styles.listitemtext, {color: 'black'}]}>{item.text}</Text>}
      onPress={() =>
        nav.navigate("Log item", {
          singleNote: item,
        })
      }
      style={[styles.listitem]}
    />
  );

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <View style={styles.sidecolumns}>
        <Pressable style={{ flex: 1 }} onPress={clearAllLogItems}>
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
            ↑ swipe right to clear the log ↑
          </Text>
        </Pressable>
      </View>
      <View style={styles.logcontainer}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Log screen
        </Text>
        <List
          data={notes === null ? setNotes([]) : notes.reverse()}
          renderItem={renderItem}
          style={styles.list}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "gray",
    justifyContent: "space-between",
  },
  sidecolumns: {
    width: 50,
    height: "100%",
    backgroundColor: "white",
    borderWidth: 2,
    borderStyle: "dotted",
    alignItems: "center",
    justifyContent: "space-around",
  },
  sidetext: {
    fontSize: 20,
    fontWeight: "bold",
  },
  list: {
    backgroundColor: "white",
    height: 100,
  },
  listitem: {
    backgroundColor: "white",
    borderWidth: 2,
    borderStyle: "dotted",
    width: 300,
    height: 60,
  },
  listitemtext: {
    fontSize: 15,
    color: "black",
    backgroundColor: "pink",
    width: "100%",
  },
  logcontainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  item: {
    marginVertical: 4,
  },
  title: {
    textAlign: "center",
    marginTop: 50,
  },
  notes: {
    fontSize: 24,
  },
});

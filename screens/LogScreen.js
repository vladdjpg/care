import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Touchable,
} from "react-native";
import React, { useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Divider, List, ListItem } from "@ui-kitten/components";

export const LogScreen = () => {
  const [notes, setNotes] = useState([]);
  const nav = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      getNotes();
    }, [])
  );

  const getNotes = async () => {
    if (notes !== null) {
        try {
            AsyncStorage.getItem("NOTES").then((notes) => {
                setNotes(JSON.parse(notes));
              })
        } catch (err) {alert("No notes yet.")}
      }
  };

  const renderItem = ({ item, index }) => (
    <ListItem
      title={<Text>{item.text}</Text>}
      onPress={() =>
        nav.navigate("Log item", {
          singleNote: item,
        })
      } style={{color: "black", backgroundColor: "orange", width: 300}}
    />
  );

  return (
    <View style={styles.swiperStyle}>
      <Text>Log screen</Text>
      <List
        data={notes.reverse()}
        renderItem={renderItem}
        style={styles.container}
        ItemSeparatorComponent={Divider}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  swiperStyle: {
    flex: 1,
    backgroundColor: "#fff",
    color: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  container: {
    fontSize: 20,
    color: "black",
    backgroundColor: "green"
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

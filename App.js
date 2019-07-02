import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { PlayfulDrawerMenu } from "./src/components/PlayfulDrawerMenu/PlayfulDrawerMenu";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} barStyle="light-content" />
      <PlayfulDrawerMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  }
});

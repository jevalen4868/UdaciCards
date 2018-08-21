import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CardsStatusBar } from "./components/CardsStatusBar";
import { pencilYellow } from "./utils/colors";
import Decks from "./components/Decks";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CardsStatusBar backgroundColor={pencilYellow} barStyle={'light-content'}/>
        <Decks/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

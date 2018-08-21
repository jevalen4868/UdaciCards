import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CardsStatusBar } from "./components/CardsStatusBar";
import { pencilYellow } from "./utils/colors";
import Decks from "./components/Decks";
import Deck from "./components/Deck";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CardsStatusBar backgroundColor={pencilYellow} barStyle={'light-content'}/>
        <Deck
          deckName='udacicards'
          numCards={10}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

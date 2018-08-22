import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CardsStatusBar } from "./components/CardsStatusBar";
import { pencilYellow } from "./utils/colors";
import Decks from "./components/Decks";
import Deck from "./components/Deck";
import Quiz from "./components/Quiz";
import NewDeck from "./components/NewDeck";

export default class App extends React.Component {

  decks = [
    {
      key: 'udacicards',
      numCards: 3,
    },
    {
      key: 'newdeck',
      numCards: 3,
    },
    {
      key: 'udacicards1',
      numCards: 3,
    },
    {
      key: 'newdeck1',
      numCards: 3,
    },
    {
      key: 'newdeck2',
      numCards: 3,
    },
  ]

  questions = [
    {
      question: 'Does react native work with Android?',
      answer: 'Yes!',
    },
    {
      question: 'Does react native work with iOS?',
      answer: 'Yes!',
    },
    {
      question: 'Who is the coolest person ever?',
      answer: 'Jeremy!',
    },
  ]

  render() {
    return (
      <View style={styles.container}>
        <CardsStatusBar backgroundColor={pencilYellow} barStyle={'light-content'}/>
        <NewDeck
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

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { gray, pencilYellow, white } from "../utils/colors";
import { isIos } from "../utils/helpers";

class Deck extends Component {

  static navigationOptions = ({ navigation }) => {
    const { deckName } = navigation.state.params

    return {
      title: `deck ${deckName}`,
    }
  }

  render() {

    const { deckName, numCards } = this.props.navigation.state.params
    const nav = this.props.navigation

    return (
      <View style={ss.container}>
        <View style={ss.deckDisplay}>
          <Text style={[{ fontSize: 35 }]}>
            {deckName}
          </Text>
          <Text style={[{ fontSize: 20, color: gray }]}>
            {numCards} cards
          </Text>
        </View>
        <View style={ss.actions}>

          <TouchableOpacity
            style={isIos ? ss.iosBtn : ss.androidBtn}
            onPress={
              () => nav.navigate(
                'AddCard',
                {
                  deckName,
                  numCards,
                }
              )
            }>
            <Text style={[{ fontSize: 20, color: white }]}>
              Add Card
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={isIos ? ss.iosBtn : ss.androidBtn}
            onPress={
              () => nav.navigate(
                'Quiz',
                {
                  deckName,
                  questions:
                    [{
                      question: 'what\'s the sky?',
                      answer: 'blue',
                    }]
                }
              )
            }>
            <Text style={[{ fontSize: 20, color: white }]}>
              Start Quiz
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

const ss = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  deckDisplay: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  iosBtn: {
    backgroundColor: pencilYellow,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidBtn: {
    backgroundColor: pencilYellow,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 7,
  },
})

export default Deck
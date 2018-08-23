import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { gray, pencilYellow, white } from "../utils/colors";
import { isIos } from "../utils/helpers";

class Deck extends Component {
  render() {
    const { deckName, numCards } = this.props
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
            onPress={() => console.log("HI")}>
            <Text style={[{ fontSize: 20, color: white }]}>
              Add Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={isIos ? ss.iosBtn : ss.androidBtn}
            onPress={() => console.log("HI")}>
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
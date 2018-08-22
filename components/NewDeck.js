import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { black, gray, green, pencilYellow, red, white } from "../utils/colors";
import { isIos, isAndroid } from "../utils/helpers";

class NewDeck extends Component {

  state = {
    deckName: '',
  }

  render() {
    const { deckName } = this.state
    return <KeyboardAvoidingView
      style={ss.container}
      behavior='padding'
      enabled
    >
      <View style={ss.newDeckHeader}>
        <Text style={{ fontSize: 50, textAlign: 'center' }}>
          What is the title of your new deck?
        </Text>
      </View>
      <View style={ss.newDeckForm}>
        <TextInput
          style={ss.deckNameTextInput}
          onChangeText={(deckName) => this.setState({ deckName })}
          placeholder='Deck Name'
          value={deckName}
        />
        <TouchableOpacity
          onPress={() => console.log("HI")}
          style={[isIos ? ss.iosBtn : ss.androidBtn, { backgroundColor: pencilYellow }]}
          enabled={deckName !== ''}
        >
          <Text style={[ss.submitButtonText]}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  }
}

const ss = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  newDeckHeader: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  newDeckForm: {
    flex: 2,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  deckNameTextInput: {
    height: 40,
    width: 300,
    paddingLeft: 10,
    borderColor: black,
    borderWidth: isAndroid ? 0 : 1,
  },
  submitButtonText: {
    color: white,
    fontSize: 20,
  },
  iosBtn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidBtn: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
  },
})

export default NewDeck
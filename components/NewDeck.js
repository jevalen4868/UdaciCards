import React, { Component } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { black, gray, pencilYellow, white } from "../utils/colors";
import { isAndroid, isIos } from "../utils/helpers";
import { connect } from 'react-redux'
import { addDeck } from "../actions/decks";
import { submitDeck } from "../utils/api";

class NewDeck extends Component {

  state = {
    title: '',
  }

  onCreateNewDeck = () => {
    const nav = this.props.navigation
    const { dispatch } = this.props

    const { title } = this.state
    const keyValue = {
      title,
      questions: [],
      numQuestions: 0,
    }

    // add deck to state.
    dispatch(addDeck({
      [title]: keyValue,
    }))

    submitDeck({
      key: title,
      entry: keyValue,
    })
      .then(() => {
        this.setState(() => ({
          title: ''
        }))
      })

    // navigate
    nav.navigate(
      'Deck',
      {
        title,
        numQuestions: 0,
      }
    )
  }

  render() {
    const { title } = this.state
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
          style={ss.titleTextInput}
          onChangeText={(title) => this.setState({ title })}
          placeholder='Deck Name'
          value={title}
        />
        <TouchableOpacity
          onPress={this.onCreateNewDeck}
          style={[isIos ? ss.iosBtn : ss.androidBtn, { backgroundColor: pencilYellow }]}
          disabled={title === ''}
        >
          <Text style={[ss.submitButtonText, { color: title === '' ? gray : white }]}>
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
  titleTextInput: {
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

export default connect()(NewDeck)
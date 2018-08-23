import React, { Component } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { black, pencilYellow, white } from "../utils/colors";
import { isAndroid, isIos } from "../utils/helpers";

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  render() {
    const { question, answer } = this.state
    const buttonDisabled = question === '' || answer === ''
    return <KeyboardAvoidingView
      style={ss.container}
      behavior='padding'
      enabled
    >
      <View style={ss.addCardForm}>
        <TextInput
          style={ss.textInput}
          onChangeText={(question) => this.setState({ question })}
          placeholder='Question'
          value={question}
        />

        <TextInput
          style={ss.textInput}
          onChangeText={(answer) => this.setState({ answer })}
          placeholder='Answer'
          value={answer}
        />
      </View>

      <View style={{ flex: 4, justifyContent: 'flex-end', flexDirection: 'column' }}>
        <TouchableOpacity
          onPress={() => console.log("HI")}
          style={[isIos ? ss.iosBtn : ss.androidBtn, { backgroundColor: pencilYellow, alignSelf: 'flex-end' }]}
          disabled={buttonDisabled}
        >
          <Text style={[ss.submitButtonText]}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
      </View>
    </KeyboardAvoidingView>
  }
}

const ss = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCardForm: {
    flex: 2,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: 300,
    paddingLeft: 10,
    borderColor: black,
    borderWidth: isAndroid ? 0 : 1,
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
  submitButtonText: {
    color: white,
    fontSize: 20,
  },
})

export default AddCard
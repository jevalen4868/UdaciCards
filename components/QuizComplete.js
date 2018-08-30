import React, { Component } from 'react'
import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { gray, pencilYellow, white } from "../utils/colors";
import { isAndroid, isIos } from "../utils/helpers";
import { HeaderBackButton } from "react-navigation";

class QuizComplete extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title, numQuestions } = navigation.state.params
    return {
      title: `${title} quiz complete!`,
      headerLeft: <HeaderBackButton
        tintColor={white}
        onPress={() => {
          navigation.navigate(
            'Deck',
            {
              title,
              numQuestions
            })
        }}/>
    }
  }

  componentDidMount() {
    isAndroid && BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    isAndroid && BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    const { title, numQuestions } = this.props.navigation.state.params
    this.props.navigation.navigate(
      'Deck',
      {
        title,
        numQuestions
      })
    // Disable default back button behavior.
    return true
  }

  render() {
    const { navigation, } = this.props
    const { numQuestions, correct, title } = navigation.state.params
    const score = correct / numQuestions * 100
    return <View style={ss.container}>
      <View style={ss.scoreView}>
        <Text style={ss.scoreText}>You scored {score}!</Text>
        <Text>{
          score < 70
            ? 'Study harder!'
            : `You're gettin' it!`
        }</Text>
      </View>
      <View style={ss.actions}>

        <TouchableOpacity
          style={isIos ? ss.iosBtn : ss.androidBtn}
          onPress={
            () => navigation.navigate(
            'Deck',
              {
                title,
                numQuestions,
              }
            )
          }>
          <Text style={[{ fontSize: 20, color: white }]}>
            Back to Deck
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={isIos ? ss.iosBtn : ss.androidBtn}
          onPress={
            () => navigation.navigate(
              'Quiz',
              {
                title,
              }
            )
          }>
          <Text style={[{ fontSize: 20, color: white }]}>
            Restart Quiz
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  }
}

const ss = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  scoreView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 40,
    textAlign: 'center',
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

export default QuizComplete
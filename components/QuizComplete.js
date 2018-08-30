import React, { Component } from 'react'
import { BackHandler, StyleSheet, Text, View } from 'react-native'
import { white } from "../utils/colors";
import { isAndroid } from "../utils/helpers";
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
    const { numQuestions, correct } = navigation.state.params
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
})

export default QuizComplete
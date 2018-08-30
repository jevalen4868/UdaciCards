import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { green, red, white } from "../utils/colors";
import { isIos } from "../utils/helpers";
import { HeaderBackButton } from "react-navigation";

class QuizComplete extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title, numQuestions } = navigation.state.params
    console.log('navigation.state.params', navigation.state.params)
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


  render() {
    const { navigation, } = this.props
    const { title, numQuestions, correct, incorrect } = navigation.state.params
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
  answers: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  correctButtonText: {
    fontSize: 20,
    color: white,
  },
  incorrectButtonText: {
    fontSize: 20,
    color: white,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30,
  },
})

export default QuizComplete
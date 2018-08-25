import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { green, red, white } from "../utils/colors";
import { isIos } from "../utils/helpers";

class Quiz extends Component {

  static navigationOptions = ({ navigation }) => {
    const { deckName } = navigation.state.params

    return {
      title: `${deckName} quiz`,
    }
  }

  state = {
    currentCard: 0,
    totalCards: 0,
    score: 0,
    cardDisplay: 'question',
  }

  onFlipCard = (e) => {
    this.setState(({ cardDisplay }) => ({
      cardDisplay: cardDisplay === 'question' ? 'answer' : 'question'
    }))
  }

  render() {
    const { currentCard, totalCards, score, cardDisplay } = this.state
    const { question, answer } = this.props.navigation.state.params.questions[currentCard]
    return <View style={ss.container}>
      <Text style={ss.cardTrackerText}>{currentCard} / {totalCards}</Text>
      {
        cardDisplay === 'question'
          ?
          <View style={ss.questionAnswerView}>
            <Text style={ss.questionAnswerText}>{question}</Text>
            <TouchableOpacity
              onPress={this.onFlipCard}>
              <Text style={[{ fontSize: 20, color: red }]}>
                Answer
              </Text>
            </TouchableOpacity>
          </View>
          :
          <View style={ss.questionAnswerView}>
            <Text style={ss.questionAnswerText}>{answer}</Text>
            <TouchableOpacity
              onPress={this.onFlipCard}>
              <Text style={[{ fontSize: 20, color: red }]}>
                Question
              </Text>
            </TouchableOpacity>
          </View>
      }
      <View style={ss.answers}>
        <TouchableOpacity
          onPress={() => console.log("HI")}
          style={[isIos ? ss.iosBtn : ss.androidBtn, { backgroundColor: green }]}
        >
          <Text style={[ss.correctButtonText]}>
            Correct
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("HI")}
          style={[isIos ? ss.iosBtn : ss.androidBtn, { backgroundColor: red }]}
        >
          <Text style={[ss.incorrectButtonText]}>
            Incorrect
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
  cardTrackerText: {
    fontSize: 25,
    paddingLeft: 10,
    paddingTop: 10,
  },
  questionAnswerView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionAnswerText: {
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

export default Quiz
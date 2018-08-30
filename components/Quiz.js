import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { green, red, white } from "../utils/colors";
import { clearLocalNotifications, isIos, setLocalNotification } from "../utils/helpers";
import { connect } from 'react-redux'

const initialState = {
  currentQuestion: 0,
  totalQuestions: 0,
  correct: 0,
  incorrect: 0,
  questionDisplay: 'question',
}

class Quiz extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params

    return {
      title: `${title} quiz`,
    }
  }

  state = {
    ...initialState
  }

  componentDidMount() {
    const { deck } = this.props
    this.setState(() => ({
      totalQuestions: deck.numQuestions
    }))
  }

  onFlipCard = () => {
    this.setState(({ questionDisplay }) => ({
      questionDisplay: questionDisplay === 'question' ? 'answer' : 'question'
    }))
  }

  answerCorrect = () => {
    const { currentQuestion, totalQuestions, correct, incorrect } = this.state
    const incrementCorrect = correct + 1
    this.setState(() => ({
      correct: incrementCorrect,
      currentQuestion: currentQuestion + 1,
      questionDisplay: 'question',
    }))
    currentQuestion + 1 === totalQuestions && this.quizComplete(incrementCorrect, incorrect)
  }

  answerIncorrect = () => {
    const { currentQuestion, totalQuestions, correct, incorrect } = this.state
    const incrementIncorrect = incorrect + 1
    this.setState(() => ({
      incorrect: incrementIncorrect,
      currentQuestion: currentQuestion + 1,
      questionDisplay: 'question',
    }))
    currentQuestion + 1 === totalQuestions && this.quizComplete(correct, incrementIncorrect)
  }

  quizComplete = (correct, incorrect) => {
    const { totalQuestions } = this.state
    const { title } = this.props.deck
    const nav = this.props.navigation

    // mark quiz taken for the day.
    clearLocalNotifications()
      .then(setLocalNotification)

    nav.navigate(
      'QuizComplete',
      {
        title,
        numQuestions: totalQuestions,
        correct,
        incorrect,
      }
    )
    this.setState(() => ({
      ...initialState,
      totalQuestions,
    }))
  }

  render() {
    const { deck } = this.props
    const { currentQuestion, totalQuestions, questionDisplay } = this.state

    console.log('deck.questions[currentQuestion]', deck.questions[currentQuestion])
    const { question, answer } = deck.questions[currentQuestion]
    return <View style={ss.container}>
      <Text style={ss.cardTrackerText}>{currentQuestion + 1} / {totalQuestions}</Text>

      {
        questionDisplay === 'question'
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
          onPress={this.answerCorrect}
          style={[isIos ? ss.iosBtn : ss.androidBtn, { backgroundColor: green }]}
        >
          <Text style={[ss.correctButtonText]}>
            Correct
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.answerIncorrect}
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

const mapStateToProps = ({ decks }, { navigation }) => {
  console.log('mapStateToProps decks', decks)
  console.log('mapStateToProps navigation.state.params.title', navigation.state.params.title)
  console.log('mapStateToProps decks[navigation.state.params.title]', decks[navigation.state.params.title])

  return {
    deck: decks[navigation.state.params.title],
  }
}
export default connect(mapStateToProps)(Quiz)
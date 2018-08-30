import React, { Component } from 'react'
import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { gray, pencilYellow, white } from "../utils/colors";
import { isAndroid, isIos } from "../utils/helpers";
import { connect } from 'react-redux'
import { HeaderBackButton } from "react-navigation";

class Deck extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params

    return {
      title: `deck ${title}`,
      headerLeft: <HeaderBackButton
        tintColor={white}
        onPress={() => {
          navigation.navigate(
            'Decks'
          )
        }}/>
    }
  }

  componentDidMount() {
    isAndroid && BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    isAndroid && BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  // If navigated to from NewDeck, need to override this.
  handleBackButton = () => {
    this.props.navigation.navigate('Decks')
    // Disable default back button behavior.
    return true
  }

  render() {

    const nav = this.props.navigation
    const { title, numQuestions } = this.props.deck
    const startQuizDisabled = numQuestions === 0

    return (
      <View style={ss.container}>
        <View style={ss.deckDisplay}>
          <Text style={[{ fontSize: 35 }]}>
            {title}
          </Text>
          <Text style={[{ fontSize: 20, color: gray }]}>
            {numQuestions} cards
          </Text>
        </View>
        <View style={ss.actions}>

          <TouchableOpacity
            style={isIos ? ss.iosBtn : ss.androidBtn}
            onPress={
              () => nav.navigate(
                'AddCard',
                {
                  title,
                  numQuestions,
                }
              )
            }>
            <Text style={[{ fontSize: 20, color: white }]}>
              Add Card
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={isIos ? ss.iosBtn : ss.androidBtn}
            disabled={startQuizDisabled}
            onPress={
              () => nav.navigate(
                'Quiz',
                {
                  title,
                }
              )
            }>
            <Text style={[{ fontSize: 20, color: !startQuizDisabled ? white : gray }]}>
              Start Quiz
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

const
  ss = StyleSheet.create({
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

const
  mapStateToProps = ({ decks }, { navigation }) => {
    const { title, numQuestions } = navigation.state.params
    return {
      deck: decks[title],
      numQuestions
    }
  }

export default connect(mapStateToProps)

(
  Deck
)
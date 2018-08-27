import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { white } from '../utils/colors';
import { DeckButton } from "./DeckButton";
import { connect } from 'react-redux'
import { fetchDecksResults } from "../utils/api";
import { receiveDecks } from "../actions/decks";
import { AppLoading } from "expo";

class Decks extends Component {

  state = {
    ready: false,
  }

  componentDidMount() {
    const { dispatch } = this.props
    fetchDecksResults()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(this.setState(() => ({
        ready: true,
      })))
  }

  onRenderItem = ({ item }) => {
    const nav = this.props.navigation
    console.log('item', item)
    console.log('item.title', item.key)

    return <View
      key={item.key}
      style={styles.row}
    >
      <DeckButton
        title={item.key}
        numQuestions={item.numQuestions}
        onPress={() => nav.navigate(
          'Deck',
          {
            title: item.key,
            numQuestions: item.numQuestions,
          }
        )}/>
    </View>
  }

  render() {
    const { decks } = this.props
    console.log('decks', decks)

    const decksArr = Object.keys(decks).map((deckName) => ({
      key: deckName,
      numQuestions: decks[deckName].numQuestions
    }))

    console.log('decksArr', decksArr)

    const { ready } = this.state

    if (ready === false) {
      return <AppLoading/>
    }

    return <View style={styles.container}>
      {
        decksArr.length !== 0
          ?
          <FlatList
            data={decksArr}
            renderItem={this.onRenderItem}
          />
          :
          <View style={styles.center}>
            <Text style={{ fontSize: 20 }}>Create your first deck!</Text>
          </View>
      }
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 30,
    marginLeft: 30,
    borderBottomColor: '#000',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 250,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30,
  },
})

const mapStateToProps = ({ decks }) => ({
  decks
})

export default connect(mapStateToProps)(Decks)

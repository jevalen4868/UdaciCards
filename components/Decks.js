import React, { Component } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { white } from '../utils/colors';
import { DeckButton } from "./DeckButton";

class Decks extends Component {

  state = {
    ready: false,
  }

  onRenderItem = ({ item }) => {
    const nav = this.props.navigation

    return <View style={styles.row}>
      <DeckButton
        deckName={item.key}
        numCards={item.numCards}
        onPress={() => nav.navigate(
          'Deck',
          {
            deckName: item.key,
            numCards: item.numCards,
          }
        )}/>
    </View>
  }

  decks = [
    {
      key: 'udacicards',
      numCards: 3,
    },
    {
      key: 'udacicards1',
      numCards: 4,
    }
  ]

  render() {
    const { decks } = this.props

    return <View style={styles.container}>
      <FlatList
        data={this.decks}
        renderItem={this.onRenderItem}
      />
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
})

export default Decks

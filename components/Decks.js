import React, { Component } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { white } from '../utils/colors';
import { DeckButton } from "./DeckButton";

class Decks extends Component {

  state = {
    ready: false,
  }

  onRenderItem = ({ item }) => <View style={styles.row}>
    <DeckButton deckName={item.key} numCards={item.numCards}/>
  </View>

  decks = [
    {
      key: 'udacicards',
      numCards: 3,
    },
    {
      key: 'newdeck',
      numCards: 3,
    },
    {
      key: 'udacicards1',
      numCards: 3,
    },
    {
      key: 'newdeck1',
      numCards: 3,
    },
    {
      key: 'newdeck2',
      numCards: 3,
    },
  ]

  render() {
    return <View style={styles.container}>
      <FlatList
        data={this.decks}
        renderItem={this.onRenderItem}
        onPress={() => console.log("PRESSED!")}
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

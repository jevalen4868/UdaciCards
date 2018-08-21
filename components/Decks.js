import React, { Component } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { white } from '../utils/colors';
import { DeckButton } from "./DeckButton";

class Decks extends Component {

  state = {
    ready: false,
  }

  onRenderItem = ({ item }) => <View style={styles.row}>
    <DeckButton title={item.key} subTitle={item.cards}/>
  </View>

  decks = [
    {
      key: 'udacicards',
      cards: 3,
    },
    {
      key: 'newdeck',
      cards: 3,
    },
    {
      key: 'udacicards1',
      cards: 3,
    },
    {
      key: 'newdeck1',
      cards: 3,
    },
    {
      key: 'newdeck2',
      cards: 3,
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

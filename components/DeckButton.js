import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { gray } from "../utils/colors";

export const DeckButton = ({ deckName, numCards, onPress }) =>
  <TouchableOpacity
    style={[styles.center, { flex: 1 }]}
    onPress={onPress}>
    <Text style={[{ fontSize: 35 }]}>
      {deckName}
    </Text>
    <Text style={[{ fontSize: 20, color: gray }]}>
      {numCards} cards
    </Text>
  </TouchableOpacity>

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { gray } from "../utils/colors";

export const DeckButton = ({ title, numQuestions, onPress }) =>
  <TouchableOpacity
    style={[styles.center, { flex: 1 }]}
    onPress={onPress}>
    <Text style={[{ fontSize: 35 }]}>
      {title}
    </Text>
    <Text style={[{ fontSize: 20, color: gray }]}>
      {numQuestions} cards
    </Text>
  </TouchableOpacity>

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})
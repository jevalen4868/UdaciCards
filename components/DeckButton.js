import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { gray } from "../utils/colors";

export const DeckButton = ({ title, subTitle, onPress }) =>
  <TouchableOpacity
    style={[styles.center, { flex: 1 }]}
    onPress={onPress}>
    <Text style={[{ fontSize: 35 }]}>
      {title}
    </Text>
    <Text style={[styles.center, { fontSize: 20, color: gray }]}>
      {subTitle} cards
    </Text>
  </TouchableOpacity>

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})
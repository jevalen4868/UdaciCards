import { AsyncStorage } from 'react-native'
import { CARDS_STORAGE_KEY } from "./_cards";

export const submitEntry = ({ entry, key }) => {
  return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
    [key]: entry,

  }))
}

export const removeEntry = (key) => {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(data))
    })
}

export const fetchCardsResults = () => {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
}
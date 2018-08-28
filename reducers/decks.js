import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions/decks'

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      }
    case ADD_CARD:
      const { title, question } = action
      return {
        ...state,
        [title]: {
          ...state[title],
          questions: state[title].questions.concat(question),
          numQuestions: state[title].numQuestions + 1,
        }
      }
    default:
      return state
  }
}
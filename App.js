import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CardsStatusBar } from "./components/CardsStatusBar";
import { pencilYellow, white } from "./utils/colors";
import Decks from "./components/Decks";
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import AddCard from "./components/AddCard";
import Deck from "./components/Deck";
import { isIos, isAndroid } from "./utils/helpers";
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import NewDeck from "./components/NewDeck";
import Quiz from "./components/Quiz";
import reducer from "./reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";
import middleware from './middleware'
import QuizComplete from "./components/QuizComplete";

const routeConfigs = {
  Decks: {
    screen: Decks,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'decks',
      tabBarIcon: ({ tintColor }) => <Ionicons
        name={isIos ? 'ios-albums' : 'md-albums'} size={30} color={tintColor}/>
    })
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: () => ({
      headerTitle: 'new deck',
      tabBarIcon: ({ tintColor }) => <Ionicons
        name={isIos ? 'ios-add-circle-outline' : 'md-add-circle'} size={30} color={tintColor}/>
    })
  },
}

const tabNavigatorConfigIos = {
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    activeTintColor: pencilYellow,
    tabStyle: {
      backgroundColor: white,
      height: 56,
    }
  }
}

const tabNavigatorConfigAndroid = {
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    activeTintColor: white,
    tabStyle: {
      backgroundColor: pencilYellow,
      height: 56,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
      paddingTop: 40,
      paddingBottom: 30,
    }
  }
}

const Tabs = isIos
  ? createBottomTabNavigator(routeConfigs, tabNavigatorConfigIos)
  : createMaterialTopTabNavigator(routeConfigs, tabNavigatorConfigAndroid)

const MainNavigation = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerTintColor: white,
      header: null,
    },
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: pencilYellow,
      },
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: pencilYellow,
      },
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: pencilYellow,
      },
    },
  },
  QuizComplete: {
    screen: QuizComplete,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: pencilYellow,
      },
    },
  }
})

export default class App extends React.Component {

  componentDidMount() {
    // set a reminder for quizzes.
  }

  render() {
    return (
      <Provider
        store={createStore(reducer, middleware)}>
        <View style={styles.container}>
          <CardsStatusBar backgroundColor={pencilYellow} barStyle={'light-content'}/>
          <MainNavigation/>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

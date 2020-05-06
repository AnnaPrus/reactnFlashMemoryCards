import React from 'react';
import Home from './components/Home'
import CreateDeck from './components/CreateDeck'
import DeckList from './components/DeckList'
import DeckHome from './components/DeckHome'
import AddCard from './components/AddCard'
import StartQuiz from './components/StartQuiz'
import {StackNavigator} from 'react-navigation';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import reducer from './reducer/index'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import {setLocalNotification} from './helper/notification'

const MyApp = StackNavigator({
  Home: { screen: Home },
  CreateDeck: {screen: CreateDeck},
  DeckList: {screen: DeckList},
  DeckHome: {screen: DeckHome},
  AddCard: {screen: AddCard},
  StartQuiz: {screen: StartQuiz},
});
export default class App extends React.Component {
 async componentDidMount(){
    await setLocalNotification()
  }
  render() {
    console.disableYellowBox = true;
    return (
     <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <View style={{flex: 1}}>
          <MyApp/>
        </View>
      </Provider>
    )
  }
}



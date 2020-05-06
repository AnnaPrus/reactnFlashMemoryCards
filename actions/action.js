import {GET,ADD_DECK, ADD_CARD} from '../reducer/index'
import { AsyncStorage } from 'react-native';

 const key = 'mykey'

 export const getData = () => {
    return async dispatch => {
        let response = await AsyncStorage.getItem(key);
        let data = await JSON.parse(response) || {};
        dispatch(restoreDecks(data))
        console.log(data)
    }
  }
   const restoreDecks = (state) => {
    return {
        type: GET,
        state
      }
  }
  export  const addDeck =  (deck) => {
      return async (dispatch,getState) => {
        const state = getState().cards
        const data = {...state, [deck] : { title: deck, questions: []}};
        await AsyncStorage.setItem(key, JSON.stringify(data))
        dispatch(addD(deck))
      }
  }

  const addD= (deck) => {
    return {
        type: 'ADD_DECK',
        deck
      }
  }

  export  const addCard =  (deck,card) => {
      return async (dispatch,getState) => {
        const state=getState().cards
        const stateDeck= state[deck]
        const cards = {...state, [deck]:{ ...stateDeck, questions:[...stateDeck['questions'], card] }};
        await AsyncStorage.setItem(key,
        JSON.stringify(cards));
        //this.getData();
        //let response = await AsyncStorage.getItem(key);
        //let data = await JSON.parse(response) || {};
        dispatch(addC(deck, card))
      }
  }

  const addC= (deck, card) => {
    return {
        type: ADD_CARD,
        deck,
        card
      }
  }

  export const setScore= (deck, score) => {
    return {
        type: "SET_SCORE",
        deck,
        score
      }
  }
  export const getScore= (deck, score) => {
    return {
        type: "Get_SCORE",
        deck,
        score
      }
  }







export const ADD_CARD="ADD_CARD"
export const ADD_DECK='ADD_DECK'
export const GET="GET"
import {combineReducers} from 'redux';
function cards (state = {} , action) {

    switch (action.type) {
  
      case ADD_CARD:
        return {...state, [action.deck]:{ ...state[action.deck], questions:[...state[action.deck]['questions'], action.card] }}
  
       case ADD_DECK:
       
        return  {...state, [action.deck] : { title: action.deck, questions: []}}
        case GET:
        return  action.state
      default:
        return state
    } 

  }
  function score (state = {} , action) {
    switch (action.type) {
       case "SET_SCORE":
        return  {...state, [action.deck]: action.score}
      default:
        return state
    }
  }

  export default combineReducers({cards, score
    
    })
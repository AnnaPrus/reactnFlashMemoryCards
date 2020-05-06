import React from 'react'
import {View, TextInput, StyleSheet, Text, TouchableOpacity, Left} from 'react-native'
import {addDeck} from '../actions/action'
import { connect } from 'react-redux'
import {setScore, getScore} from '../actions/action'

class CreateDeck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }
    static navigationOptions = {
        title: 'Create Deck',
        headerTintColor: "#f9df81",
        headerStyle: {
          backgroundColor: '#127C78',
        },
        headerBackTitleStyle: {fontSize: 15,},
     }

    render() {
      const { params } = this.props.navigation.state;
      const addDeck = params ? params.add : null;
      return (
          <View style={{flex:1, backgroundColor: '#127C78'}}>
            <View style={styles.container}>
                <Text style={styles.label}>
                    What is the title of your newt deck?
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder=" Deck title"
                    onChangeText={(text) => this.setState({text})}
                    editable = {true}
                    maxLength = {40}
                    multiline = {false}
                    placeholderTextColor= '#fcf6e0'
                    underlineColorAndroid='transparent'
                />
                <TouchableOpacity style={styles.button} onPress={()=>{if(this.state.text === ''){alert("Please type the deck title!")} 
                    else{
                    this.props.setZeroScore(deck=this.state.text) ;
                    this.props.AddDeck(this.state.text).then(()=>{
                        this.props.navigation.replace('DeckHome',{deck:this.state.text})});
                    }
                    }}>
                    <Text style={styles.buttonText}>Create Deck</Text>
                </TouchableOpacity>
            </View>
        </View>
      );
    }
}
const styles = StyleSheet.create({
    container: {
       paddingTop: 23,
       paddingLeft: 20,
       paddingRight: 20,
       backgroundColor: '#127C78',
    },
    label:{
        alignSelf: 'flex-start',
        fontSize: 18,
        color: "#FFA17A"
    },
    input: {
       marginTop: 10,
       height: 40,
       borderColor: '#F3EADA',
       borderWidth: 2,
       borderRadius: 8,
       paddingLeft: 10,
       color: 'white',
       fontSize:16,
       },
    button:{
        backgroundColor: '#F3EADA',
        padding: 10,
        borderRadius: 7,
        height: 35,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText:{
        color: '#127C78',
      },

})

function mapDispatchToProps (dispatch) {
    const score = 0
    return {
      AddDeck: (deck) => dispatch(addDeck(deck)),
      setZeroScore: (deck) => dispatch(setScore(deck, score )),
    }
  }

export default connect(null, mapDispatchToProps)(CreateDeck)
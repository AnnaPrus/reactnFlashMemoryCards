import React from 'react'
import {View, TextInput, StyleSheet, Text, TouchableOpacity, HeaderBarItem, Dimensions, HeaderBackArrow, Platform} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons';

class DeckHome extends React.Component {
  constructor(props){
    super(props)
    console.log("IN COBSTR")
  }
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Deck Home',
        headerTintColor: "#f9df81",
        headerStyle: {
          backgroundColor: '#127C78'
        },
        headerTitleStyle: { color: '#f9df81' },
        headerBackTitleStyle: {fontSize: 15,},
        headerLeft: <TouchableOpacity 
          style={{marginLeft: 19}} onPress={() => { navigation.replace('DeckList')}}>
            <Ionicons color = '#f9df81' size={25} name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}/>
          </TouchableOpacity>
    });

    render() {
      const { params } = this.props.navigation.state;
      const deck = params ? params.deck : null;
      const dataDeck= this.props.data[deck];
      const questionArray= dataDeck['questions']
        return (
          <View style={styles.container}>
            <Text style={{marginTop:50, marginBottom:10, fontSize:48, color:"#F3EADA"}}>{deck}</Text>
            <Text style={{marginBottom:20, fontSize:16, color:"#F3EADA"}}>{questionArray.length} card(s)</Text>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate(
                'AddCard',
                {deck: deck}
              )}>
            <Text style={styles.buttonText}>Add card</Text>
           </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate(
                'StartQuiz',
                {deck: deck}

              )}>
            <Text style={styles.buttonText}>Start quiz</Text>
            </TouchableOpacity>
          </View>
        );
    }
}
var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#127C78',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    button:{
      backgroundColor: '#F3EADA',
      padding: 10,
      borderRadius: 7,
      height: 45,
      marginLeft: 40,
      marginRight: 40,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width:width/2,
    },
    buttonText:{
      color: '#127C78',
      fontSize: 15,
      
    },
  });

  function mapStateToProps (state, { navigation }) {
    return {
      data: state.cards,
    }
  }
export default connect(mapStateToProps
)(DeckHome)
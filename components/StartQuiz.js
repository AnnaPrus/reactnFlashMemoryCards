import React from 'react'
import Card from './Card'
import {View, TextInput, StyleSheet, Text, TouchableOpacity, FlatList, ListView, Dimensions} from 'react-native'
import { connect } from 'react-redux'
import ItemView from './ItemView'
import {clearLocalNotification, setLocalNotification} from '../helper/notification'

class StartQuiz extends React.Component {

    static navigationOptions = {
        title: 'Quiz',
        headerTintColor: "#f9df81",
        headerStyle: {
          backgroundColor: '#127C78'
        },
        headerBackTitleStyle: {fontSize: 15,},
    }

    goBakcToFirst=()=>{
        this.list.scrollToIndex({ index: 0 });
    }
    render() {
      const { params } = this.props.navigation.state;
      const deck = params ? params.deck : null;
      const dataDeck = this.props.data[deck]
      const questionArray = dataDeck['questions']

      return (
          <View style={{flex: 1, backgroundColor: '#127C78'}}>
              {(questionArray.length) ?
            <FlatList
                horizontal={true}
                pagingEnabled={true}
                ref={(ref) => { this.list = ref; }}
                keyExtractor={item => item['question']}
                data={questionArray}
                renderItem={
                    ({item}) =>
                    {
                        const size = questionArray.length;
                        const index = questionArray.findIndex( i => i['question'] === item['question'] );
                        return <ItemView item={item} deck={deck} index={index} size={size} backToFirst={this.goBakcToFirst} />
                    }
                }

            /> : <Text style={{fontSize:18, marginHorizontal:10, marginTop:200, color:"white", textAlign:"center"}}>Sorry, you cannot take a quiz because there are no cards in the deck!</Text>}
          </View>
      );
    }
}
const styles = StyleSheet.create({

    label:{
        alignSelf: 'flex-start',
        fontSize: 18,
    },
    input: {
       marginTop: 10,
       height: 40,
       borderColor: '#777',
       borderWidth: 2,
       borderRadius: 8,
       paddingLeft: 10,
    },
    button:{
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 7,
        height: 35,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText:{
        color: '#fff',
      },
      buttons:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      },

      correctionButton:{
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 7,
        height: 40,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
})

function mapStateToProps (state, { navigation }) {
    return {
      data: state.cards,
    }
  }
export default connect(mapStateToProps
)(StartQuiz)
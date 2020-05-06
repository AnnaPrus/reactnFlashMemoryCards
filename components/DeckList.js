import React from 'react'
import { connect } from 'react-redux'
import {View, TextInput, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native'
ItemView=({item,props}) => {
    const data = props.data[item]
    return(
    <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate(
              'DeckHome',
              {deck : item}
            )}>
        <Text style={[styles.buttonText,{fontSize:19}]}>{item} </Text>
        <Text style={[styles.buttonText,{fontSize:14}]}>{data['questions'].length} card(s)</Text>
    </TouchableOpacity>
    )
}
class DeckList extends React.Component {
    static navigationOptions = {
        title: 'Deck List',
        headerTintColor: "#f9df81",
        headerStyle: {
          backgroundColor: '#4f869b'
        }
    }

    renderArray = ({item}) => {
        const { params } = this.props.navigation.state;
        const deck = this.props.data[item]
        return <ItemView item={item} props={this.props}/>
    }
    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        );
      };
    render() {
        const { params } = this.props.navigation.state;
        const deckList = Object.keys(this.props.data)
       return (
         <View style={styles.container}>
            <View style={styles.subContainer}>
              {(deckList.length) ? <FlatList
                  data={deckList}
                  renderItem={this.renderArray}
              /> :<View style={{backgroundColor: '#127C78'}}><Text style={{fontSize:17, color: "white"}}>You have to create a deck first!</Text></View>}
            </View>
          </View>
      );
    }
}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#127C78',
    },
    subContainer: {
       paddingTop: 23,
       paddingLeft: 20,
       paddingRight: 20,
       
    },

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
        backgroundColor: '#F3EADA',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText:{
        color: '#127C78',
      },
})

function mapStateToProps (state, { navigation }) {
    //const { entryId } = navigation.state.params
    return {
      data: state.cards,
    }
  }
export default connect(mapStateToProps
)(DeckList)
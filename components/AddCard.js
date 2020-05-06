import React from 'react'
import {View, TextInput, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import {addCard} from '../actions/action'
import { connect } from 'react-redux'

class AddCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {textQ: '', textA: '', height: 0};
    }

    static navigationOptions = {
        title: 'Home',
        headerTintColor: "#f9df81",
        headerStyle: {
          backgroundColor: '#4f869b'
        },
        headerBackTitleStyle: {fontSize: 15,},
     }

     updateSize = (height) => {
        this.setState({
          height
        });
      }

    render() {
        const { params } = this.props.navigation.state;
        const deck = params ? params.deck : null;
        const {height} = this.state
        return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.subContainer}>
            <Text style={styles.label}>
                Type a question:
            </Text>
            <TextInput
                style={[styles.input,{height: 40}]}
                placeholder=" Question"
                onChangeText={(textQ) => this.setState({textQ})}
                editable = {true}
                maxLength = {80}
                multiline = {true}
                placeholderTextColor= '#fcf6e0'
                underlineColorAndroid='transparent'
            />

            <Text style={styles.label}>
                Type the answer:
            </Text>
            <TextInput
                style={[styles.input,{height: Math.max(40, this.state.height+5)}]}
                placeholder=" Answer"
                onChangeText={(textA) => this.setState({textA})}
                editable = {true}
                maxLength = {110}
                multiline = {true}
                placeholderTextColor= '#fcf6e0'
                onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                underlineColorAndroid='transparent'
            />
            <TouchableOpacity style={styles.button} onPress={()=>{if(this.state.textQ === '' || this.state.textA ===''){alert('Please type the question and the answer!')} else{const aCard = {question: this.state.textQ,
                answer: this.state.textA}; this.props.AddCard(deck,aCard); this.props.navigation.goBack()}}}>
                <Text style={styles.buttonText}>Submit
                </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    }
}
const styles = StyleSheet.create({
    container: {
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
        marginTop: 5,
        color: "#FFA17A",
    },
    input: {
       marginTop: 10,
       borderColor: '#F3EADA',
       borderWidth: 2,
       borderRadius: 8,
       paddingLeft: 10,
       paddingTop: 5,
       marginBottom: 8,
       color: '#F3EADA',
       fontSize: 14,
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

function mapDispatchToProps (dispatch, { navigation }) {
    return {
      AddCard: (deck, card) => dispatch(addCard(deck, card)),
    }
  }

export default connect(null, mapDispatchToProps
)(AddCard)
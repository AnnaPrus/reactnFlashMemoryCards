import React, { Component } from 'react';
import { StyleSheet,TouchableOpacity ,Text, View, Animated, Easing,Dimensions } from 'react-native';
import { connect } from 'react-redux'
import logoImg from '../images/logo.png';

class Home extends Component {
    constructor (props) {
      super(props)
      this.opacityValue = new Animated.Value(0);
    }
    static navigationOptions = {
      title: 'Home',
      headerTintColor: "#f9df81",
      headerStyle: {
        backgroundColor: '#127C78'
      }
    }

    opacityAnimation = () => {
      this.opacityValue.setValue(0);
      Animated.timing(
        this.opacityValue,
        {
          toValue: 1,
          duration: 1600,
          easing: Easing.linear
        }
      ).start();
    }
    componentDidMount(){
      this.opacityAnimation()
    }

    render() {
      let opacityInterpolate = this.opacityValue.interpolate({
        inputRange: [0, 0.4 ,1],
        outputRange: [0.8, 0, 1]
      });
      return (
        <Animated.View style={styles.container}>
          <Animated.Image source={logoImg } style={styles.logo}/>
          <Animated.Text style={[styles.logoText,{opacity: opacityInterpolate}]}> We help you to memorize </Animated.Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate(
                'DeckList'
              )}>
              <Text style={styles.buttonText}>Decks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate(
                'CreateDeck',
                {add: this.addDeck}
              )}>
              <Text style={styles.buttonText}>Create deck</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      );
    }
  }
  export default connect()(Home)

  var {height, width} = Dimensions.get('window');
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#127C78',
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: '#127C78',
      alignItems: 'center',
      justifyContent: 'center',
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
      width: width/2,
    },
    buttonText:{
      color: '#127C78',
    },
    logo:{
      width: 160,
      height: 150,
      marginBottom: 40, 
      marginTop: 60,
    },
    logoText:{
      textAlign: 'center',
      fontSize: 17,
      color: '#8EE9E3',
      textShadowColor: 'white',
    },
  });
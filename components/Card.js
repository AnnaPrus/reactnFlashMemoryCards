import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

export default class Card extends Component {
  UNSAFE_componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }
  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  }
  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }
    return (
      <View >
        <View>
           <Animated.View style={[frontAnimatedStyle, styles.flipCard]}>
              <TouchableOpacity style={styles.actualCard} onPress={() => this.flipCard()}>
                <Text style={styles.flipText}>
                  {this.props.item['question']}
                </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
            <TouchableOpacity style={styles.actualCard} onPress={() => this.flipCard()}>
              <Text style={styles.flipText}>
                {this.props.item['answer']}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    );
  }
}
var { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'gray',
  },
  flipCard: {
    width: width - 40,
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8EE9E3',
    backfaceVisibility: 'hidden',
    borderRadius: 10,
  },
  flipCardBack: {
    backgroundColor: "#FFA17A",
    position: "absolute",
    top: 0,
  },
  flipText: {
    fontSize: 20,
    color: '#127C78',
    fontWeight: 'bold',
  }
  ,
  actualCard: {
    width: width - 40,
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center',
  }
  ,
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 7,
    height: 40,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});

AppRegistry.registerComponent('animatedbasic', () => animatedbasic);

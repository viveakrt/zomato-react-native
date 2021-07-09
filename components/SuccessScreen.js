import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export class SuccessScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon style={styles.icon} name="done" size={200} color="#ed5a6b" />
        <Text style={styles.text}>Order Placed</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 40,
    fontWeight: 'bold',
    fontSize: 24,
  },
  icon: {
    borderColor: '#ed5a6b',
    borderWidth: 2,
    borderRadius: 100,
  },
});

export default SuccessScreen;

import React, {Component} from 'react';
import {View, Text} from 'react-native';
export class Error extends Component {
  render() {
    return (
      <View
        style={{
          height: 20,
          position: 'absolute',
          top: 58,
          width: '100%',
          textAlign: 'center',
        }}>
        <Text style={{color: 'red', textAlign: 'center'}}>
          {this.props.message}
        </Text>
      </View>
    );
  }
}

export default Error;

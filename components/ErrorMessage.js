import React, {Component} from 'react';
import {View, Text} from 'react-native';
export class ErrorMessage extends Component {
  render() {
    return (
      <View
        style={{
          height: 20,
          position: 'absolute',
          bottom: 85,
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

export default ErrorMessage;

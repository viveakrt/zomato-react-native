import React, {Component} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../components/LoginScreen';
import SignUpScreen from '../components/SignUpScreen';

const Stack = createStackNavigator();

export class AuthNavigation extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    );
  }
}

export default AuthNavigation;

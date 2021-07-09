import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './navigation/AuthNavigation';
import HomeNavigation from './navigation/HomeNavigation';
import {connect} from 'react-redux';

export class Navigation extends Component {
  render() {
    return (
      <NavigationContainer>
        {this.props.token ? <HomeNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    );
  }
}
const mapStateToProp = state => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProp)(Navigation);

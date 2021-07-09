import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';

export class ProfileScreen extends Component {
  render() {
    return (
      <View style={styles.profileView}>
        <Text style={styles.head}>Profile</Text>
        <Image
          source={require('../images/login-bg.jpg')}
          style={styles.profileImg}
        />
        <Text style={styles.profileName}>{this.props.name}</Text>
        <Text style={styles.profileText}>{this.props.email}</Text>

        <TouchableOpacity
          onPress={() => {
            this.props.logOut();
          }}
          style={styles.submitButton}>
          <Text style={styles.submitButtonText}> LogOut </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  profileImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  profileName: {
    margin: 15,
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileText: {
    margin: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  head: {
    fontWeight: 'bold',
    fontSize: 28,
    margin: 15,
  },
  profileView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    height: 40,
    marginTop: 25,
    margin: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ed5a6b',
    borderRadius: 8,
    width: '80%',
  },
  submitButtonText: {
    color: '#fff',
  },
});
const mapStateToProp = state => {
  return {
    name: state.name,
    email: state.email,
    password: state.password,
    token: state.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch({type: 'LOGOUT'}),
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(ProfileScreen);

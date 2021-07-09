import React, {Component} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import axios from 'axios';
import Form from './Form';
import ErrorMessage from './ErrorMessage';
export class SignUpScreen extends Form {
  state = {
    loading: false,
    name: '',
    email: '',
    password: '',
    showPassword: true,
    error: '',
  };

  // schema = {
  //   name: Joi.string().required().label('Name'),
  //   password: Joi.string().required().min(8).max(30).label('Password'),
  //   email: Joi.string().required().email().label('Email'),
  // };

  togglePassword = () => {
    this.setState({showPassword: !this.state.showPassword});
  };

  registerUser = async () => {
    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      this.state.email,
    );

    if (!validEmail) {
      this.setState({error: 'Invalid Email'});
      return;
    }

    this.setState({loading: true});
    const {name, email, password} = this.state;

    const signUp = this.props.signUpUser;
    try {
      const response = await axios.post(
        'https://zomato-clonee.herokuapp.com/user/register',
        {
          name: name,
          email: email,
          password: password,
        },
      );
      this.setState({loading: false});
      console.log(response.data);
      const {jwtToken, userData} = response.data;
      signUp({
        name: userData.customer_name,
        email: userData.email,
        token: jwtToken,
        customer_id: response.data.userData.id_customer,
      });
    } catch (error) {
      this.setState({loading: false});
      console.log(error.response.data);
      this.setState({error: error.response.data.message});
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter Name"
            style={styles.input}
            value={this.state.name}
            onChangeText={text => {
              this.setState({name: text});
            }}
            placeholderTextColor="grey"
          />
          <TextInput
            autoCapitalize="none"
            placeholder="Enter Email"
            style={styles.input}
            value={this.state.email}
            onChangeText={text => {
              this.setState({email: text});
            }}
            placeholderTextColor="grey"
          />
          <View>
            <TextInput
              secureTextEntry={this.state.showPassword}
              placeholderTextColor="grey"
              placeholder="Enter Password"
              style={styles.input}
              value={this.state.password}
              onChangeText={text => {
                this.setState({password: text});
              }}
            />
            {this.state.showPassword ? (
              <Icon
                onPress={this.togglePassword}
                style={styles.icon}
                name="eye"
                size={20}
                color="pink"
              />
            ) : (
              <Icon
                style={styles.icon}
                name="eye-slash"
                size={20}
                color="pink"
                onPress={this.togglePassword}
              />
            )}
          </View>
          <ErrorMessage message={this.state.error} />
          {this.state.loading ? (
            <ActivityIndicator
              style={{padding: 22}}
              size="large"
              color="#ed5a6b"
            />
          ) : (
            <TouchableOpacity
              onPress={this.registerUser}
              style={styles.submitButton}>
              <Text style={styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
          )}

          <Text style={styles.loginText}>
            Already have an account?
            <Text onPress={() => this.props.navigation.navigate('Login')}>
              {' '}
              Login
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    color: 'grey',
    height: 45,
    paddingLeft: 30,
    margin: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'pink',
  },
  inputContainer: {
    width: '90%',
    marginLeft: 15,
    marginRight: 15,
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
  },
  submitButtonText: {
    color: '#fff',
  },
  loginText: {
    textAlign: 'center',
    color: '#ed5a6b',
  },
  loginbtn: {
    textAlign: 'center',
    color: '#ed5a6b',
  },
  icon: {
    position: 'absolute',
    top: 30,
    right: 15,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    signUpUser: details => dispatch({type: 'SIGNUP', payload: details}),
  };
};

export default connect(null, mapDispatchToProps)(SignUpScreen);

import React, {Component} from 'react';
import {
  Image,
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import axios from 'axios';
import Error from './Error';
export class LoginScreen extends Component {
  state = {
    emailFeild: '',
    passwordFeild: '',
    showPassword: true,
    error: '',
    loading: false,
  };
  togglePassword = () => {
    this.setState({showPassword: !this.state.showPassword});
  };
  loginUser = async () => {
    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      this.state.emailFeild,
    );

    if (!validEmail) {
      this.setState({error: 'Invalid Email'});
      return;
    }
    this.setState({loading: true});
    const {emailFeild, passwordFeild} = this.state;
    const sendRequest = this.props.login;
    try {
      const response = await axios.post(
        'https://zomato-clonee.herokuapp.com/user/login',
        {
          email: emailFeild,
          password: passwordFeild,
        },
      );
      this.setState({loading: false});
      console.log(response.data);
      sendRequest({
        token: response.data['jwtToken'],
        name: response.data.userData.customer_name,
        email: emailFeild,
        customer_id: response.data.userData.id_customer,
      });
    } catch (error) {
      console.log(error.response.data);
      this.setState({loading: false});
      this.setState({error: error.response.data.message});
    }
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <Image
          source={require('../images/login-bg.jpg')}
          style={{resizeMode: 'cover', width: '100%', flex: 1}}
        />
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            placeholderTextColor="grey"
            placeholder="Enter Email"
            style={styles.input}
            value={this.state.emailFeild}
            onChangeText={text => {
              this.setState({emailFeild: text});
            }}
          />
          <Error message={this.state.error} />
          <View>
            <TextInput
              secureTextEntry={this.state.showPassword}
              placeholderTextColor="grey"
              placeholder="Enter Password"
              style={styles.input}
              value={this.state.passwordFeild}
              onChangeText={text => {
                this.setState({passwordFeild: text});
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
          {this.state.loading ? (
            <ActivityIndicator
              style={{padding: 16.5}}
              size="large"
              color="#ed5a6b"
            />
          ) : (
            <TouchableOpacity onPress={this.loginUser} style={styles.loginBtn}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          )}

          <View>
            <Text style={styles.textColor}>OR</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.props.navigation.navigate('SignUp')}
            style={styles.signupBtn}>
            <Text style={styles.signupText}>Continue with Email</Text>
          </TouchableOpacity>
          <Text Text style={styles.ParagraphColor}>
            By Continuing, you agree to our
          </Text>
          <View style={styles.policy}>
            <Text Text style={styles.ParagraphText}>
              Terms of Service
            </Text>

            <Text Text style={styles.ParagraphText}>
              Privacy Policy
            </Text>
            <Text Text style={styles.ParagraphText}>
              Content Policy
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    borderColor: '#cfd1d4',
    color: 'grey',
    backgroundColor: '#fff',
    height: 45,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 30,
  },
  inputContainer: {
    margin: 20,
    position: 'absolute',
    bottom: 0,
    width: '90%',
    textAlign: 'center',
  },
  loginBtn: {
    backgroundColor: '#ed5a6b',
    height: 45,
    margin: 12,
    textAlign: 'center',
    borderRadius: 8,
  },
  loginText: {
    fontFamily: 'Roboto',
    color: '#fff',
    textAlign: 'center',
    height: 50,
    margin: 12,
    fontWeight: 'bold',
  },
  signupBtn: {
    textAlign: 'center',
    borderRadius: 8,
    backgroundColor: '#fff',
    height: 45,
    margin: 12,
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    height: 50,
    margin: 12,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#000',
    textAlign: 'center',
    height: 50,
    margin: 12,
    fontWeight: 'bold',
  },
  textColor: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  policy: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ParagraphColor: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  ParagraphText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  icon: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    login: details => dispatch({type: 'LOGIN', payload: details}),
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);

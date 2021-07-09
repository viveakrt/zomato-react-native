import React, {Component} from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
export class SearchBar extends Component {
  render() {
    return (
      <View>
        <TextInput
          placeholderTextColor="grey"
          placeholder="Restaurent Name"
          style={styles.input}
          value={this.props.searchText}
          onChangeText={this.props.searchHandler}
        />
        <Icon
          onPress={this.togglePassword}
          style={styles.icon}
          name="search"
          size={30}
          color="#ed5a6b"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    borderColor: '#cfd1d4',
    color: 'grey',
    backgroundColor: '#fff',
    height: 50,
    margin: 12,
    borderWidth: 2,
    borderRadius: 18,
    paddingLeft: 50,
  },
  icon: {
    position: 'absolute',
    top: 20,
    left: 22,
  },
});
export default SearchBar;

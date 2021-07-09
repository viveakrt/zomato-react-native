import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import IconF from 'react-native-vector-icons/Feather';

export class Location extends Component {
  state = {
    country: 'uk',
  };
  render() {
    return (
      <View style={styles.location}>
        <Icon
          style={styles.icon}
          name="location-outline"
          size={30}
          color="#ed5a6b"
        />
        <DropDownPicker
          items={[
            {
              label: 'Bengaluru',
              value: 'Bengaluru',
            },
            {
              label: 'Delhi',
              value: 'Delhi',
            },
          ]}
          placeholder="Select Location"
          defaultValue={this.props.city}
          containerStyle={{height: 45, width: '80%', margin: 10}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={item => this.props.selectCity(item.value)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  location: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    marginTop: 14,
    marginLeft: 10,
  },
});

export default Location;

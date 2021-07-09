import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

export class Card extends Component {
  render() {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Image
            style={styles.img}
            source={{
              uri: this.props.img,
            }}
          />
          <Text style={styles.name}>{this.props.name}</Text>
          <Text style={styles.description}>{this.props.description}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cardContainer: {
    margin: 15,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 10,
  },
  description: {
    color: 'grey',
    padding: 10,
    fontSize: 12,
  },
  card: {
    width: '100%',
    borderRadius: 10,
  },
  img: {
    borderRadius: 10,
    width: '100%',
    height: 200,
  },
  name: {
    padding: 10,
    fontSize: 18,
    fontWeight: '600',
  },
});
export default Card;

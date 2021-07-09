import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export class Item extends Component {
  render() {
    return (
      <View style={styles.itemContainer}>
        <Icon
          style={styles.icon}
          name="dot-circle-o"
          size={15}
          color={this.props.itemDetails.is_veg ? '#f77b72' : 'green'}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>
            {this.props.itemDetails.item_name}
          </Text>
          <Text style={styles.itemPrice}>₹{this.props.itemDetails.price}</Text>
          <Text style={styles.itemDescription}>
            {this.props.itemDetails.description}
          </Text>
        </View>
        <View style={styles.itemView}>
          <Image
            style={styles.img}
            source={{
              uri: this.props.itemDetails.item_image,
            }}
          />
          <TouchableOpacity
            onPress={() =>
              this.props.addCartItem({...this.props.itemDetails, count: 1})
            }
            style={styles.submitButton}>
            <Text style={styles.submitButtonText}>ADD + </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  itemContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    left: 17,
    top: 2,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ed5a6b',
    borderRadius: 8,
    width: 60,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  itemName: {
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    padding: 5,
    fontWeight: 'bold',
    fontSize: 14,
  },
  itemDescription: {
    color: 'grey',
    padding: 5,
  },
  img: {
    borderRadius: 5,
    height: 100,
    width: 100,
  },
  icon: {
    position: 'absolute',
    top: 16,
    left: 5,
  },
  itemDetails: {
    flex: 2,
    paddingLeft: 8,
  },
});
export default Item;

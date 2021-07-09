import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import CartItem from './CartItem';
import {connect} from 'react-redux';
import {LogBox} from 'react-native';
import axios from 'axios';
import PushNotification from 'react-native-push-notification';
export class CartScreen extends Component {
  state = {
    address: '',
    comment: '',
    loading: false,
  };
  totalPrice = () => {
    const totalItems = this.props.cart.map(item => item.price * item.count);
    const totalNoOfItems = this.props.cart
      .map(item => item.count)
      .reduce((acc, cur) => acc + cur);
    this.props.updateItemCount(totalNoOfItems);
    console.log(totalNoOfItems);
    const finalPrice = totalItems.reduce((acc, cur) => acc + cur);
    this.props.updatePrice(finalPrice);
    return finalPrice;
  };
  componentDidMount() {
    LogBox.ignoreAllLogs();
  }
  addCartItem = item => {
    const originalCart = [...this.props.cart];
    const findItem = originalCart.find(
      element => element.item_id === item.item_id,
    );
    if (findItem) {
      const itemIndex = originalCart.findIndex(
        element => element.item_id === findItem.item_id,
      );
      originalCart[itemIndex].count += 1;

      this.props.addCartItem(originalCart);
    } else {
      console.log('item added ... ', item);
      this.props.addCartItem([...originalCart, item]);
    }
  };
  removeCartItem = item => {
    const originalCart = [...this.props.cart];
    const findItem = originalCart.find(
      element => element.item_id === item.item_id,
    );
    const itemIndex = originalCart.findIndex(
      element => element.item_id === findItem.item_id,
    );

    if (findItem.count === 1) {
      originalCart.splice(itemIndex, 1);

      if (originalCart.length === 0) {
        this.props.updateItemCount(0);
      }

      this.props.removeCartItem(originalCart);
    } else {
      originalCart[itemIndex].count -= 1;

      const totalNoOfItems = this.props.cart
        .map(item => item.count)
        .reduce((acc, cur) => acc + cur);
      this.props.updateItemCount(totalNoOfItems);
      console.log(totalNoOfItems);

      this.props.removeCartItem(originalCart);
    }
  };

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  placeOrder = async () => {
    this.setState({loading: true});
    const {address, comment} = this.state;
    const {customer_id, total_price} = this.props;
    console.log('Customer.....', customer_id);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${this.props.token}`,
        },
      };
      const resId = this.props.cart[0].id_restaurant;
      const items = this.props.cart.map((element, index) => ({
        [index]: element.count,
      }));

      let newItems = {};
      items.forEach(item => {
        newItems[Object.keys(item)[0]] = Object.values(item)[0];
      });

      console.log('item....', newItems);
      const response = await axios.put(
        'https://zomato-clonee.herokuapp.com/placeOrder',
        {
          restaurantId: resId,
          customerId: customer_id,
          price: total_price,
          comment: comment,
          address: address,
          items: newItems,
        },
        config,
      );
      this.setState({
        loading: false,
        orderPlaced: true,
      });
      this.props.removeAllCartItems();
      this.props.updateItemCount(0);
      PushNotification.createChannel(
        {
          channelId: '123',
          channelName: 'notification',
          soundName: 'default',
          importance: 4,
          vibrate: true,
        },
        created => console.log(`createChannel returned '${created}'`),
      );

      PushNotification.localNotification({
        channelId: '123',
        message: 'Order Placed :)',
      });

      this.props.navigation.navigate('Success');
      console.log(response.data);
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.log(error.response.data.message);
    }
  };
  render() {
    return (
      <ScrollView>
        <>
          <View>
            <Text style={styles.head}>My Cart</Text>
            {this.props.cart.length > 0 ? (
              this.props.cart.map(item => {
                return (
                  <View key={item.item_id}>
                    <CartItem
                      removeCartItem={this.removeCartItem}
                      addCartItem={this.addCartItem}
                      itemDetails={item}
                    />
                  </View>
                );
              })
            ) : (
              <Text style={styles.noItem}>No Item Found</Text>
            )}
            {this.props.cart.length > 0 && (
              <>
                <Text style={styles.price}>
                  Subtotal ({this.props.totalItems} items): ₹{this.totalPrice()}
                  .00
                </Text>
                <TextInput
                  autoCapitalize="none"
                  placeholderTextColor="grey"
                  placeholder="Enter Address"
                  style={styles.input}
                  value={this.state.address}
                  onChangeText={text => this.setState({address: text})}
                />
                <TextInput
                  autoCapitalize="none"
                  placeholderTextColor="grey"
                  placeholder="Enter Comments"
                  style={styles.input}
                  value={this.state.comment}
                  onChangeText={text => this.setState({comment: text})}
                />
                {this.state.loading ? (
                  <ActivityIndicator color="#ed5a6b" size="large" />
                ) : (
                  <TouchableOpacity
                    onPress={this.placeOrder}
                    style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Proceed to Buy</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        </>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  noItem: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
  },
  head: {
    fontWeight: 'bold',
    fontSize: 25,
    padding: 15,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 15,
  },
  submitButton: {
    height: 40,
    marginTop: 10,
    margin: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ed5a6b',
    borderRadius: 8,
    width: '90%',
  },
  submitButtonText: {
    color: '#fff',
  },
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
});
const mapStateToProp = state => {
  return {
    email: state.email,
    password: state.password,
    token: state.token,
    cart: state.cart,
    totalItems: state.totalItems,
    customer_id: state.customer_id,
    total_price: state.total_price,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addCartItem: cartItem => dispatch({type: 'ADDITEM', payload: cartItem}),
    removeCartItem: cartItem =>
      dispatch({type: 'REMOVEITEM', payload: cartItem}),
    updateItemCount: count =>
      dispatch({type: 'UPDATE_ITEM_COUNT', payload: count}),
    updatePrice: price => dispatch({type: 'UPDATE_PRICE', payload: price}),
    removeAllCartItems: () => dispatch({type: 'REMOVEALLITEM'}),
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(CartScreen);

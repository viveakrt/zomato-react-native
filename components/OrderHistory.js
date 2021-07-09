import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
export class OrderHistory extends Component {
  state = {
    orders: [],
    resname: [],
    loading: false,
  };
  fetchOrders = async () => {
    this.setState({loading: true});
    const {customer_id} = this.props;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${this.props.token}`,
        },
      };
      const response = await axios.post(
        'https://zomato-clonee.herokuapp.com/myOrder',
        {
          customerId: customer_id,
        },
        config,
      );
      const resname = response.data.rest.map(
        element => element.restaurant_name,
      );
      console.log('Res name..........', resname);
      this.setState({
        orders: [...response.data.order],
        resname: [...resname],
        loading: false,
      });
      console.log(response.data);
    } catch (error) {
      this.setState({loading: false});
      console.log(error.response.data.message);
    }
  };
  componentDidMount() {
    this.fetchOrders();
  }
  render() {
    return (
      <ScrollView>
        {this.state.loading ? (
          <ActivityIndicator
            style={{marginTop: 100}}
            size="large"
            color="#ed5a6b"
          />
        ) : (
          <View style={styles.OrderView}>
            <Text style={styles.head}>Orders History</Text>

            <Icon
              onPress={() => this.fetchOrders()}
              style={styles.icon}
              name="refresh"
              size={30}
              color="pink"
            />

            {this.state.orders.length > 0 && (
              <View>
                {this.state.orders.length > 0 &&
                  this.state.orders.map((element, index) => {
                    return (
                      <View style={styles.orderItems}>
                        <View>
                          <Text style={styles.name}>
                            {this.state.resname[index]}
                          </Text>
                          <Text style={styles.date}>
                            Ordered On {element.order_time.slice(0, 10)}
                          </Text>
                        </View>
                        <Text style={styles.price}>₹{element.price}</Text>
                      </View>
                    );
                  })}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  orderImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  orderText: {
    margin: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  head: {
    fontWeight: 'bold',
    fontSize: 28,
    margin: 15,
  },
  OrderView: {},
  orderItems: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    position: 'absolute',
    right: 30,
    top: 20,
  },
  name: {
    fontSize: 20,
  },
  date: {
    color: 'grey',
  },
  price: {
    fontWeight: 'bold',
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

export default connect(mapStateToProp)(OrderHistory);

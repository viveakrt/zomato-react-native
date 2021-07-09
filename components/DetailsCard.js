import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconF from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import axios from 'axios';
import Item from './Item';

export class DetailsCard extends Component {
  state = {
    items: [],
    allItems: [],
    loading: true,
    category: 'all',
    search: '',
  };
  componentDidMount() {
    const config = {
      headers: {Authorization: `${this.props.token}`},
    };

    axios
      .get(
        `https://zomato-clonee.herokuapp.com/restaurant/${this.props.route.params.id_restaurant}`,
        config,
      )
      .then(res => {
        this.setState({
          allItems: [...res.data.food],
          items: [...res.data.food],
          loading: false,
        });
        console.log(res.data);
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  }
  displayCategory = isVeg => {
    if (isVeg === 'all') {
      this.setState({
        items: [...this.state.allItems],
        category: isVeg,
      });
    } else {
      const newItems = this.state.allItems.filter(item => {
        return item.is_veg === isVeg;
      });
      this.setState({
        items: [...newItems],
        category: isVeg,
      });
    }
  };
  // componentWillUnmount() {
  //   this.setState = (state, callback) => {
  //     return;
  //   };
  // }
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

      const totalNoOfItems = this.props.cart
        .map(item => item.count)
        .reduce((acc, cur) => acc + cur);
      this.props.updateItemCount(totalNoOfItems);
      console.log(totalNoOfItems);
    } else {
      console.log('item added ... ', item);
      this.props.addCartItem([...originalCart, item]);
      if (this.props.cart.length === 0) {
        this.props.updateItemCount(1);
      } else {
        const totalNoOfItems = [...originalCart, item]
          .map(items => items.count)
          .reduce((acc, cur) => acc + cur);
        this.props.updateItemCount(totalNoOfItems);
        console.log(totalNoOfItems);
      }
    }
  };
  searchItemHandler = text => {
    const newItems = this.state.allItems.filter(element => {
      return element.item_name.includes(text);
    });
    this.setState({
      search: text,
      items: [...newItems],
    });
  };
  render() {
    const {
      restaurant_name,
      description,
      restaurant_image,
    } = this.props.route.params;
    return (
      <>
        <ScrollView>
          <View>
            <Text style={styles.head}> {restaurant_name}</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.time}>
              <Icon
                style={styles.icon}
                name="clock"
                size={22}
                color="#ed5a6b"
              />
              <Text style={styles.text}>38 Mins</Text>
              <Icon
                style={styles.icon}
                name="directions"
                size={22}
                color="#ed5a6b"
              />
              <Text style={styles.text}>Live Tracking</Text>
            </View>
            <View style={styles.offer}>
              <Text style={styles.offerText}>
                60% off up to Rs.150 use code WELCOME60
              </Text>
            </View>
            <Image
              style={styles.img}
              source={{
                uri: restaurant_image,
              }}
            />
            <Text style={styles.menuHeader}>Menu</Text>
            <View style={styles.foodTypes}>
              <TouchableWithoutFeedback onPress={() => this.displayCategory(1)}>
                <View
                  style={[
                    styles.foodType,
                    {
                      borderColor:
                        this.state.category !== 1 ? '#c0c2c0' : '#f77b72',
                    },
                  ]}>
                  <IconF
                    style={styles.icon}
                    name="dot-circle-o"
                    size={15}
                    color="#f77b72"
                  />
                  <Text>Non-Veg</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => this.displayCategory(0)}>
                <View
                  style={[
                    styles.foodType,
                    {
                      borderColor: this.state.category ? '#c0c2c0' : 'green',
                    },
                  ]}>
                  <IconF
                    style={styles.icon}
                    name="dot-circle-o"
                    size={15}
                    color="green"
                  />
                  <Text>Veg</Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => this.displayCategory('all')}>
                <View
                  style={[
                    styles.foodType,
                    {
                      borderColor:
                        this.state.category === 'all'
                          ? 'rgb(39, 129, 231)'
                          : '#c0c2c0',
                    },
                  ]}>
                  <IconF
                    style={styles.icon}
                    name="dot-circle-o"
                    size={15}
                    color="grey"
                  />
                  <Text>All</Text>
                </View>
              </TouchableWithoutFeedback>

              <TextInput
                placeholder="Search Item"
                placeholderTextColor="grey"
                style={styles.searchItem}
                value={this.state.search}
                onChangeText={this.searchItemHandler}
              />
              <Icon
                style={styles.searchIcon}
                name="search"
                size={22}
                color="#f77b72"
              />
            </View>

            {this.state.loading ? (
              <ActivityIndicator
                style={styles.loading}
                size="large"
                color="#ed5a6b"
              />
            ) : (
              <>
                {this.state.items.length > 0 ? (
                  this.state.items.map(item => {
                    return (
                      <View key={item.item_id}>
                        <Item
                          addCartItem={this.addCartItem}
                          itemDetails={item}
                        />
                      </View>
                    );
                  })
                ) : (
                  <Text style={styles.noItem}>No Item Found</Text>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  head: {
    fontWeight: 'bold',
    fontSize: 28,
    padding: 10,
  },
  description: {
    marginLeft: 13,
    color: 'grey',
  },
  time: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 13,
  },
  icon: {
    marginRight: 5,
  },
  text: {
    marginRight: 8,
  },
  offer: {
    margin: 13,
    backgroundColor: 'rgb(39, 129, 231)',
    borderRadius: 5,
  },
  offerText: {
    color: '#fff',
    padding: 5,
    fontWeight: 'bold',
  },
  img: {
    margin: 10,
    height: 250,
    borderRadius: 8,
  },
  menuHeader: {
    fontWeight: 'bold',
    fontSize: 25,
    margin: 10,
  },
  foodTypes: {
    display: 'flex',
    flexDirection: 'row',
  },
  foodType: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
    borderWidth: 2,
    padding: 8,
    borderColor: '#c0c2c0',
  },
  touchableOpacityStyle: {
    backgroundColor: 'pink',
    position: 'absolute',
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  shopBtn: {
    position: 'absolute',
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    right: 173,
    bottom: 0,
    backgroundColor: '#ed5a6b',
    borderRadius: 22,
  },
  shopText: {
    position: 'absolute',
    color: '#fff',
    fontWeight: 'bold',
    top: 0,
    left: 20,
    fontSize: 15,
  },
  noItem: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
  },
  searchItem: {
    top: 5,
    height: 40,
    width: '35%',
    borderWidth: 2,
    padding: 8,
    borderColor: '#c0c2c0',
    borderRadius: 10,
    paddingLeft: 8,
    color: '#000',
  },
  searchIcon: {
    position: 'absolute',
    right: 24,
    top: 12,
  },
});

const mapStateToProp = state => {
  return {
    email: state.email,
    password: state.password,
    token: state.token,
    cart: state.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCartItem: cartItem => dispatch({type: 'ADDITEM', payload: cartItem}),
    removeAllCartItem: () => dispatch({type: 'REMOVEALLITEM'}),
    updateItemCount: count =>
      dispatch({type: 'UPDATE_ITEM_COUNT', payload: count}),
  };
};
export default connect(mapStateToProp, mapDispatchToProps)(DetailsCard);

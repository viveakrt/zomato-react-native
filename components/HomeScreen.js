import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';

import {connect} from 'react-redux';
import SearchBar from './SearchBar';
import Card from './Card';
import Location from './Location';
import axios from 'axios';
import Swiper from 'react-native-swiper';

export class HomeScreen extends Component {
  state = {
    searchText: '',
    searchResult: [],
    city: '',
    allRestaurent: [],
    restaurent: [],
    loading: true,
  };

  selectCity = loc => {
    const filterRestaurent = this.state.allRestaurent.filter(item => {
      return item.city_name === loc;
    });
    console.log(filterRestaurent);
    this.setState({city: loc, restaurent: [...filterRestaurent]});
  };
  searchHandler = text => {
    const newRestaurent = this.state.allRestaurent.filter(element => {
      return (
        element.restaurant_name.includes(text) ||
        element.description.includes(text)
      );
    });
    this.setState({searchText: text, restaurent: [...newRestaurent]});
  };

  componentDidMount() {
    const config = {
      headers: {Authorization: `${this.props.token}`},
    };

    axios
      .get('https://zomato-clonee.herokuapp.com/all', config)
      .then(res => {
        this.setState({
          allRestaurent: [...res.data],
          restaurent: [...res.data],
          loading: false,
        });
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  }
  render() {
    return (
      <View>
        {this.state.loading ? (
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color="#ed5a6b"
          />
        ) : (
          <ScrollView>
            <Location city={this.state.city} selectCity={this.selectCity} />
            <SearchBar
              searchHandler={this.searchHandler}
              searchText={this.state.searchText}
            />
            <View style={styles.sliderContainer}>
              <Swiper
                activeDotColor="#ed5a6b"
                horizontal={false}
                autoplay
                height={200}>
                <View style={styles.slide}>
                  <Image
                    resizeMode="cover"
                    source={{
                      uri:
                        'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
                    }}
                    style={styles.slideImage}
                  />
                </View>
                <View style={styles.slide}>
                  <Image
                    resizeMode="cover"
                    source={{
                      uri:
                        'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
                    }}
                    style={styles.slideImage}
                  />
                </View>
              </Swiper>
            </View>
            <Text style={styles.head}>Eat what makes you happy</Text>
            <View style={styles.categoryContainer}>
              <TouchableOpacity onPress={() => this.searchHandler('Healthy')}>
                <View style={styles.category}>
                  <Image
                    resizeMode="cover"
                    source={{
                      uri:
                        'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
                    }}
                    style={styles.categoryImg}
                  />
                  <Text>Healthy</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.searchHandler('Biryani')}>
                <View style={styles.category}>
                  <Image
                    resizeMode="cover"
                    source={{
                      uri:
                        'https://b.zmtcdn.com/data/pictures/9/18354059/32a4aa29d6f970438b5be19b234a030d.jpg',
                    }}
                    style={styles.categoryImg}
                  />
                  <Text>Biryani</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.searchHandler('Chicken')}>
                <View style={styles.category}>
                  <Image
                    resizeMode="cover"
                    source={{
                      uri:
                        'https://images.unsplash.com/photo-1614398751058-eb2e0bf63e53?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=916&q=80',
                    }}
                    style={styles.categoryImg}
                  />
                  <Text>Chicken</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.searchHandler('Pizza')}>
                <View style={styles.category}>
                  <Image
                    resizeMode="cover"
                    source={{
                      uri:
                        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=714&q=80',
                    }}
                    style={styles.categoryImg}
                  />
                  <Text>Pizza</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.head}>Restaurants around you</Text>
            {this.state.restaurent.length > 0 ? (
              this.state.restaurent.map(item => {
                return (
                  <TouchableOpacity
                    key={item.id_restaurant}
                    onPress={() =>
                      this.props.navigation.navigate('DetailsCard', item)
                    }
                    activeOpacity={0.9}>
                    <Card
                      name={item.restaurant_name}
                      img={item.restaurant_image}
                      description={item.description}
                    />
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text style={styles.noRes}>No Restaurant Found</Text>
            )}
          </ScrollView>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  head: {
    fontWeight: 'bold',
    fontSize: 22,
    margin: 15,
  },
  loading: {
    top: 200,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  slideImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  sliderContainer: {
    height: 200,
    width: '95%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  categoryContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  categoryImg: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  category: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRes: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
  },
});
const mapStateToProp = state => {
  return {
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

export default connect(mapStateToProp, mapDispatchToProps)(HomeScreen);

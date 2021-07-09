import React, {Component} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../components/HomeScreen';
import OrderHistory from '../components/OrderHistory';
import ProfileScreen from '../components/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import DetailsCard from '../components/DetailsCard';
import CartScreen from '../components/CartScreen';
import SuccessScreen from '../components/SuccessScreen';

import {connect} from 'react-redux';

const HomeStack = createStackNavigator();
const CartStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      options={{headerShown: false}}
      name="Home"
      component={HomeScreen}
    />
    <HomeStack.Screen
      options={{headerTitle: ''}}
      name="DetailsCard"
      component={DetailsCard}
    />
    <HomeStack.Screen name="Cart" component={CartScreen} />
  </HomeStack.Navigator>
);

const CartStackScreen = ({navigation}) => (
  <CartStack.Navigator>
    <CartStack.Screen
      options={{headerShown: false}}
      name="Cart"
      component={CartScreen}
    />
    <CartStack.Screen
      options={{headerTitle: ''}}
      name="Success"
      component={SuccessScreen}
    />
  </CartStack.Navigator>
);

export class HomeNavigation extends Component {
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home-sharp' : 'home-outline';
            } else if (route.name === 'Orders') {
              iconName = focused ? 'menu' : 'menu-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'people' : 'ios-people-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#ed5a6b',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Orders" component={OrderHistory} />
        <Tab.Screen
          options={{tabBarBadge: this.props.totalItems}}
          name="Cart"
          component={CartStackScreen}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }
}
const mapStateToProp = state => {
  return {
    totalItems: state.totalItems,
  };
};

export default connect(mapStateToProp)(HomeNavigation);

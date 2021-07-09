import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {LogBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Navigation from './Navigation';
import {PersistGate} from 'redux-persist/integration/react';

const initialState = {
  name: '',
  email: '',
  password: '',
  token: '',
  cart: [],
  totalItems: 0,
  customer_id: '',
  total_price: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        customer_id: action.payload.customer_id,
        token: action.payload.token,
      };
    case 'SIGNUP':
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
        customer_id: action.payload.customer_id,
      };
    case 'LOGOUT':
      return {
        name: '',
        email: '',
        password: '',
        token: '',
        cart: [],
        totalItems: 0,
        customer_id: '',
      };
    case 'ADDITEM':
      return {
        ...state,
        cart: [...action.payload],
      };
    case 'REMOVEITEM':
      return {
        ...state,
        cart: [...action.payload],
      };
    case 'REMOVEALLITEM':
      return {
        ...state,
        cart: [],
      };
    case 'UPDATE_ITEM_COUNT':
      return {
        ...state,
        totalItems: action.payload,
      };
    case 'UPDATE_PRICE':
      return {
        ...state,
        total_price: action.payload,
      };
    default:
      return state;
  }
};
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);

const persister = persistStore(store);
export class App extends Component {
  componentDidMount() {
    LogBox.ignoreAllLogs();
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

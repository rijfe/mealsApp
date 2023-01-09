import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MealsNevigator from './navigation/MealsNevigator';
import mealReducer from './store/reducers/meals';
import { createStore,combineReducers } from 'redux';
import { Provider } from 'react-redux';

const rootReducer = combineReducers({
  meals: mealReducer
});

const store = createStore(rootReducer);

export default function App() {

  return (
    <Provider store={store}>
      <MealsNevigator />
    </Provider>
  );
}

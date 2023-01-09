import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { View, Text,Button, FlatList, StyleSheet, TouchableOpacity, Platform, ImageBackground, ScrollView, Image, Switch} from 'react-native';
import { NavigationContainer,DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Color from '../constants/Color';
import { Ionicons } from '@expo/vector-icons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import CategoriesScreen,{screenOptions as categoriesScreenOptions} from '../screens/CategoriesScreen';
import CategoryMealsScreen,{screenOptions as categoryMealsScreenScreenOptions} from '../screens/CategoryMealsScreen';
import FilterScreen,{screenOptions as filterScreenOptions} from '../screens/FilterScreen';
import MealDetailScreen,{screenOptions as mealDetailScreenOptions} from '../screens/MealDetailScreen';
import FavoriteScreen, {screenOptions as favoriteScreenOptions} from '../screens/FavoriteScreen';


const FavStack = createStackNavigator();

const FavNav=() =>{
  return(
    <FavStack.Navigator >
      <FavStack.Screen name="Favorite" component={FavoriteScreen} options={favoriteScreenOptions}
      />
    </FavStack.Navigator>
  );
}

const Stack = createStackNavigator();

const App=()=> {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={CategoriesScreen} 
        options={categoriesScreenOptions}
      />
      <Stack.Screen name="Meals" component={CategoryMealsScreen} 
          options={categoryMealsScreenScreenOptions}
      />
      <Stack.Screen name="MealDetail" component={MealDetailScreen} 
        options={mealDetailScreenOptions}
      />
    </Stack.Navigator>
  );
}


const Tab = Platform.OS==='android'? createMaterialBottomTabNavigator(): createBottomTabNavigator();

const tabApp=()=>{
  return(
      <Tab.Navigator screenOptions={({route})=>({
        tabBarIcon:()=>{
            let iconName;
            if(route.name==='Meal'){
              iconName = 'ios-restaurant';
            }else{
              iconName = 'ios-star';
            }
            return <Ionicons name={iconName} size={25} color={"white"}/>
          }
        })}
        activeColor="white"
        inactiveColor="black"
        barStyle={{backgroundColor:Color.primaryColor}}
      >
        <Tab.Screen name="Meal" component={App} />
        <Tab.Screen name="Favorite" component={FavNav} />
      </Tab.Navigator>
  );
}

const FilStack = createStackNavigator();

const filNav=()=>{
  return(
    <FilStack.Navigator> 
      <FilStack.Screen name="filter" component={FilterScreen} options={filterScreenOptions}/>
    </FilStack.Navigator>
  );
}


const Drawer = createDrawerNavigator();

const drawerApp=()=>{
  return(
    <NavigationContainer>
      <Drawer.Navigator drawerContentOptions={{activeTintColor:Color.accentColor}}>
        <Drawer.Screen name="Home" component={tabApp} options={{drawerLabel:"Meals!"}}/>
        <Drawer.Screen name="Filter" component={filNav} options={{drawerLabel:"Filter!"}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
  },
  gridItem:{
    flex:1,
    margin: 15,
    height:150,
    borderRadius:10,
    overflow:Platform.OS === 'android'&& Platform.Version >= 21?'hidden': 'visible',
    elevation:5
  },
  container:{
    flex:1,
    borderRadius:15,
    shadowColor:'black',
    shadowOpacity:0.26,
    shadowOffset:{width:0,height:2},
    shadowRadius:10,
    padding:15,
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },
  title:{
    fontSize:20,
    textAlign:'center'
  },
  mealTitle:{
    fontSize:22,
    color:'white',
    backgroundColor:'rgba(0,0,0,0.7)',
    paddingVertical:5,
    paddingHorizontal:12,
    textAlign:'center'
  },
  mealRow:{
    flexDirection:'row'
  },
  mealItem:{
    height:200,
    width:'100%',
    backgroundColor:'#f5f5f5'
  },
  mealHeader:{
    height:'85%'
  },
  mealDetail:{
    paddingHorizontal:10,
    justifyContent:'space-between'
  },
  bgImage:{
    width:'100%',
    height:'100%',
    justifyContent:'flex-end'
  },
  detail:{
    flexDirection:'row',
    padding:15,
    justifyContent:'space-around'
  },
  image:{
    width:'100%',
    height:200
  },
  listItem:{
    marginVertical:10,
    marginHorizontal:20,
    borderColor:'#ccc',
    borderWidth:1,
    padding:10
  },
  mealTitle:{
    textAlign:'center',
    fontSize:15
  },
  filterContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    width:'80%',
    marginVertical:15
  },
  filterTitle:{
    fontSize:22,
    margin:20,
    textAlign:'center'
  }
});

export default drawerApp;
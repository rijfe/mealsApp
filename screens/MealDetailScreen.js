import React from 'react';
import { View, Text,Button, FlatList, StyleSheet, TouchableOpacity, Platform, ImageBackground, ScrollView, Image, Switch} from 'react-native';
import Color from '../constants/Color';
import {useSelector, useDispatch} from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import {HeaderButton,HeaderButtons,Item} from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import {toggleFavorite} from '../store/actions/meal'; 

const CustomHeaderButton = props => {
    return <HeaderButton IconComponent={Ionicons} iconSize={23} color={Platform.OS ==='android'?'white':Color.primaryColor} {...props}/>
  };

const MealDetailScreen=props=>{
    const {mealId,mealtitle} =props.route.params;
    const availableMeals = useSelector(state => state.meals.filteredMeals)
    const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));
    const dispatch = useDispatch();
    const toggleFavoriteHandler = useCallback(() =>{
      dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);
    useEffect(()=>{
      props.navigation.setParams({toggleFav:toggleFavoriteHandler});
    },[toggleFavoriteHandler]);

    useEffect(()=>{
      props.navigation.setParams({isFav: currentMealIsFavorite});
    },[currentMealIsFavorite]);

    const renderItem = itemData =>{
      if((itemData.item.title).indexOf(mealtitle)<0){
        return;
      }
      else{
        return(
          <ScrollView>
            <Text style={styles.mealTitle}>{mealtitle}</Text>
            <Image source={{uri:itemData.item.imageUrl}} style={styles.image}/>
            <View style={styles.detail}>
              <Text>{itemData.item.duration}m</Text>
              <Text>{itemData.item.complexity.toUpperCase()}</Text>
              <Text>{itemData.item.affordability.toUpperCase()}</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.title}>Ingredients</Text>
              {(itemData.item.ingredients).map(ingredients=>(<Text key={ingredients}>{ingredients}</Text>))}
              <Text style={styles.title}>Steps</Text>
              {(itemData.item.steps).map(steps=>(<Text key={steps}>{steps}</Text>))}
            </View>
          </ScrollView>
        );
      }
    };
    return(
      <View>
        <FlatList data={availableMeals} keyExtractor={(item,index)=>item.id} renderItem={renderItem} style={{width:'100%'}}/>
      </View>
    );
  }

export const screenOptions = navData =>{
    const toggleFavorite = navData.route.params.toggleFav;
    const isFavorite = navData.route.params.isFav;
    return {
      title:navData.route.params.mealtitle, 
      headerRight:()=>(
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title='Favorite' iconName={isFavorite?'ios-star':'ios-star-outline'} onPress={toggleFavorite}/>
        </HeaderButtons>),
      headerStyle:{backgroundColor:Platform.OS === 'android' ? Color.primaryColor: 'white'}, 
      headerTintColor:Platform.OS === 'android' ? 'white': Color.primaryColor
    };
  };
const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    mealTitle:{
        fontSize:22,
        color:'white',
        backgroundColor:'rgba(0,0,0,0.7)',
        paddingVertical:5,
        paddingHorizontal:12,
        textAlign:'center'
    },
    detail:{
        flexDirection:'row',
        padding:15,
        justifyContent:'space-around'
    },
    listItem:{
        marginVertical:10,
        marginHorizontal:20,
        borderColor:'#ccc',
        borderWidth:1,
        padding:10
    },
    title:{
        fontSize:20,
        textAlign:'center'
    },
    image:{
        width:'100%',
        height:200
    },
});

export default MealDetailScreen;
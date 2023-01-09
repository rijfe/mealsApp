import React from 'react';
import { View, Text,Button, FlatList, StyleSheet, TouchableOpacity, Platform, ImageBackground, ScrollView, Image, Switch} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import Color from '../constants/Color';
import {HeaderButton,HeaderButtons,Item} from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';


const CustomHeaderButton = props => {
    return <HeaderButton IconComponent={Ionicons} iconSize={23} color={Platform.OS ==='android'?'white':Color.primaryColor} {...props}/>
  };
  

const FavoriteScreen=props=>{
    const favMeals = useSelector(state => state.meals.favoriteMeals)

    if(favMeals.length === 0 || !favMeals){
      return(
        <View style={styles.content}>
          <Text>No favorite meals found. Start adding some!</Text>
        </View>
      );
    }
    const renderMealItem = itemData =>{
      return(
        <View style={styles.mealItem}>
          <TouchableOpacity onPress={()=>props.navigation.navigate('MealDetail',{mealId:itemData.item.title})}>
            <View>
              <View style={{...styles.mealRow,...styles.mealHeader}}>
                <ImageBackground source={{uri: itemData.item.imageUrl}} style={styles.bgImage}>
                  <Text style={styles.mealTitle}>{itemData.item.title}</Text>
                </ImageBackground>
              </View>
              <View style={{...styles.mealRow,...styles.mealDetail}}>
                <Text>{itemData.item.duration}m</Text>
                <Text>{itemData.item.complexity.toUpperCase()}</Text>
                <Text>{itemData.item.affordability.toUpperCase()}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <View style={styles.screen}>
        <FlatList data={favMeals} keyExtractor={(item,index)=>item.id} renderItem={renderMealItem} style={{width:'100%'}}/>
      </View>
    );
  }

export const screenOptions = navData=>{
    return{
        headerLeft:()=>(
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title='Menu' iconName='ios-menu' onPress={()=>{navData.navigation.dispatch(DrawerActions.toggleDrawer())}}/>
            </HeaderButtons>),
        title:'Your Favorite',
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
    content:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }
});

export default FavoriteScreen;
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import  { CATEGORIES} from '../data/dumy-data';
import Color from '../constants/Color';
import {HeaderButton,HeaderButtons,Item} from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

const CustomHeaderButton = props => {
  return <HeaderButton IconComponent={Ionicons} iconSize={23} color={Platform.OS ==='android'?'white':Color.primaryColor} {...props}/>
};

const CategoriesScreen=props=> {
    const renderGridItem = (itemData) => {
      const forColor = itemData.item.color;
      return(
        <TouchableOpacity style={styles.gridItem} onPress={()=>props.navigation.navigate('Meals',{catId:itemData.item.id ,otherParams:itemData.item.title})}>
          <View style={{...styles.container,...{backgroundColor:forColor}}}>
            <Text style={styles.title}>{itemData.item.title}</Text>
          </View>
        </TouchableOpacity>
      );
    };
  
    return(
      <FlatList keyExtractor={(item, index)=>item.id} data={CATEGORIES} renderItem={renderGridItem} numColumns={2}/>
    );
  }

export const screenOptions = navData =>{
  return{
      title:'Meal Categories', 
      headerLeft:()=>(
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item title='Menu' iconName='ios-menu' onPress={()=>{navData.navigation.dispatch(DrawerActions.toggleDrawer())}}/>
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
    gridItem:{
        flex:1,
        margin: 15,
        height:150,
        borderRadius:10,
        overflow:Platform.OS === 'android'&& Platform.Version >= 21?'hidden': 'visible',
        elevation:5
    },
    title:{
        fontSize:20,
        textAlign:'center'
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
});

export default CategoriesScreen;
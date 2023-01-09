import React from 'react';
import { View, Text,FlatList, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import {useSelector} from 'react-redux';
import Color from '../constants/Color';

const CategoryMealsScreen = props =>{
    const {catId} = props.route.params;
    const availableMeals = useSelector(state => state.meals.filteredMeals);
    const displayedMeals = availableMeals.filter(
        meal => meal.categoryIds.indexOf(catId) >= 0
    );
    if(displayedMeals.length === 0){
        return(
            <View style={styles.content}>
                <Text>No meals found, maybe check your filters?</Text>
            </View>
        );
    }
    const renderMealItem = itemData =>{
        if((itemData.item.categoryIds).indexOf(catId) < 0){
            return;
        }
        else{
            return(
                <View style={styles.mealItem}>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('MealDetail',{mealId:itemData.item.id, mealtitle: itemData.item.title})}>
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
        }
};
  return (
    <View style={styles.screen}>
      <FlatList data={availableMeals} keyExtractor={(item,index)=>item.id} renderItem={renderMealItem} style={{width:'100%'}}/>
    </View>
  );
};

export const screenOptions = navData =>{
    return{
        title:navData.route.params.otherParams,
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

export default CategoryMealsScreen;
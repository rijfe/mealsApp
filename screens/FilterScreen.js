import React,{ useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import Color from '../constants/Color';
import {HeaderButton,HeaderButtons,Item} from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meal';

const CustomFilterHeaderButton = props => {
  return <HeaderButton IconComponent={Ionicons} iconSize={23} color={Platform.OS ==='android'?'white':Color.primaryColor} {...props}/>
};

const FilterScreen= props =>{
  const { navigation } = props;

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian
    };

    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Available Filters / Restrictions</Text>
        <View style={styles.filterContainer}>
          <Text>Gluten-free</Text>
          <Switch 
            trackColor={{true:Color.primaryColor}} 
            thumbColor={Platform.OS === 'android' ? Color.primaryColor: 'white'}
            value={isGlutenFree} 
            onValueChange={newValue => setIsGlutenFree(newValue)}
          />
        </View>
        <View style={styles.filterContainer}>
          <Text>Vegan</Text>
          <Switch 
            trackColor={{true:Color.primaryColor}} 
            thumbColor={Platform.OS === 'android' ? Color.primaryColor: 'white'}
            value={isVegan} 
            onValueChange={newValue => setIsVegan(newValue)}
          />
        </View>
        <View style={styles.filterContainer}>
          <Text>Lactose-free</Text>
          <Switch 
            trackColor={{true:Color.primaryColor}} 
            thumbColor={Platform.OS === 'android' ? Color.primaryColor: 'white'}
            value={isLactoseFree} 
            onValueChange={newValue => setIsLactoseFree(newValue)}
          />
        </View>
        <View style={styles.filterContainer}>
          <Text>Vegetarian</Text>
          <Switch 
            trackColor={{true:Color.primaryColor}} 
            thumbColor={Platform.OS === 'android' ? Color.primaryColor: 'white'}
            value={isVegetarian} 
            onValueChange={newValue => setIsVegetarian(newValue)}
          />
        </View>
      </View>
    );
  }

export const screenOptions = props =>{
  const {navdata} = props
  return{
    headerTitle:'Filter', 
    headerLeft:()=>(
      <HeaderButtons HeaderButtonComponent={CustomFilterHeaderButton}>
        <Item title='Menu' iconName='ios-menu' onPress={()=>{navdata.navigation.dispatch(DrawerActions.toggleDrawer())}}/>
      </HeaderButtons>),
    headerRight:()=>(
      <HeaderButtons HeaderButtonComponent={CustomFilterHeaderButton}>
        <Item title='Save' iconName='ios-save' onPress={navdata.route.params.save}/>
      </HeaderButtons>
    ),
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
    filterContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        width:'80%',
        marginVertical:15
    },
    title:{
        fontSize:20,
        textAlign:'center'
    }
});

export default FilterScreen;
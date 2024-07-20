import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StoryStackNavigator from './StoryStackNavigator';
import Test from '../components/report/Test';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {},
      }}>
      <Tab.Screen name="Main" component={StoryStackNavigator} />
      <Tab.Screen name="Report" component={Test} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

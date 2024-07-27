import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StoryStackNavigator from './StoryStackNavigator';
import Report from '../components/report/Report';
import MyPage from '../components/myPage/MyPage';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {},
      }}>
      <Tab.Screen name="Main" component={StoryStackNavigator} />
      <Tab.Screen name="Report" component={Report} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

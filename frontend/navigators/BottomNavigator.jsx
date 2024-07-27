import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StoryStackNavigator from './StoryStackNavigator';
import Test from '../components/report/Test';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={StoryStackNavigator} />
      <Tab.Screen name="Report" component={Test} />
    </Tab.Navigator>
  );
}

export default BottomNavigator;

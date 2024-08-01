import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../components/story/Home';
import StoryHome from '../components/story/StoryHome';
import Situation from '../components/story/Situation';
import Condition from '../components/story/Condition';
import OnStory from '../components/story/OnStory';
import StoryEnding from '../components/story/StoryEnding';
import StoryReport from '../components/story/StoryReport';
import StoryRanking from '../components/story/StoryRanking';

const Stack = createStackNavigator();

function StoryStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: true}} // Home에서는 tabBar 보이게
      />
      <Stack.Screen
        name="StoryHome"
        component={StoryHome}
        options={{tabBarStyle: {display: 'none'}}} // 다른 화면에서는 tabBar 숨기기
      />
      <Stack.Screen
        name="Situation"
        component={Situation}
        options={{tabBarStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="Condition"
        component={Condition}
        options={{tabBarStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="OnStory"
        component={OnStory}
        options={{tabBarStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="StoryEnding"
        component={StoryEnding}
        options={{tabBarStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="StoryReport"
        component={StoryReport}
        options={{tabBarStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="StoryRanking"
        component={StoryRanking}
        options={{tabBarStyle: {display: 'none'}}}
      />
    </Stack.Navigator>
  );
}

export default StoryStackNavigator;

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
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="StoryHome" component={StoryHome} />
      <Stack.Screen name="Situation" component={Situation} />
      <Stack.Screen name="Condition" component={Condition} />
      <Stack.Screen name="OnStory" component={OnStory} />
      <Stack.Screen name="StoryEnding" component={StoryEnding} />
      <Stack.Screen name="StoryReport" component={StoryReport} />
      <Stack.Screen name="StoryRanking" component={StoryRanking} />
    </Stack.Navigator>
  );
}

export default StoryStackNavigator;

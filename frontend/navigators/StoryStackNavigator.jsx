import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../components/story/Home';
import StoryHome from '../components/story/StoryHome';
import Situation from '../components/story/Situation';
import Condition from '../components/story/Condition';
import OnStory from '../components/story/OnStory';

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
      {/* <Stack.Screen name="StoryMapReport" component={Details} />
      <Stack.Screen name="StoryPaceReport" component={Details} />  */}
    </Stack.Navigator>
  );
}

export default StoryStackNavigator;

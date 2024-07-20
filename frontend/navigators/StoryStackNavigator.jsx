import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../components/story/Home';
import StoryHome from '../components/story/StoryHome';
import Situation from '../components/story/Situation';

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
      {/* <Stack.Screen name="Condition" component={Details} />
      <Stack.Screen name="OnRunnig" component={Details} />
      <Stack.Screen name="StoryMapReport" component={Details} />
      <Stack.Screen name="StoryPaceReport" component={Details} />  */}
    </Stack.Navigator>
  );
}

export default StoryStackNavigator;

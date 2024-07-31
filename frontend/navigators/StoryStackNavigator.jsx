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
<<<<<<< HEAD
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
=======
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
>>>>>>> a5dabd7d912b13d3845c8dd06b89330d89bd5d6b
    </Stack.Navigator>
  );
}

export default StoryStackNavigator;

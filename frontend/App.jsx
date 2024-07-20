import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './navigators/BottomNavigator';

enableScreens();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;

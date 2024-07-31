import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigationState} from '@react-navigation/native';
import StoryStackNavigator from './StoryStackNavigator';
import Report from '../components/report/Report';
import MyPage from '../components/myPage/MyPage';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
  // 현재 네비게이션 상태를 가져옵니다.
  const currentRouteName = useNavigationState(state => {
    const routeIndex = state?.routes[state.index]?.state?.index ?? 0;
    return routeIndex;
  });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          display: currentRouteName == 0 ? 'flex' : 'none',
        },
      }}>
      <Tab.Screen
        name="Main"
        component={StoryStackNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Report" component={Report} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
}

export default BottomNavigator;

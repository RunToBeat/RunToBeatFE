import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigationState} from '@react-navigation/native';
import StoryStackNavigator from './StoryStackNavigator';
import Report from '../components/report/Report';
import MyPage from '../components/myPage/MyPage';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
  // 현재 네비게이션 상태를 가져옵니다.
  const currentRouteName = useNavigationState(state => {
    const routeIndex = state?.routes[state.index]?.state?.index ?? 0;
    return routeIndex;
  });

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          display: currentRouteName === 0 ? 'flex' : 'none',
        },
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Main') {
            iconName = 'home';
          } else if (route.name === 'Report') {
            iconName = 'line-chart';
          } else if (route.name === 'MyPage') {
            iconName = 'user';
          }

          return <FontAwesomeIcon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#226BFF', // 활성화된 탭 아이콘 색상
        tabBarInactiveTintColor: 'gray', // 비활성화된 탭 아이콘 색상
        tabBarLabelStyle: {fontSize: 12}, // 탭바 레이블 스타일
      })}>
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

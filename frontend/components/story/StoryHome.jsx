import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {defaultScreen} from '../../styles/layout';
import {useNavigation} from '@react-navigation/native';

// id 통해서 스토리 식별 후 api로 데이터 받아오기
function StoryHome() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Situation'); // 'Details'는 이동할 화면의 이름입니다.
  };

  return (
    <View style={defaultScreen.screen}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={require('../../image/RunToBeat_logo.png')} />
      </TouchableOpacity>
    </View>
  );
}

export default StoryHome;

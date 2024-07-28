import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {defaultScreen} from '../../styles/layout';
import {useNavigation, useRoute} from '@react-navigation/native';

function StoryEnding() {
  const navigation = useNavigation();
  const route = useRoute();

  // route.params를 통해 OnStory에서 전달된 데이터 받기
  const {steps, distance, calories, averagePace, elapsedTime} = route.params;

  // 리포트로 데이터 전달하는 함수
  const handlePress = () => {
    navigation.navigate('StoryReport', {
      steps,
      distance,
      calories,
      averagePace,
      elapsedTime,
    });
  };

  return (
    <View style={defaultScreen.screen}>
      <Text style={styles.text}>Story Ending Screen</Text>
      <Button title="Go to Report" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginVertical: 8,
  },
});

export default StoryEnding;

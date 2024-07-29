import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {defaultScreen} from '../../styles/layout';
import {useNavigation, useRoute} from '@react-navigation/native';

function StoryReport() {
  const navigation = useNavigation();
  const route = useRoute(); // route 객체 가져오기

  // route.params를 통해 OnStory에서 전달된 데이터 받기
  const {steps, distance, calories, averagePace, elapsedTime} = route.params;

  const sendDataToBackend = async () => {
    const memberId = 1;

    const runningTime = {
      hour: Math.floor(elapsedTime / 3600),
      minute: Math.floor((elapsedTime % 3600) / 60),
      second: elapsedTime % 60,
      nano: 0, // 나노초가 필요하지 않으면 0으로 설정
    };

    const dataToSend = {
      memberId,
      runningDistance: distance,
      runningTime,
      recordDate: new Date().toISOString().split('T')[0],
      recordPace: averagePace,
      runningStep: steps,
    };

    try {
      const response = await fetch(
        'https://your-backend-endpoint.com/api/data',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        },
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log('Data sent successfully:', responseData);
      } else {
        console.error('Failed to send data:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  useEffect(() => {
    sendDataToBackend();
  }, []);

  const handlePress = () => {
    navigation.navigate('StoryRanking'); // 'Details'는 이동할 화면의 이름입니다.
  };

  return (
    <View style={defaultScreen.screen}>
      <Text>StoryReport</Text>
      <Text style={styles.text}>걸음 수: {steps}</Text>
      <Text style={styles.text}>거리: {distance.toFixed(2)} km</Text>
      <Text style={styles.text}>칼로리: {calories.toFixed(2)}</Text>
      <Text style={styles.text}>AvgPace: {averagePace}</Text>
      <Text style={styles.text}>
        경과 시간: {Math.floor(elapsedTime / 60)}:
        {String(elapsedTime % 60).padStart(2, '0')}
      </Text>
      <Button title="Go to Ranking" onPress={handlePress}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginVertical: 8,
  },
});

export default StoryReport;

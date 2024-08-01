import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';

function StoryReport() {
  const navigation = useNavigation();
  const route = useRoute();

  // route.params를 통해 OnStory에서 전달된 데이터 받기
  const {steps, distance, calories, averagePace, elapsedTime} = route.params;

  // 데이터 전송 함수
  const sendDataToBackend = async () => {
    const memberId = 1; // 예시로 memberId를 1로 설정

    // 백엔드로 보낼 데이터
    const dataToSend = {
      memberId,
      runningDistance: parseFloat(distance.toFixed(2)),
      runningTime: parseFloat(elapsedTime.toFixed(2)),
      recordDate: new Date().toISOString().split('T')[0],
      recordPace: parseFloat(averagePace.toFixed(2)),
      runningStep: steps,
    };

    try {
      console.log('Sending data to backend...', dataToSend);
      const response = await axios.post(
        `http://192.168.107.9:8080/record`,
        dataToSend,
      );
      console.log('Data sent successfully:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Response error:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request setup error:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };

  useEffect(() => {
    sendDataToBackend();
  }, []);

  const handlePress = () => {
    navigation.navigate('StoryRanking');
  };

  return (
    <View style={styles.screen}>
      <Image
        source={require('../../image/mapImg.png')}
        style={styles.mapImage}
      />
      <View style={styles.textWrap1}>
        <Text style={styles.textBig}>1화. K에게 가다</Text>
        <Text style={styles.textSmall}>2024년 8월 3일 15:33</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.textWrap2}>
        <View style={styles.textBox}>
          <Text style={styles.text}>{distance.toFixed(2)}</Text>
          <Text style={styles.miniText}>거리 (Km)</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>{averagePace.toFixed(2)}</Text>
          <Text style={styles.miniText}>평균 페이스</Text>
        </View>
      </View>

      <View style={styles.textWrap2}>
        <View style={styles.textBox}>
          <Text style={styles.text}>{calories.toFixed(2)}</Text>
          <Text style={styles.miniText}>칼로리</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>{steps}</Text>
          <Text style={styles.miniText}>걸음 수</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.btnText}>확인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  textWrap1: {
    alignItems: 'center',
  },
  textBig: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  textSmall: {
    color: 'white',
    fontSize: 13,
    marginBottom: 10,
  },
  line: {
    height: 1, // 선의 두께
    backgroundColor: 'grey',
    marginTop: 10, // 텍스트와 선 사이의 간격
    width: '100%', // 선의 길이
    marginBottom: 20,
  },
  miniText: {
    color: 'white',
    fontSize: 15,
  },
  textWrap2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },
  textBox: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'white',
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 40,
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 23,
    color: 'black',
    textAlign: 'center',
  },
  mapImage: {
    width: '100%',
    height: '40%',
    resizeMode: 'cover',
  },
});

export default StoryReport;

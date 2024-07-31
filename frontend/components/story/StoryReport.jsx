import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
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
          <Text style={styles.text}>{averagePace}</Text>
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
    fontSize: 18,
    marginVertical: 8,
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
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  miniText: {
    color: 'white',
    fontSize: 15,
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

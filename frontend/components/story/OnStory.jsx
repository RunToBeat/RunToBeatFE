import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  Button,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {initializeGoogleFit, fetchGoogleFitData} from '../googleFitUtils'; // 유틸 함수 가져오기

function OnStory() {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const {situation, condition} = route.params; // 전달된 id를 받음

  useEffect(() => {
    // Google Fit 초기화 및 데이터 가져오기
    const initializeAndFetchData = async () => {
      try {
        await initializeGoogleFit();

        // 날짜 범위 설정
        const startDate = '2024-07-22T00:00:00Z'; // 요청할 시작 날짜
        const endDate = new Date().toISOString(); // 현재 날짜와 시간

        // 로그로 날짜 확인
        console.log('Fetching data from', startDate, 'to', endDate);

        const res = await fetchGoogleFitData(startDate, endDate);
        setData(res);
        console.log(res);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch Google Fit data.');
      }
    };

    initializeAndFetchData();
  }, []);

  const handlePress = () => {
    navigation.navigate('Condition'); // 'Condition' 화면으로 이동
  };

  const opt = {
    startDate: '2017-01-01T00:00:17.971Z', // required ISO8601Timestamp
    endDate: new Date().toISOString(), // required ISO8601Timestamp
    bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
    bucketInterval: 1, // optional - default 1.
  };

  GoogleFit.getDailyStepCountSamples(opt)
    .then(res => {
      console.log('Daily steps >>> ', res);
    })
    .catch(err => {
      console.warn(err);
    });

  // or with async/await syntax
  async function fetchData() {
    const res = await GoogleFit.getDailyStepCountSamples(opt);
    console.log(res);
  }

  // shortcut functions,
  // return weekly or daily steps of given date
  // all params are optional, using new Date() without given date,
  // adjustment is 0 by default, determine the first day of week, 0 == Sunday, 1==Monday, etc.
  GoogleFit.getDailySteps(date).then().catch();
  GoogleFit.getWeeklySteps(date, adjustment).then().catch();

  return (
    <View style={styles.screen}>
      <Text>
        OnStory, {situation}, {condition}
      </Text>
      <TouchableOpacity onPress={handlePress}>
        <Image source={require('../../image/RunToBeat_logo.png')} />
      </TouchableOpacity>

      <Button title="팝업창 열기" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.modalScreen}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>안녕하세요, 저는 모달입니다!</Text>
            <Button
              title="닫기"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>

      {data && (
        <View>
          <Text>Activity Data:</Text>
          <Text>{JSON.stringify(data)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContent: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    color: 'white',
    marginBottom: 10,
  },
});

export default OnStory;

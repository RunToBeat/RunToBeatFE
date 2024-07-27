// OnStory.js

import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, Button, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {authorizeGoogleFit, fetchGoogleFitData} from '../googleFitService'; // 유틸 함수 가져오기

function OnStory() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const {situation, condition} = route.params; // 전달된 id를 받음

  useEffect(() => {
    const initializeAndFetchData = async () => {
      try {
        // Google Fit 인증
        await authorizeGoogleFit();

        // 날짜 범위 설정
        const startDate = '2024-07-22T00:00:00Z'; // 요청할 시작 날짜
        const endDate = new Date().toISOString(); // 현재 날짜와 시간

        // 데이터 가져오기
        const res = await fetchGoogleFitData(startDate, endDate);
        setData(res);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeAndFetchData();
  }, []);

  const handlePress = () => {
    navigation.navigate('Condition'); // 'Condition' 화면으로 이동
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
        <Button
          title="Retry"
          onPress={() => {
            setLoading(true);
            setError(null);
            initializeAndFetchData();
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>
        OnStory, {situation}, {condition}
      </Text>
      <Button title="Navigate to Condition" onPress={handlePress} />

      {data && (
        <View>
          <Text>Activity Data:</Text>
          <Text>{JSON.stringify(data, null, 2)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = {
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default OnStory;

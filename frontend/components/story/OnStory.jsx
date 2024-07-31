import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Button, ActivityIndicator} from 'react-native';
import {useDataTracking} from './useDataTracking';
import {useNavigation} from '@react-navigation/native';

const OnStory = () => {
  const navigation = useNavigation();

  const {
    steps,
    distance,
    calories,
    pace,
    averagePace,
    elapsedTime,
    loading,
    error,
    togglePause,
    isMusicEnded,
  } = useDataTracking();

  useEffect(() => {
    let timer;
    if (isMusicEnded) {
      timer = setTimeout(() => {
        navigation.navigate('StoryEnding', {
          steps,
          distance,
          calories,
          averagePace,
          elapsedTime,
        });
      }, 1500); // 1.5초 대기
    }

    // 컴포넌트가 언마운트될 때 타이머 정리
    return () => clearTimeout(timer);
  }, [isMusicEnded, navigation]);

  // 페이스를 "분'초"" 형식으로 포맷팅하는 함수
  const formatPace = pace => {
    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);
    return `${minutes}'${String(seconds).padStart(2, '0')}"`;
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.screen}>
        <Text>Error: {error}</Text>
        <Button title="Retry" onPress={() => {}} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>OnStory 화면</Text>
      <View style={styles.modalContent}>
        <Text>걸음 수: {steps}</Text>
        <Text>거리: {distance.toFixed(2)} km</Text>
        <Text>칼로리: {calories.toFixed(2)}</Text>
        <Text>Pace: {formatPace(pace)}</Text>
        <Text>AvgPace: {formatPace(averagePace)}</Text>
        <Text>
          경과 시간: {Math.floor(elapsedTime / 60)}:
          {String(elapsedTime % 60).padStart(2, '0')}
        </Text>
        <Button title="일시정지" onPress={togglePause} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default OnStory;

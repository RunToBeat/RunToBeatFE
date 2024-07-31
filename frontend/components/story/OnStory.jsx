import React from 'react';
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
  } = useDataTracking();

  const handlePress = () => {
    navigation.navigate('Condition');
  };

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
      <Button title="Condition 화면으로 이동" onPress={handlePress} />
      <View style={styles.modalContent}>
        <Text>OnStory 화면</Text>
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

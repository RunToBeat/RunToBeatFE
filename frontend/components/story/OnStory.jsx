import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Button, ActivityIndicator} from 'react-native';
import {useDataTracking} from './useDataTracking';
import {useNavigation} from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

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

  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('Home');
  };

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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingTop: '20%',
  },
  content: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 55,
    fontWeight: 'bold',
  },
  miniText: {
    color: 'white',
    fontSize: 15,
  },
  textWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  textBox: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'white',
    width: 70,
    height: 70,
    borderRadius: 50,
    marginVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exit: {
    position: 'absolute',
    top: -45,
    right: -10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '70%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    borderRadius: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default OnStory;

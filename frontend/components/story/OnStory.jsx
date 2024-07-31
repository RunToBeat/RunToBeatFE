import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useDataTracking} from './useDataTracking';
import {useNavigation} from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const OnStory = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const {
    steps,
    distance,
    calories,
    pace,
    averagePace,
    elapsedTime,
    loading,
    error,
    isPaused,
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
      <View style={styles.content}>
        <View style={styles.textBox}>
          <Text style={styles.text}>{distance.toFixed(2)}</Text>
          <Text style={styles.miniText}>km</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>
            00:0{Math.floor(elapsedTime / 60)}:
            {String(elapsedTime % 60).padStart(2, '0')}
          </Text>
          <Text style={styles.miniText}>시간</Text>
        </View>
        <View style={styles.textWrap}>
          <View style={styles.textBox}>
            <Text style={styles.text}>{formatPace(averagePace)}</Text>
            <Text style={styles.miniText}>평균 페이스</Text>
          </View>
          <View style={styles.textBox}>
            <Text style={styles.text}>{steps}</Text>
            <Text style={styles.miniText}>걸음 수</Text>
          </View>
        </View>
        <TouchableOpacity onPress={togglePause} style={styles.button}>
          <FontAwesomeIcon
            name={isPaused ? 'play' : 'pause'}
            size={35}
            color={'black'}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.exit}>
          <FontAwesomeIcon
            name={'sign-out'}
            size={35}
            color={'white'}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}>
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>스토리를 나가시겠습니까?</Text>
              <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>종료하기</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
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

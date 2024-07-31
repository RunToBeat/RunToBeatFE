import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {defaultScreen} from '../../styles/layout';
import {useNavigation} from '@react-navigation/native';

// id 통해서 스토리 식별 후 api로 데이터 받아오기
function StoryRanking() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Home'); // 'Details'는 이동할 화면의 이름입니다.
  };

  return (
    <View style={defaultScreen.screen}>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.btnText}>확인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingTop: '40%',
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
  },
});
export default StoryRanking;

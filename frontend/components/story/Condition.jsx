import React, {useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
  Text,
  Dimensions,
} from 'react-native';
import {defaultScreen} from '../../styles/layout';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

function Condition() {
  const navigation = useNavigation();
  const route = useRoute();
  const {situation} = route.params; // 전달된 id를 받음

  const handlePress = (situation, condition) => {
    navigation.navigate('OnStory', {situation, condition}); // 'Situation'으로 이동
  };

  const goBack = () => {
    navigation.navigate('Situation'); // 'StoryHome' 페이지로 네비게이트
  };

  const goBack = () => {
    navigation.navigate('Situation'); // 'StoryHome' 페이지로 네비게이트
  };

  return (
    <View style={styles.bigContainer}>
      <TouchableOpacity onPress={goBack} style={styles.goBack}>
        <IonIcon name={'chevron-back'} size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.container}>
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.textBig}>30분 코스</Text>
            <Text style={styles.textSmall}>오늘의 컨디션을 선택해 주세요</Text>
          </View>
          <View style={styles.situationBox}>
            <TouchableOpacity
              onPress={() => handlePress(situation, 1)}
              style={styles.situation}>
              <Image
                source={require('../../image/condition1.png')}
                style={styles.image}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress(situation, 2)}
              style={styles.situation}>
              <Image
                source={require('../../image/condition2.png')}
                style={styles.image}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress(situation, 3)}
              style={styles.situation}>
              <Image
                source={require('../../image/condition3.png')}
                style={styles.image}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress(situation, 4)}
              style={styles.situation}>
              <Image
                source={require('../../image/condition4.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    paddingHorizontal: '7%',
    backgroundColor: 'white',
  },
  bigContainer: {
    flex: 1,
    paddingHorizontal: '7%',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textContainer: {
    alignItems: 'flex-start',
    marginBottom: 45,
    // backgroundColor: 'red',
  },
  textBig: {
    color: 'black',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 7,
  },
  textSmall: {
    color: 'black',
    fontSize: 13,
    fontWeight: '300',
  },
  textContainer: {
    alignItems: 'flex-start',
    marginBottom: 45,
    // backgroundColor: 'red',
  },
  textBig: {
    color: 'black',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 7,
  },
  textSmall: {
    color: 'black',
    fontSize: 13,
    fontWeight: '300',
  },
  situationBox: {
    flexDirection: 'row',
    flexWrap: 'wrap', // 2x2 그리드로 배치
    justifyContent: 'center', // 아이템 사이 간격 조정
    width: width * 0.82,
  },
  situation: {
    width: '48%', // 각 이미지의 너비 (전체의 절반 - 간격을 위한 여유)
    aspectRatio: 1, // 정사각형 비율 유지
    marginBottom: 8, // 아래쪽 간격
    marginRight: '2%', // 항목 간의 가로 간격
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // 이미지 비율 유지
  },
});

export default Condition;

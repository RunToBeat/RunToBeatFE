import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window'); // 화면 너비 가져오기

function StoryHome() {
  const navigation = useNavigation();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handlePress = () => {
    navigation.navigate('Situation');
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const goBack = () => {
    navigation.navigate('Home'); // 'Home' 페이지로 네비게이트
  };

  return (
    <View style={styles.container}>
      <View style={styles.storyTitleBar}>
        <TouchableOpacity onPress={goBack}>
          <IonIcon name={'chevron-back'} size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.storyTitle}>대한민국 임시정부 설립</Text>
        <TouchableOpacity onPress={toggleBookmark}>
          <FontAwesomeIcon
            name={isBookmarked ? 'bookmark' : 'bookmark-o'} // FontAwesome에서는 'bookmark'과 'bookmark-o'를 구분하여 사용
            size={30}
            color={isBookmarked ? 'white' : '#fff'}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handlePress}>
        <Image
          style={styles.mainImage}
          source={require('../../image/Episode1.png')}
        />
      </TouchableOpacity>
      <View style={styles.episodeTextContainer}>
        <Text style={styles.episodeText1}>
          현재 진행중인 에피소드: 1화.K에게 가다
        </Text>
        <Text style={styles.episodeText2}>
          나라의 미래가 달려있는 중요한 문서를 K라는 사람에게 전달해달라는
          부탁을 받았다. 그런데 K가 누구지?
        </Text>
      </View>
      <View style={styles.line} />
      <View style={styles.episodeListContainer}>
        <View style={styles.episodeContainer}>
          <Image
            style={styles.episodeImage}
            source={require('../../image/Episode1.png')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  storyTitleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  storyTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '500',
  },
  mainImage: {
    width: width,
    height: width * 0.57,
    resizeMode: 'contain',
  },
  episodeTextContainer: {
    paddingLeft: '5%',
    paddingRight: '3%',
  },
  episodeText1: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
  },
  episodeText2: {
    color: 'white',
    fontSize: 11,
  },
  line: {
    height: 1, // 선의 두께
    backgroundColor: 'white',
    marginTop: 10, // 텍스트와 선 사이의 간격
    width: '100%', // 선의 길이
  },
  episodeContainer: {
    paddingHorizontal: '5%',
  },
  episodeImage: {
    width: width * 0.15,
    height: width * 0.15,
  },
});

export default StoryHome;

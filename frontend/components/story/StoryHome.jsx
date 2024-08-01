<<<<<<< HEAD
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window'); // 화면 너비 가져오기

function StoryHome() {
  const navigation = useNavigation();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentEpisodeId, setCurrentEpisodeId] = useState(1); // 현재 에피소드 상태 추가

  const handlePress = episodeId => {
    if (episodeId === 1) {
      navigation.navigate('Situation');
    } else if (episodeId === 2) {
      Alert.alert('Coming soon', '이 스토리는 준비 중입니다.');
    } else {
      Alert.alert('', '이전 에피소드를 완료해야 달릴 수 있습니다.');
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const goBack = () => {
    navigation.navigate('Home'); // 'Home' 페이지로 네비게이트
  };
  const episodes = [
    {
      id: 1,
      title: '1화. K에게 가다',
      description:
        '나라의 미래가 달려있는 중요한 문서를 K라는 사람에게 전달해달라는 부탁을 받았다. 그런데 K가 누구지?',
      image: require('../../image/episode1.png'),
      mainImage: require('../../image/BigEpisode1.png'), // 에피소드 별 mainImage 추가
      showOverlay: false,
    },
    {
      id: 2,
      title: '2화. 상해에서',
      description:
        '1919년 4월 11일 상해에서 대한민국 임시정부 수립되고 이승만 초대 대통령 취임했습니다.',
      image: require('../../image/episode2.png'),
      mainImage: require('../../image/episode2.png'), // 에피소드 별 mainImage 추가
      showOverlay: false,
    },
    {
      id: 3,
      title: '3화. 임시정부의 활동',
      description:
        '독립운동 지도와 외교 활동을 전개하며 국내외에서 독립운동 지원 및 연대 활동합니다.',
      image: require('../../image/episode3.png'),
      mainImage: require('../../image/episode2.png'), // 에피소드 별 mainImage 추가
      showOverlay: true,
    },
    {
      id: 4,
      title: '4화. 중국으로',
      description:
        '대한민국의 독립운동가이자 언론인으로, 3.1 운동 당시 독립 선언문을 작성하고 선포한 인물로 잘 알려져 있습니다.',
      image: require('../../image/episode4.png'),
      mainImage: require('../../image/episode2.png'), // 에피소드 별 mainImage 추가
      showOverlay: true,
    },
    {
      id: 5,
      title: '5화. 광복',
      description:
        "'지금 나에겐 만세운동을 지도하는 것보다는 어서 망명해 독립운동을 계획하는 것이 더 중요하다.'",
      image: require('../../image/episode5.png'),
      mainImage: require('../../image/episode2.png'), // 에피소드 별 mainImage 추가
      showOverlay: true,
    },
  ];

  // 현재 에피소드에 해당하는 이미지 가져오기
  const currentEpisode = episodes.find(
    episode => episode.id === currentEpisodeId,
  );

  // Array of episodes with overlays and mainImage
  const episodes = [
    {
      id: 1,
      title: '1화. K에게 가다',
      description:
        '나라의 미래가 달려있는 중요한 문서를 K라는 사람에게 전달해달라는 부탁을 받았다. 그런데 K가 누구지?',
      image: require('../../image/episode1.png'),
      mainImage: require('../../image/BigEpisode1.png'), // 에피소드 별 mainImage 추가
      showOverlay: false,
    },
    {
      id: 2,
      title: '2화. 상해에서',
      description:
        '1919년 4월 11일 상해에서 대한민국 임시정부 수립되고 이승만 초대 대통령 취임했습니다.',
      image: require('../../image/episode2.png'),
      mainImage: require('../../image/episode2.png'), // 에피소드 별 mainImage 추가
      showOverlay: false,
    },
    {
      id: 3,
      title: '3화. 임시정부의 활동',
      description:
        '독립운동 지도와 외교 활동을 전개하며 국내외에서 독립운동 지원 및 연대 활동합니다.',
      image: require('../../image/episode3.png'),
      mainImage: require('../../image/episode2.png'), // 에피소드 별 mainImage 추가
      showOverlay: true,
    },
    {
      id: 4,
      title: '4화. 중국으로',
      description:
        '대한민국의 독립운동가이자 언론인으로, 3.1 운동 당시 독립 선언문을 작성하고 선포한 인물로 잘 알려져 있습니다.',
      image: require('../../image/episode4.png'),
      mainImage: require('../../image/episode2.png'), // 에피소드 별 mainImage 추가
      showOverlay: true,
    },
    {
      id: 5,
      title: '5화. 광복',
      description:
        "'지금 나에겐 만세운동을 지도하는 것보다는 어서 망명해 독립운동을 계획하는 것이 더 중요하다.'",
      image: require('../../image/episode5.png'),
      mainImage: require('../../image/episode2.png'), // 에피소드 별 mainImage 추가
      showOverlay: true,
    },
  ];

  // 현재 에피소드에 해당하는 이미지 가져오기
  const currentEpisode = episodes.find(
    episode => episode.id === currentEpisodeId,
  );

  return (
    <ScrollView style={styles.container}>
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
      <TouchableOpacity onPress={() => handlePress(currentEpisodeId)}>
        <Image
          style={styles.mainImage}
          source={currentEpisode?.mainImage} // 현재 에피소드의 mainImage 표시
        />
      </TouchableOpacity>
      <View style={styles.episodeTextContainer}>
        <Text style={styles.episodeText1}>
          현재 진행중인 에피소드: {currentEpisode?.title}
        </Text>
        <Text style={styles.episodeText2}>{currentEpisode?.description}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.episodeListContainer}>
        {episodes.map(episode => (
          <TouchableOpacity
            key={episode.id}
            onPress={() => handlePress(episode.id)}>
            <View style={styles.episodeBackground}>
              {episode.showOverlay && <View style={styles.overlay} />}
              <View style={styles.episodeContainer}>
                <Image style={styles.episodeImage} source={episode.image} />
                <View style={styles.expContainer}>
                  <Text style={styles.episodeTitle}>{episode.title}</Text>
                  <Text style={styles.episodeExp}>{episode.description}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
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
    paddingVertical: 11,
  },
  storyTitle: {
    color: 'white',
    fontSize: 21,
    fontWeight: '500',
    paddingBottom: 5,
  },
  mainImage: {
    width: width,
    height: width * 0.6,
    resizeMode: 'contain',
  },
  episodeTextContainer: {
    paddingLeft: '4%',
    paddingRight: '3%',
  },
  episodeText1: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 9,
    marginBottom: 5,
  },
  episodeText2: {
    color: 'white',
    fontSize: 12,
    fontWeight: '200',
  },
  line: {
    height: 1, // 선의 두께
    backgroundColor: 'white',
    marginTop: 10, // 텍스트와 선 사이의 간격
    width: '100%', // 선의 길이
  },
  episodeListContainer: {
    paddingHorizontal: '3%',
    justifyContent: 'center',
    marginTop: 12,
  },
  episodeBackground: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    margin: 6,
    position: 'relative', // 블러와 유사한 효과를 위해 position 설정
    overflow: 'hidden', // 자식 요소가 부모를 넘어가지 않도록 설정
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // 부모 뷰를 완전히 덮도록 설정
    backgroundColor: 'rgba(170, 170, 170, 0.9)', // 반투명 배경
    zIndex: 10,
  },
  episodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    position: 'relative', // overlay와 같이 사용하기 위해
    zIndex: 1, // overlay 위에 배치
  },
  episodeImage: {
    width: width * 0.15,
    height: width * 0.15,
    resizeMode: 'contain',
  },
  expContainer: {
    padding: 5,
    paddingLeft: 10,
    maxWidth: width * 0.73,
  },
  episodeTitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  episodeExp: {
    color: 'black',
    fontSize: 11,
  },
});

export default StoryHome;
=======
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
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

  // Array of episodes with overlays
  const episodes = [
    {
      id: 1,
      title: '1화. K에게 가다',
      description:
        '나라의 미래가 달려있는 중요한 문서를 K라는 사람에게 전달해달라는 부탁을 받았다. 그런데 K가 누구지?',
      image: require('../../image/episode1.png'),
      showOverlay: false,
    },
    {
      id: 2,
      title: '2화. 상해에서',
      description:
        '1919년 4월 11일 상해에서 대한민국 임시정부 수립되고 이승만 초대 대통령 취임했습니다.',
      image: require('../../image/episode2.png'),
      showOverlay: false,
    },
    {
      id: 3,
      title: '3화. 임시정부의 활동',
      description:
        '독립운동 지도와 외교 활동을 전개하며 국내외에서 독립운동 지원 및 연대 활동합니다.',
      image: require('../../image/episode3.png'),
      showOverlay: true,
    },
    {
      id: 4,
      title: '4화. 중국으로',
      description:
        '대한민국의 독립운동가이자 언론인으로, 3.1 운동 당시 독립 선언문을 작성하고 선포한 인물로 잘 알려져 있습니다.',
      image: require('../../image/episode4.png'),
      showOverlay: true,
    },
    {
      id: 5,
      title: '5화. 광복',
      description:
        "'지금 나에겐 만세운동을 지도하는 것보다는 어서 망명해 독립운동을 계획하는 것이 더 중요하다.'",
      image: require('../../image/episode5.png'),
      showOverlay: true,
    },
  ];

  return (
    <ScrollView style={styles.container}>
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
          source={require('../../image/BigEpisode1.png')}
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
        {episodes.map(episode => (
          <View key={episode.id} style={styles.episodeBackground}>
            {episode.showOverlay && <View style={styles.overlay} />}
            <View style={styles.episodeContainer}>
              <Image style={styles.episodeImage} source={episode.image} />
              <View style={styles.expContainer}>
                <Text style={styles.episodeTitle}>{episode.title}</Text>
                <Text style={styles.episodeExp}>{episode.description}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
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
    paddingVertical: 11,
  },
  storyTitle: {
    color: 'white',
    fontSize: 21,
    fontWeight: '500',
    paddingBottom: 5,
  },
  mainImage: {
    width: width,
    height: width * 0.6,
    resizeMode: 'contain',
  },
  episodeTextContainer: {
    paddingLeft: '4%',
    paddingRight: '3%',
  },
  episodeText1: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 9,
    marginBottom: 5,
  },
  episodeText2: {
    color: 'white',
    fontSize: 12,
    fontWeight: '200',
  },
  line: {
    height: 1, // 선의 두께
    backgroundColor: 'white',
    marginTop: 10, // 텍스트와 선 사이의 간격
    width: '100%', // 선의 길이
  },
  episodeListContainer: {
    paddingHorizontal: '3%',
    justifyContent: 'center',
    marginTop: 12,
  },
  episodeBackground: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    margin: 6,
    position: 'relative', // 블러와 유사한 효과를 위해 position 설정
    overflow: 'hidden', // 자식 요소가 부모를 넘어가지 않도록 설정
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // 부모 뷰를 완전히 덮도록 설정
    backgroundColor: 'rgba(170, 170, 170, 0.9)', // 반투명 배경
    zIndex: 10,
  },
  episodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    position: 'relative', // overlay와 같이 사용하기 위해
    zIndex: 1, // overlay 위에 배치
  },
  episodeImage: {
    width: width * 0.15,
    height: width * 0.15,
    resizeMode: 'contain',
  },
  expContainer: {
    padding: 5,
    paddingLeft: 10,
    maxWidth: width * 0.73,
  },
  episodeTitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  episodeExp: {
    color: 'black',
    fontSize: 11,
  },
});

export default StoryHome;
>>>>>>> 8f3578c30a40957eade7e2c435cfb0249c626775

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const {width} = Dimensions.get('window');

const images = {
  storyIndependence: require('../../image/storyIndependence.png'),
  storyImage1: require('../../image/storyImage1.png'),
  storyImage2: require('../../image/storyImage2.png'),
  storyImage3: require('../../image/storyImage3.png'),
  storyImage4: require('../../image/storyImage4.png'),
  myPagePremium: require('../../image/myPagePremium.png'),
  myPageHistory: require('../../image/myPageHistory.png'),
  myPageProfile: require('../../image/myPageProfile.png'),
};

const topCategories = ['진행 중', '진행 완료', '찜'];

const stories = [
  {
    category: '진행 중',
    src: images.storyIndependence,
    key: 'storyIndependence',
  },
  {category: '진행 완료', src: images.storyImage1, key: 'storyImage1'},
  {category: '진행 완료', src: images.storyImage2, key: 'storyImage2'},
  {category: '진행 완료', src: images.storyImage3, key: 'storyImage3'},
  {category: '진행 완료', src: images.storyImage4, key: 'storyImage4'},
  {category: '찜', src: images.storyIndependence, key: 'storyIndependence'},
];

function MyPage() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(topCategories[0]);
  const [myAvgPace, setMyAvgPace] = useState(null);
  const [totalDistance, setTotalDistance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://192.168.107.9:8080/record/mypage/total-running-info/1')
      .then(response => {
        console.log('Data fetched:', response.data); // 데이터 출력
        setMyAvgPace(response.data.myAvgPace);
        setTotalDistance(response.data.totalDistance);
        setLoading(false); // 데이터 로드 완료
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false); // 에러 발생 시 로딩 종료
      });
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => setSelectedCategory(item)}>
      <Text
        style={[styles.itemText, item === selectedCategory && styles.black]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const handlePress = key => {
    if (key === 'storyIndependence') {
      navigation.navigate('StoryHome');
    } else {
      Alert.alert('Coming soon', '해당 스토리는 현재 준비중입니다.');
    }
  };

  const filteredStories = stories.filter(
    story => story.category === selectedCategory,
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image style={styles.profileImage} source={images.myPageProfile} />
        <View>
          <Text style={styles.profileName}>춘식이 누나</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <>
              <Text>
                누적 거리:{' '}
                {totalDistance !== null ? totalDistance.toFixed(2) : '0.00'} km
              </Text>
              <Text>
                평균 페이스:{' '}
                {myAvgPace !== null ? myAvgPace.toFixed(2) : '0.00'} m/km
              </Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.historyContainer}>
        <Image style={styles.history} source={images.myPageHistory} />
        <Text style={styles.historyFont}>
          <Text style={styles.bold}>춘식이 누나</Text>님은 현재
          <Text style={styles.bold}> 일제강점기(1919년)</Text>에 있습니다.
        </Text>
      </View>
      <View style={styles.storyContainer}>
        <FlatList
          data={topCategories}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filteredStories.map((story, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePress(story.key)}>
              <Image style={styles.image} source={story.src} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.premiumImageContainer}>
        <Image style={styles.premiumImage} source={images.myPagePremium} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    paddingHorizontal: '7%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginLeft: 15,
  },
  profileImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    resizeMode: 'cover',
    marginRight: 15,
  },
  profileName: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
  },
  historyContainer: {
    paddingHorizontal: '7%',
    alignItems: 'center',
    marginBottom: 30,
  },
  history: {
    width: width * 0.9,
    height: width * 0.14,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  historyFont: {
    color: 'black',
    fontSize: 13,
    textAlign: 'center',
  },
  itemContainer: {
    marginRight: 15,
  },
  itemText: {
    fontSize: 15,
    color: 'black',
  },
  black: {
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  storyContainer: {
    paddingLeft: '7%',
  },
  image: {
    width: width * 0.3,
    height: width * 0.5,
    marginRight: 12,
    marginTop: 13,
    marginBottom: 20,
    borderRadius: 3,
  },
  premiumImageContainer: {
    paddingHorizontal: '7%',
    marginBottom: 20,
  },
  premiumImage: {
    width: width * 0.87,
    height: width * 0.4,
  },
});

export default MyPage;

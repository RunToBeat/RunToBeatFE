import React, {useState} from 'react';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window'); // 화면 너비 가져오기

const topCategories = [
  {name: '홈', screen: 'HomeScreen'},
  {name: '선사시대', screen: 'PrehistoricScreen'},
  {name: '삼국시대', screen: 'ThreeKingdomsScreen'},
  {name: '고려시대', screen: 'GoryeoScreen'},
  {name: '조선시대', screen: 'JoseonScreen'},
  {name: '일제강점기', screen: 'ColonialScreen'},
  {name: '근현대사', screen: 'ModernHistoryScreen'},
];

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('홈'); // 기본값 '홈'
  const navigation = useNavigation();

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        setSelectedCategory(item.name);
        if (item.name !== '홈') {
          navigation.navigate(item.screen);
        }
      }}>
      <Text
        style={[
          styles.itemText,
          selectedCategory === item.name && styles.black,
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const handleStoryPress = storyName => {
    if (storyName === 'storyIndependence') {
      navigation.navigate('StoryHome');
    } else {
      Alert.alert('Coming soon', '이 스토리는 준비 중입니다.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <FlatList
        data={topCategories}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        horizontal // 가로 방향 스크롤
        showsHorizontalScrollIndicator={false} // 가로 스크롤 인디케이터 숨기기
        contentContainerStyle={styles.listContent}
      />
      {selectedCategory === '홈' && (
        <>
          <Text style={styles.storySelectText}>진행 중인 스토리</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storyLists}>
            <TouchableOpacity
              onPress={() => handleStoryPress('storyIndependence')}>
              <Image
                style={styles.image}
                source={require('../../image/storyIndependence.png')}
              />
            </TouchableOpacity>
          </ScrollView>
          <Text style={styles.storySelectText}>
            전장의 한복판에서 (Coming soon)
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storyLists}>
            <TouchableOpacity onPress={() => handleStoryPress('storyImage2')}>
              <Image
                style={styles.image}
                source={require('../../image/storyImage2.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleStoryPress('storyImage6')}>
              <Image
                style={styles.image}
                source={require('../../image/storyImage6.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleStoryPress('storyImage5')}>
              <Image
                style={styles.image}
                source={require('../../image/storyImage5.png')}
              />
            </TouchableOpacity>
          </ScrollView>
          <Text style={styles.storySelectText}>
            살고 싶다면 일단 뛰어! (Coming soon)
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storyLists}>
            <TouchableOpacity onPress={() => handleStoryPress('storyImage3')}>
              <Image
                style={styles.image}
                source={require('../../image/storyImage3.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleStoryPress('storyImage4')}>
              <Image
                style={styles.image}
                source={require('../../image/storyImage4.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleStoryPress('storyImage1')}>
              <Image
                style={styles.image}
                source={require('../../image/storyImage1.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleStoryPress('storyImage7')}>
              <Image
                style={styles.image}
                source={require('../../image/storyImage7.png')}
              />
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
      {selectedCategory === '선사시대' && (
        <>
          <Text style={styles.topCategoriesText}>
            문명의 뿌리를 찾아서, 선사시대의 놀라운 이야기로 떠나보세요.
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storyLists}>
            <TouchableOpacity onPress={() => handleStoryPress('storyImage3')}>
              <Image
                style={styles.image}
                source={require('../../image/storyImage3.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleStoryPress('storyImage4')}>
              <Image
                style={styles.image}
                source={require('../../image/storyImage4.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleStoryPress('storyImage1')}>
              <Image
                style={styles.image}
                source={require('../../image/storyImage1.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleStoryPress('storyImage7')}>
              <Image
                style={styles.image}
                source={require('../../image/storyImage7.png')}
              />
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    paddingLeft: '7%',
    backgroundColor: 'white',
  },
  storySelectText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 15,
  },
  image: {
    width: width * 0.3,
    height: width * 0.5,
    marginRight: 7,
    marginRight: 7,
    marginTop: 13,
    marginBottom: 20,
    borderRadius: 3,
    borderRadius: 3,
  },
  listContent: {
    flexGrow: 1,
  },
  itemContainer: {
    marginRight: 15, // 항목 간의 가로 간격
    paddingVertical: 20,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    color: '#959595',
  },
  black: {
    color: 'black',
    fontWeight: 'bold',
  },
  storyLists: {alignItems: 'center'},
  topCategoriesText: {
    fontSize: 21,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 73,
  },
});

export default Home;

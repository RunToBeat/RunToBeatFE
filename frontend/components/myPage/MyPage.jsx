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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window'); // 화면 너비 가져오기

const topCategories = ['진행 중', '진행 완료', '찜'];

const stories = [
  {category: '진행 중', src: require('../../image/RunToBeat_logo.png')},
  {category: '진행 완료', src: require('../../image/RunToBeat_logo.png')},
  {category: '진행 완료', src: require('../../image/RunToBeat_logo.png')},
  {category: '찜', src: require('../../image/RunToBeat_logo.png')},
  {category: '찜', src: require('../../image/RunToBeat_logo.png')},
  {category: '찜', src: require('../../image/RunToBeat_logo.png')},
  {category: '찜', src: require('../../image/RunToBeat_logo.png')},
];

function MyPage() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(topCategories[0]);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => setSelectedCategory(item)}>
      <Text
        style={[styles.itemText, item === selectedCategory && styles.black]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const handlePress = () => {
    navigation.navigate('StoryHome');
  };

  // 선택된 카테고리에 맞는 스토리들 필터링
  const filteredStories = stories.filter(
    story => story.category === selectedCategory,
  );

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <Image
          style={styles.image}
          source={require('../../image/RunToBeat_logo.png')}
        />
        <View>
          <Text>춘식이 누나</Text>
          <Text>누적 거리</Text>
          <Text>평균 페이스</Text>
        </View>
      </View>
      <FlatList
        data={topCategories}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filteredStories.map((story, index) => (
          <TouchableOpacity key={index} onPress={handlePress}>
            <Image style={styles.image} source={story.src} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Image
        style={styles.image}
        source={require('../../image/RunToBeat_logo.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    paddingLeft: '7%',
  },
  itemContainer: {
    marginRight: 15,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  black: {
    fontWeight: 'bold',
  },
  image: {
    width: width * 0.3,
    height: width * 0.4,
    resizeMode: 'contain',
    marginHorizontal: 5,
    backgroundColor: 'yellow',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MyPage;

import React from 'react';
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
import {scrollScreen} from '../../styles/layout';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window'); // 화면 너비 가져오기

const topCategories = [
  '홈',
  '선사시대',
  '삼국시대',
  '고려시대',
  '조선시대',
  '일제강점기',
  '근현대사',
];

function Home() {
  const navigation = useNavigation();

  const renderItem = ({item, index}) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={[styles.itemText, index === 0 && styles.black]}>{item}</Text>
    </TouchableOpacity>
  );

  const handlePress = () => {
    navigation.navigate('StoryHome');
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <FlatList
        data={topCategories}
        renderItem={renderItem}
        keyExtractor={item => item}
        horizontal // 가로 방향 스크롤
        showsHorizontalScrollIndicator={false} // 가로 스크롤 인디케이터 숨기기
        contentContainerStyle={styles.listContent}
      />
      <Text>진행 중인 스토리</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storyLists}>
        <TouchableOpacity onPress={handlePress}>
          <Image
            style={styles.image}
            source={require('../../image/RunToBeat_logo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={require('../../image/RunToBeat_logo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={require('../../image/RunToBeat_logo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={require('../../image/RunToBeat_logo.png')}
          />
        </TouchableOpacity>
      </ScrollView>
      <Text>살고 싶다면 일단 뛰어!</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storyLists}>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={require('../../image/RunToBeat_logo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={require('../../image/RunToBeat_logo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={require('../../image/RunToBeat_logo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={require('../../image/RunToBeat_logo.png')}
          />
        </TouchableOpacity>
      </ScrollView>
      <Text>전장의 한복판에서</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storyLists}>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={require('../../image/RunToBeat_logo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={require('../../image/RunToBeat_logo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={require('../../image/RunToBeat_logo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={require('../../image/RunToBeat_logo.png')}
          />
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    paddingLeft: '7%',
  },
  image: {
    width: width * 0.3, // 화면 너비의 30%
    height: width * 0.6, // 화면 너비의 60%
    resizeMode: 'contain', // 이미지 비율 유지
    marginHorizontal: 5, // 이미지 사이의 간격
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
});

export default Home;

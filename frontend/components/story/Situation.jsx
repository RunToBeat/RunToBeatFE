import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {defaultScreen} from '../../styles/layout';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

function Situation() {
  const navigation = useNavigation();

  const handlePress = situation => {
    navigation.navigate('Condition', {situation});
  };

  return (
    <View style={defaultScreen.screen}>
      <Text>hello Situation</Text>
      <TouchableOpacity
        onPress={() => handlePress('car')}
        style={styles.situation}>
        <Image
          source={require('../../image/RunToBeat_logo.png')}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress('safe')}
        style={styles.situation}>
        <Image
          source={require('../../image/RunToBeat_logo.png')}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  situationBox: {
    flexDirection: 'row',
    flexWrap: 'wrap', // 2x2 그리드로 배치
    justifyContent: 'space-between', // 아이템 사이 간격 조정
    width: width * 0.8,
  },
  situation: {
    width: '48%', // 각 이미지의 너비 (전체의 절반 - 간격을 위한 여유)
    aspectRatio: 1, // 정사각형 비율 유지
    marginBottom: 10, // 아래쪽 간격
    marginRight: '2%', // 항목 간의 가로 간격
  },
  inside: {
    width: '100%', // 각 이미지의 너비 (전체의 절반 - 간격을 위한 여유)
    aspectRatio: 1, // 정사각형 비율 유지
    backgroundColor: 'yellow', // 확인용 배경색
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // 이미지 비율 유지
  },
});

export default Situation;

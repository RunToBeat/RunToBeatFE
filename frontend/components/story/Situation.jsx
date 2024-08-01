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
import IonIcon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

function Situation() {
  const navigation = useNavigation();

  const handlePress = situation => {
    navigation.navigate('Condition', {situation});
  };

  const goBack = () => {
    navigation.navigate('StoryHome'); // 'StoryHome' 페이지로 네비게이트
  };

  return (
    <View style={styles.bigContainer}>
      <View style={styles.backKey}>
        <TouchableOpacity onPress={goBack} style={styles.goBack}>
          <IonIcon name={'chevron-back'} size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.textBig}>상황 선택</Text>
            <Text style={styles.textSmall}>주변 환경을 고려해 드려요</Text>
          </View>
          <View style={styles.selectContainer1}>
            <View style={styles.selectContainer2}>
              <TouchableOpacity
                onPress={() => handlePress('car')}
                style={styles.situation}>
                <Image
                  source={require('../../image/situation1.png')}
                  style={styles.image1}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePress('safe')}
                style={styles.situation}>
                <Image
                  source={require('../../image/situation2.png')}
                  style={styles.image1}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => handlePress('safe')}
              style={styles.situation}>
              <Image
                source={require('../../image/situation3.png')}
                style={styles.image2}
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
  backKey: {
    marginTop: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  goBack: {
    color: 'black',
  },
  textContainer: {
    alignItems: 'flex-start',
    marginBottom: 45,
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
  selectContainer1: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  situation: {
    marginRight: '0.5%',
  },
  image1: {
    width: width * 0.4, // 부모 요소의 너비에 맞추기
    height: width * 0.45,
    resizeMode: 'contain',
    // aspectRatio: 1.4, // 비율을 1.4로 설정, 필요에 따라 조정
  },
  image2: {
    width: width * 0.8,
    height: width * 0.35,
    resizeMode: 'contain',
  },
});

export default Situation;

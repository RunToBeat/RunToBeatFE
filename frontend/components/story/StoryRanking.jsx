import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BarChart} from 'react-native-chart-kit';

// id 통해서 스토리 식별 후 api로 데이터 받아오기
function StoryRanking() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Home'); // 'Details'는 이동할 화면의 이름입니다.
  };

  const {width} = Dimensions.get('window'); // 화면 너비 가져오기

  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(34, 107, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1.2, // 바 두께를 두껍게 설정
    useShadowColorFromDataset: false, // optional
  };

  const data = {
    labels: ['나', '평균'],
    datasets: [
      {
        data: [10.5, 6.3],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          오늘 뛴 사람 중에{'\n'}
          <Text style={styles.textBlue}>13등</Text>으로 빨랐어요!
        </Text>
        <Text style={styles.miniText}>총 120명 중</Text>
      </View>
      <View style={styles.chartContainer}></View>
      <BarChart
        data={data}
        width={300}
        height={220}
        yAxisLabel="$"
        withInnerLines={false}
        withHorizontalLabels={false}
        fromZero={true}
        chartConfig={chartConfig}
      />
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.btnText}>확인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: '40%',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 9,
  },
  textBlue: {
    color: '#226BFF',
  },
  miniText: {
    color: 'grey',
    fontSize: 15,
  },
  chartContainer: {
    marginVertical: 40,
  },
  button: {
    backgroundColor: '#226BFF',
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 100,
    marginBottom: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StoryRanking;

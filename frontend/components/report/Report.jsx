import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const {width} = Dimensions.get('window');
const screenWidth = Dimensions.get('window').width * 1.17;

const topCategories = ['일간', '주간', '월간'];

function Report() {
  const [selectedCategory, setSelectedCategory] = useState(topCategories[0]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        item === selectedCategory ? styles.selectedItem : {},
      ]}
      onPress={() => setSelectedCategory(item)}>
      <Text
        style={[
          styles.itemText,
          item === selectedCategory
            ? styles.selectedCategoryStyle
            : styles.unSelectedCategoryStyle,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const getHeaderText = () => {
    switch (selectedCategory) {
      case '일간':
        return ' 오늘 하루 다른 사람들보다\n 5km 더 뛰었어요';
      case '주간':
        return ' 이번 주 다른 사람들보다\n 00km 더 뛰었어요';
      case '월간':
        return ' 이번 달 다른 사람들보다\n 00km 덜 뛰었어요';
      default:
        return '';
    }
  };

  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 1,
    strokeWidth: 4,
    barPercentage: 0.3,
    useShadowColorFromDataset: true,
    color: (opacity = 1, index) => {
      return index < 30
        ? `rgba(255, 0, 0, ${opacity})`
        : `rgba(34, 107, 255, ${opacity})`;
    },
    yAxisMin: 0,
    yAxisMax: 100,
    yAxisInterval: 5,
  };

  const lineChartData1 = {
    datasets: [{data: [0, 0, 0, 80, 99, 43, 60]}],
  };

  const lineChartData2 = {
    labels: ['7.10', '7.11', '7.12', '7.13', '7.14', '7.15', '오늘'],
    datasets: [{data: [0, 0, 0, 10, 30, 20, 25]}],
  };

  const lineChartData3 = {
    datasets: [{data: [20, 45, 28, 80, 99, 43, 60]}],
  };

  const lineChartData4 = {
    labels: [
      '6주 전',
      '5주 전',
      '4주 전',
      '3주 전',
      '2주 전',
      '1주 전',
      '이번 주',
    ],
    datasets: [{data: [30, 20, 25, 10, 10, 10, 10]}],
  };

  const lineChartData5 = {
    datasets: [{data: [80, 99, 43, 60, 20, 45, 28]}],
  };

  const lineChartData6 = {
    labels: ['24.01', '24.02', '24.03', '24.04', '24.05', '24.06', '이번 달'],
    datasets: [{data: [10, 10, 10, 30, 30, 20, 25]}],
  };

  let chartData1, chartData2;
  if (selectedCategory === '일간') {
    chartData1 = lineChartData1;
    chartData2 = lineChartData2;
  } else if (selectedCategory === '주간') {
    chartData1 = lineChartData3;
    chartData2 = lineChartData4;
  } else if (selectedCategory === '월간') {
    chartData1 = lineChartData5;
    chartData2 = lineChartData6;
  }

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={topCategories}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.flatListStyle}
        />
      </View>

      <Text style={styles.headerText}>{getHeaderText()}</Text>

      <View style={styles.chartContainer}>
        <Text style={styles.chartLabel}>{'달린 거리(km)'}</Text>

        <LineChart
          style={styles.chart}
          data={chartData1}
          width={screenWidth}
          height={150} // height 조정
          withInnerLines={false}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          fromZero={true}
          chartConfig={chartConfig}
          renderDotContent={({x, y, index}) => {
            const dataValue = chartData1.datasets[0].data[index];
            if (dataValue > 0) {
              return (
                <Text
                  style={{
                    position: 'absolute',
                    fontWeight: '800',
                    top: y - 27,
                    left: x - 8,
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    padding: 0,
                  }}>
                  {dataValue}
                </Text>
              );
            } else {
              return null;
            }
          }}
        />

        <Text style={styles.chartLabel}>{"페이스(00'00'')"}</Text>

        <LineChart
          style={styles.chart}
          data={chartData2}
          width={screenWidth}
          height={150} // height 조정
          withInnerLines={false}
          withHorizontalLabels={false}
          fromZero={true}
          chartConfig={chartConfig}
          yAxisInterval={0.5}
          renderDotContent={({x, y, index}) => {
            const dataValue = chartData2.datasets[0].data[index];
            if (dataValue > 0) {
              return (
                <Text
                  style={{
                    position: 'absolute',
                    fontWeight: '800',
                    top: y - 27,
                    left: x - 8,
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    padding: 0,
                  }}>
                  {dataValue}
                </Text>
              );
            } else {
              return null;
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: '7%',
  },
  flatListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#226BFF',
    paddingVertical: 5,
    borderRadius: 30,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  selectedCategoryStyle: {
    color: 'black',
    paddingHorizontal: 39,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  unSelectedCategoryStyle: {
    color: 'white',
    paddingHorizontal: 39,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10, // 차트 컨테이너의 패딩 조정
  },
  chart: {
    paddingTop: 20,
    paddingBottom: 23,
  },
  chartLabel: {
    fontSize: 12,
    color: 'black',
    marginBottom: 5,
  },
});

export default Report;

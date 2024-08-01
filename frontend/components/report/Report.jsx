import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import axios from 'axios';

const {width} = Dimensions.get('window');
const screenWidth = Dimensions.get('window').width * 1.17;

const topCategories = ['일간', '주간', '월간'];

function Report() {
  const [selectedCategory, setSelectedCategory] = useState(topCategories[0]);
  const [dailyData, setDailyData] = useState(null);
  const [dailyDistance, setDailyDistance] = useState([]);
  const [weeklyData, setWeeklyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dailyResponse, weeklyResponse, monthlyResponse] =
          await Promise.all([
            axios.get('http://192.168.107.9:8080/daily-record'),
            axios.get('http://192.168.107.9:8080/weekly-record'),
            axios.get('http://192.168.107.9:8080/monthly-record'),
          ]);

        console.log(dailyResponse.data);
        console.log(weeklyResponse.data);
        console.log(monthlyResponse.data);

        // dailyDistance를 계산하여 항상 7개의 데이터를 가지도록 합니다.
        const dailyDistances_ = dailyResponse.data
          .map(record => record.dailyTotalDistance)
          .slice(-7); // 최근 7개의 데이터만 가져옵니다.

        // 7개 미만일 경우 0으로 채웁니다.
        const paddedDistances = Array(7).fill(0);
        dailyDistances_.forEach((distance, index) => {
          paddedDistances[7 - dailyDistances_.length + index] = distance;
        });

        setDailyDistance(paddedDistances);
        setDailyData(dailyResponse.data);
        setWeeklyData(weeklyResponse.data);
        setMonthlyData(monthlyResponse.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        return ' 오늘 하루 2.8km 뛰었어요';
      case '주간':
        return ' 이번 주 12km 뛰었어요';
      case '월간':
        return ' 이번 달 12km 뛰었어요';
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

  const getChartData = (data, defaultData) => {
    if (!data) return defaultData;
    return {
      labels: data.labels || defaultData.labels,
      datasets: [
        {
          data: data.datasets
            ? data.datasets[0].data
            : defaultData.datasets[0].data,
        },
      ],
    };
  };

  const lineChartData1 = getChartData(dailyData, {
    labels: ['7.10', '7.11', '7.12', '7.13', '7.14', '7.15', '오늘'],
    // datasets: [{data: dailyDistance}],
    datasets: [{data: [0, 0, 0, 0, 2.6, 3.3, 2.8]}],
  });

  const lineChartData2 = getChartData(dailyData, {
    labels: ['7.10', '7.11', '7.12', '7.13', '7.14', '7.15', '오늘'],
    datasets: [{data: [0, 0, 0, 0, 4.8, 5.5, 5.2]}],
  });

  const lineChartData3 = getChartData(weeklyData, {
    labels: [
      '6주 전',
      '5주 전',
      '4주 전',
      '3주 전',
      '2주 전',
      '1주 전',
      '이번 주',
    ],
    datasets: [{data: [0, 0, 0, 0, 0, 0, 12]}],
  });

  const lineChartData4 = getChartData(weeklyData, {
    labels: [
      '6주 전',
      '5주 전',
      '4주 전',
      '3주 전',
      '2주 전',
      '1주 전',
      '이번 주',
    ],
    datasets: [{data: [0, 0, 0, 0, 0, 0, 5.5]}],
  });

  const lineChartData5 = getChartData(monthlyData, {
    labels: ['24.01', '24.02', '24.03', '24.04', '24.05', '24.06', '이번 달'],
    datasets: [{data: [0, 0, 0, 0, 0, 0, 12]}],
  });

  const lineChartData6 = getChartData(monthlyData, {
    labels: ['24.01', '24.02', '24.03', '24.04', '24.05', '24.06', '이번 달'],
    datasets: [{data: [0, 0, 0, 0, 0, 0, 5.3]}],
  });

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
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      ) : (
        <>
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
              height={150}
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
                      key={`dot-${index}`} // Unique key for each Text element
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
              height={150}
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
                      key={`dot-${index}`} // Unique key for each Text element
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
        </>
      )}
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
    paddingVertical: 10,
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
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Report;

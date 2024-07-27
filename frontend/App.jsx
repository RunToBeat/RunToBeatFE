import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

// 권한 요청 함수
const requestPermissions = async () => {
  try {
    const activityRecognition = await request(
      PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION,
    );
    const fineLocation = await request(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    if (activityRecognition !== RESULTS.GRANTED) {
      console.log('Activity recognition permission not granted');
    }
    if (fineLocation !== RESULTS.GRANTED) {
      console.log('Location permission not granted');
    }
  } catch (error) {
    console.error('Error requesting permissions', error);
  }
};

// 함수형 컴포넌트
const App = () => {
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const [pace, setPace] = useState(0);
  const [averagePace, setAveragePace] = useState(0); // 평균 페이스 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const previousMagnitude = useRef(0);
  const stepCount = useRef(0);
  const lastStepTime = useRef(Date.now());

  // 타이머 관련 ref
  const startTime = useRef(Date.now());
  const totalDistance = useRef(0);
  const totalTime = useRef(0);

  useEffect(() => {
    const initialize = async () => {
      await requestPermissions();
      startTracking();
    };

    initialize();
  }, []);

  const startTracking = () => {
    // 가속도계 데이터 수집
    setUpdateIntervalForType(SensorTypes.accelerometer, 200); // 0.4초마다 업데이트
    const subscription = accelerometer.subscribe(({x, y, z, timestamp}) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const accelerationChange = Math.abs(
        magnitude - previousMagnitude.current,
      );

      // 0.2보다 큰 변화와 1.5 이상의 가속도를 가진 데이터만 걸음으로 감지
      if (accelerationChange > 0.2 && magnitude > 1.5) {
        const currentTime = Date.now();
        // 걸음 감지 간격 조정
        if (currentTime - lastStepTime.current > 500) {
          // 0.5초 이상 간격
          stepCount.current += 1;
          lastStepTime.current = currentTime;
        }
      }

      previousMagnitude.current = magnitude;
    });

    // 위치 데이터 수집
    Geolocation.watchPosition(
      position => {
        const {speed} = position.coords;
        // 최소 속도 필터링 (예: 0.1 m/s 이상만 처리)
        if (speed > 0.1) {
          // 위치 및 거리 계산
          const newDistance = speed / 3.6; // m/s를 km로 변환
          setDistance(prevDistance => prevDistance + newDistance);
          setPace(speed); // 속도(m/s)
          totalDistance.current += newDistance; // 총 거리 업데이트

          // 총 시간 업데이트
          totalTime.current = (Date.now() - startTime.current) / 1000; // 초 단위로 변환
          const averagePace =
            totalDistance.current / (totalTime.current / 3600); // km/h
          setAveragePace(averagePace.toFixed(2));
        }
      },
      error => {
        console.error('Location error:', error);
        setError(error);
      },
      {enableHighAccuracy: true, distanceFilter: 1, interval: 4000},
    );

    setLoading(false);
    return () => subscription.unsubscribe();
  };

  useEffect(() => {
    // 걸음 수 업데이트
    setSteps(stepCount.current);
  }, [stepCount.current]);

  useEffect(() => {
    // 칼로리 계산: 간단한 예시로 체중 70kg 가정, 보폭 0.7m
    setCalories((steps * 0.04).toFixed(2)); // 0.04 kcal per step
  }, [steps]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.toString()}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Steps: {steps}</Text>
      <Text>Distance: {distance.toFixed(2)} km</Text>
      <Text>Calories: {calories} kcal</Text>
      <Text>Pace: {pace.toFixed(2)} m/s</Text>
      <Text>Average Pace: {averagePace} km/h</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;

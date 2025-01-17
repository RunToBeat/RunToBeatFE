import {useState, useEffect, useRef} from 'react';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import Geolocation from 'react-native-geolocation-service';
import Sound from 'react-native-sound';

export const useDataTracking = () => {
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const [pace, setPace] = useState(0); // 현재 페이스 (분/km)
  const [averagePace, setAveragePace] = useState(0); // 평균 페이스 (분/km)
  const [error, setError] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMusicEnded, setIsMusicEnded] = useState(false); // 추가된 상태

  const previousMagnitude = useRef(0);
  const stepCount = useRef(0);
  const lastStepTime = useRef(Date.now());
  const startTime = useRef(Date.now());
  const totalDistance = useRef(0);
  const totalTime = useRef(0);
  const previousPosition = useRef(null);

  let accelSubscription = useRef(null);
  let geoSubscription = useRef(null);
  let timerId = useRef(null);

  let sound = useRef(null); // 음악 플레이어 참조
  const [currentSoundTime, setCurrentSoundTime] = useState(0); // 현재 재생 시간 상태 추가

  useEffect(() => {
    resetData();
    startMusic();
    return () => {
      if (sound.current) {
        sound.current.release(); // 음악 플레이어 정리
      }
    };
  }, []);

  const resetData = () => {
    setSteps(0);
    setDistance(0);
    setCalories(0);
    setPace(0);
    setAveragePace(0);
    setElapsedTime(0);
    setIsMusicEnded(false); // 음악 상태 초기화
    stepCount.current = 0;
    totalDistance.current = 0;
    totalTime.current = 0;
    previousMagnitude.current = 0;
    lastStepTime.current = Date.now();
    startTime.current = Date.now();
    previousPosition.current = null;
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = angle => (angle * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const calculateCalories = distance => {
    const weight = 70;
    const calories = distance * weight * 1.036;
    return calories.toFixed(2);
  };

  const startAccelerometerTracking = () => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 400);
    accelSubscription.current = accelerometer.subscribe(({x, y, z}) => {
      if (isPaused) return;
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const accelerationChange = Math.abs(
        magnitude - previousMagnitude.current,
      );

      if (accelerationChange > 0.2 && magnitude > 1.5) {
        const currentTime = Date.now();
        if (currentTime - lastStepTime.current > 1500) {
          stepCount.current += 1;
          lastStepTime.current = currentTime;
        }
      }

      previousMagnitude.current = magnitude;
      setSteps(stepCount.current);
    });
  };

  const startGeolocationTracking = () => {
    geoSubscription.current = Geolocation.watchPosition(
      position => {
        if (isPaused) return;
        const {latitude, longitude} = position.coords;
        const currentTime = Date.now();

        if (previousPosition.current) {
          const {
            latitude: prevLat,
            longitude: prevLon,
            time: prevTime,
          } = previousPosition.current;
          const newDistance = calculateDistance(
            prevLat,
            prevLon,
            latitude,
            longitude,
          );

          const timeDiff = (currentTime - prevTime) / 60000;
          if (timeDiff > 0 && newDistance > 0) {
            const currentPace = timeDiff / newDistance;
            setPace(currentPace);
          }

          totalDistance.current += newDistance;
          setDistance(totalDistance.current);

          const newCalories = calculateCalories(totalDistance.current);
          setCalories(newCalories);

          totalTime.current = (currentTime - startTime.current) / 60000;
          const avgPace =
            totalDistance.current > 0
              ? totalTime.current / totalDistance.current
              : 0;
          setAveragePace(avgPace);
        }

        previousPosition.current = {latitude, longitude, time: currentTime};
      },
      error => {
        setError('Location error');
        console.error('Location error:', error);
      },
      {enableHighAccuracy: true, distanceFilter: 1, interval: 4000},
    );
  };

  const startMusic = () => {
    const soundFile = require('../../sound/kimgu_introduce.mp3'); // 파일 경로를 지정

    sound.current = new Sound(soundFile, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }

      sound.current.setCurrentTime(currentSoundTime); // 저장된 현재 재생 시간 설정
      sound.current.play(success => {
        if (success) {
          console.log('Successfully finished playing');
          setIsMusicEnded(true); // 음악 종료 시 상태 업데이트
        } else {
          console.log('Playback failed due to audio decoding errors');
        }
      });
    });
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        if (!isPaused) {
          startAccelerometerTracking();
          startGeolocationTracking();
        }

        timerId.current = setInterval(() => {
          if (!isPaused) {
            const elapsed = Math.floor((Date.now() - startTime.current) / 1000);
            setElapsedTime(elapsed);
          }
        }, 1000);

        return () => {
          if (accelSubscription.current)
            accelSubscription.current.unsubscribe();
          if (geoSubscription.current !== null)
            Geolocation.clearWatch(geoSubscription.current);
          if (timerId.current) clearInterval(timerId.current);
          if (sound.current) {
            sound.current.getCurrentTime(seconds => {
              setCurrentSoundTime(seconds); // 현재 재생 시간 저장
              sound.current.release(); // 음악 플레이어 정리
            });
          }
        };
      } catch (error) {
        setError('Initialization error');
        console.error('Initialization error:', error);
      }
    };

    initialize();
  }, [isPaused]);

  const togglePause = () => {
    if (isPaused) {
      startTime.current = Date.now() - elapsedTime * 1000;
      startMusic(); // 재개 시 음악도 다시 시작
    } else {
      if (accelSubscription.current) accelSubscription.current.unsubscribe();
      if (geoSubscription.current !== null)
        Geolocation.clearWatch(geoSubscription.current);
      if (timerId.current) clearInterval(timerId.current);
      if (sound.current) {
        sound.current.getCurrentTime(seconds => {
          setCurrentSoundTime(seconds); // 현재 재생 시간 저장
          sound.current.pause(); // 음악 일시 정지
        });
      }
    }
    setIsPaused(prev => !prev);
  };

  return {
    steps,
    distance,
    calories: parseFloat(calories),
    pace, // 원시 페이스 값을 반환
    averagePace, // 원시 평균 페이스 값을 반환
    elapsedTime,
    error,
    isPaused,
    isMusicEnded, // 추가된 상태 반환
    togglePause,
  };
};

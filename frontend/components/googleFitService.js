// 인증 및 권한 요청 서비스 함수

import GoogleFit, {Scopes} from 'react-native-google-fit';
import {PermissionsAndroid, Platform} from 'react-native';

// 권한 요청 함수
export const requestPermissions = async () => {
  try {
    if (Platform.OS === 'android') {
      // 권한 요청 배열
      const permissions = [
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BODY_SENSORS,
        PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
      ];

      // 모든 권한 요청
      const granted = await Promise.all(
        permissions.map(permission =>
          PermissionsAndroid.request(permission, {
            title: 'Fitness App Permissions',
            message:
              'This app needs access to your location, body sensors, and activity recognition to track your fitness activities.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }),
        ),
      );

      // 모든 권한이 부여되었는지 확인
      return granted.every(
        result => result === PermissionsAndroid.RESULTS.GRANTED,
      );
    }
    return true;
  } catch (err) {
    console.warn('Error requesting permissions', err);
    return false;
  }
};

// Google Fit 인증 함수
export const authorizeGoogleFit = async () => {
  try {
    const permissionGranted = await requestPermissions();
    if (!permissionGranted) {
      throw new Error('Permission not granted');
    }

    const authResult = await GoogleFit.authorize({
      scopes: [Scopes.FITNESS_ACTIVITY_READ, Scopes.FITNESS_LOCATION_READ],
    });

    if (!authResult.success) {
      throw new Error(`Google Fit authorization failed: ${authResult.message}`);
    }

    return true;
  } catch (error) {
    console.error('Error in Google Fit authorization: ', error);
    throw error;
  }
};

// Google Fit 데이터 가져오기 함수
export const fetchGoogleFitData = async (startDate, endDate) => {
  try {
    const isAuthorized = await GoogleFit.checkIsAuthorized();
    if (!isAuthorized) {
      throw new Error('Google Fit not authorized');
    }

    const opt = {
      startDate, // 시작 날짜 (ISO 8601 형식)
      endDate, // 종료 날짜 (ISO 8601 형식)
      bucketUnit: 'DAY', // 버킷 단위
      bucketInterval: 1, // 버킷 간격
    };

    const res = await GoogleFit.getActivitySamples(opt);
    return res; // 데이터 반환
  } catch (error) {
    console.error('Error in fetching Google Fit data: ', error);
    throw error;
  }
};

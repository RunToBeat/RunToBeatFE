import GoogleFit, {Scopes, BucketUnit} from 'react-native-google-fit';
import {PermissionsAndroid, Platform} from 'react-native';

// 권한 요청 함수
export const requestPermissions = async () => {
  try {
    if (Platform.OS === 'android') {
      // 권한 요청
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
        {
          title: 'Activity Recognition Permission',
          message:
            'This app needs access to your activity recognition to track your fitness activities.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    // iOS에서는 권한을 요청할 필요가 없지만, 필요에 따라 추가 가능
    return true;
  } catch (err) {
    console.warn('Error requesting permissions', err);
    return false;
  }
};

// Google Fit 데이터 인증 및 가져오기 함수
export const fetchGoogleFitData = async (startDate, endDate) => {
  try {
    // 권한 요청
    const permissionGranted = await requestPermissions();
    if (!permissionGranted) {
      throw new Error('Permission not granted');
    }

    // Google Fit 인증
    const authResult = await GoogleFit.authorize({
      scopes: [Scopes.FITNESS_ACTIVITY_READ, Scopes.FITNESS_LOCATION_READ],
    });

    if (!authResult.success) {
      throw new Error(`Google Fit authorization failed: ${authResult.message}`);
    }

    // 데이터 요청
    const opt = {
      startDate, // 시작 날짜 (ISO 8601 형식)
      endDate, // 종료 날짜 (ISO 8601 형식)
      bucketUnit: BucketUnit.DAY, // 버킷 단위
      bucketInterval: 1, // 버킷 간격
    };

    const res = await GoogleFit.getActivitySamples(opt);
    return res; // 데이터 반환
  } catch (error) {
    console.error('Error in fetching Google Fit data: ', error);
    throw error;
  }
};

GoogleFit.checkIsAuthorized().then(() => {
  console.log(GoogleFit.isAuthorized); // Then you can simply refer to `GoogleFit.isAuthorized` boolean.
});

await checkIsAuthorized();
console.log(GoogleFit.isAuthorized);

// // The list of available scopes inside of src/scopes.js file
// const options = {
//   scopes: [
//     Scopes.FITNESS_ACTIVITY_READ,
//     Scopes.FITNESS_ACTIVITY_WRITE,
//     Scopes.FITNESS_BODY_READ,
//     Scopes.FITNESS_BODY_WRITE,
//   ],
// };
// GoogleFit.authorize(options)
//   .then(authResult => {
//     if (authResult.success) {
//       dispatch('AUTH_SUCCESS');
//     } else {
//       dispatch('AUTH_DENIED', authResult.message);
//     }
//   })
//   .catch(() => {
//     dispatch('AUTH_ERROR');
//   });

// // ...
// // Call when authorized
// GoogleFit.startRecording(callback => {
//   // Process data from Google Fit Recording API (no google fit app needed)
// });

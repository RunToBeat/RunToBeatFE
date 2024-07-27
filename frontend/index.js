/**
 * @format
 */
import 'react-native-gesture-handler'; // Ensure this is at the top
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if (__DEV__) {
  // 개발 모드에서만 실행
  const serverUrl = 'http://localhost:8081'; // 에뮬레이터 환경에 맞는 URL
  console.log('Server URL:', serverUrl);
  // 서버 URL을 사용하는 추가 설정을 여기에 추가할 수 있습니다
}

AppRegistry.registerComponent(appName, () => App);

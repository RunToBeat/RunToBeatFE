// 프로젝트의 root 경로에 config.js라는 파일을 생성하였다.
// 디버깅 툴임 건들지마세요
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({name: 'frontend'})
  .useReactNative()
  .connect();

console.tron = Reactotron;

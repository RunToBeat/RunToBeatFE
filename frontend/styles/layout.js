import {StyleSheet} from 'react-native';

export const defaultScreen = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '7%',
  },
});

export const scrollScreen = StyleSheet.create({
  screen: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '7%',
  },
});

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavigator from './navigators/BottomNavigator';

import {enableScreens} from 'react-native-screens';

enableScreens(); // Ensure this is at the top

const authorizeGoogleFit = async () => {
  try {
    const isAuthorized = await GoogleFit.checkIsAuthorized();
    if (isAuthorized) {
      console.log('Already authorized');
      return true;
    }

    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_ACTIVITY_WRITE,
        Scopes.FITNESS_BODY_READ,
        Scopes.FITNESS_BODY_WRITE,
        Scopes.FITNESS_LOCATION_READ,
        Scopes.FITNESS_LOCATION_WRITE,
      ],
    };

    const authRes = await GoogleFit.authorize(options);
    if (authRes.success) {
      console.log('Authorization successful');
      return true;
    } else {
      console.log('Authorization failed');
      return false;
    }
  } catch (err) {
    console.error('Authorization error:', err);
    return false;
  }
};

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

const App = () => {
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      await requestPermissions();
      const isGoogleFitAuthorized = await authorizeGoogleFit();
      if (!isGoogleFitAuthorized) {
        setError('Google Fit authorization failed');
        return;
      }
      setInitialized(true);
    };

    initialize();
  }, []);

  if (!initialized) {
    return (
      <View style={styles.container}>
        {error ? (
          <>
            <Text>Error: {error}</Text>
            <Button title="Retry" onPress={() => initialize()} />
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }

  return (
    <NavigationContainer>
      <BottomNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

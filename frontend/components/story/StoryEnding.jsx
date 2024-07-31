import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Sound from 'react-native-sound';

function StoryEnding() {
  const navigation = useNavigation();
  const route = useRoute();
  const {steps, distance, calories, averagePace, elapsedTime} = route.params;

  const dialogues = [
    {
      text: '무사히 K에게 도착했습니다.',
      image: null,
      audio: require('../../sound/success.mp3'),
    },
    {
      text: '쉽지 않은 여정이었을텐데 여기까지 오느라 고생많았소.',
      image: require('../../image/blurKimgu.png'),
      audio: require('../../sound/sugo.mp3'),
    },
    {
      text: '나는 김 구라고 하오.',
      image: require('../../image/Kimgu.png'),
      audio: require('../../sound/kimgu_introduce.mp3'),
    },
  ];

  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const soundRef = useRef(null);

  useEffect(() => {
    if (dialogues[currentDialogueIndex].audio) {
      const sound = new Sound(dialogues[currentDialogueIndex].audio, error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        sound.play(success => {
          if (!success) {
            console.log('Sound playback failed');
          }
        });
        soundRef.current = sound;
      });
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.release();
        soundRef.current = null;
      }
    };
  }, [currentDialogueIndex]);

  const handlePress = () => {
    if (currentDialogueIndex < dialogues.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    } else {
      navigation.navigate('StoryReport', {
        steps,
        distance,
        calories,
        averagePace,
        elapsedTime,
      });
    }
  };

  return (
    <ImageBackground
      source={require('../../image/endingBG.png')}
      style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          {dialogues[currentDialogueIndex].image && (
            <Image
              source={dialogues[currentDialogueIndex].image}
              style={styles.dialogueImage}
            />
          )}
        </View>
        <TouchableOpacity onPress={handlePress} style={styles.dialogueBox}>
          <View style={styles.borderBox}>
            <Text style={styles.dialogueText}>
              {dialogues[currentDialogueIndex].text}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 50,
  },
  imageContainer: {
    flexGrow: 1, // Allows image to grow and take up space
    justifyContent: 'flex-end', // Align image at the bottom of its container
    alignItems: 'center',
    width: '100%',
  },
  dialogueBox: {
    width: '80%',
    height: '17%',
    borderRadius: 10,
    backgroundColor: 'black',
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 20,
  },
  dialogueImage: {
    width: 400,
    height: 400,
  },
  dialogueText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default StoryEnding;

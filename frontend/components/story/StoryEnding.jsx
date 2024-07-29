import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
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
    <View style={styles.container}>
      {dialogues[currentDialogueIndex].image && (
        <Image
          source={dialogues[currentDialogueIndex].image}
          style={styles.dialogueImage}
        />
      )}
      <TouchableOpacity onPress={handlePress} style={styles.dialogueBox}>
        <Text style={styles.dialogueText}>
          {dialogues[currentDialogueIndex].text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  dialogueBox: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'center',
  },
  dialogueImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  dialogueText: {
    fontSize: 16,
    color: '#333333',
  },
});

export default StoryEnding;

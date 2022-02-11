import React from 'react';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';
import {View, Image, Button, Text, StyleSheet} from 'react-native';

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View style={styles.imageContainer}>
          <Image 
            // source={require('../assets/success.png')} 
            source={{uri: 'https://img-fotki.yandex.ru/get/6442/16969765.eb/0_6f7ea_35b34dd8_M.png'}}
            style={styles.image}
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            Your phone needed <Text style={styles.highlight}>{props.userNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.guessRounds}</Text>
          </BodyText>
        </View>
        <MainButton onPress={props.onRestart}>
          NEW GAME
        </MainButton>
    </View>   
  );
};

const styles = StyleSheet.create({
 screen: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
 },
 imageContainer: {
   width: 300,
   height: 300,
   borderRadius: 150,
   borderWidth: 3,
   borderColor: 'black',
   overflow: 'hidden',
   marginVertical: 30
 },
 image: {
   width: '100%', 
   height: '100%',
 },
 resultContainer: {
  width: '80%',
  marginHorizontal: 30,
  marginVertical: 15
 },
 resultText: {
   textAlign: 'center',
   fontSize: 20
 },
 highlight: {
   color: Colors.primary,
   fontFamily: 'open-sans-bold',
 }
});

export default GameOverScreen;

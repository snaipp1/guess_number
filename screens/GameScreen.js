import React, {useState, useRef, useEffect} from 'react';
import NumberContainer from '../components/NumberContainer';
import DefaultStyles from '../constants/default-styles';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Alert } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if( rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const GameScreen = (props) => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);

    const currentLow = useRef(1);
    const currentHight = useRef(100);
    const {userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)) {
            Alert.alert('Dont lie!', 'You know that this is wrong...', [{text: 'Sorry!', style: 'cancel'}]);
            return;
        }
        if (direction === 'lower') {
            currentHight.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHight.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(curPassGuesses => [nextNumber,...curPassGuesses, ])
    };

  return (
    <View style={styles.screen}>
        <Text style={DefaultStyles.bodyText}>
            Opponent's Guess
        </Text>
        <NumberContainer>
            {currentGuess}
        </NumberContainer>
        <Card style={styles.buttonContainer}>
            <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                <Ionicons name='md-remove' size={24} color='white'/>
            </MainButton>
            <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                <Ionicons name='md-add' size={24} color='white'/>
            </MainButton>
        </Card>
        <ScrollView>
            {pastGuesses.map((guess) => ( 
                <View key={guess}>
                    <Text>
                        {guess}
                    </Text>
                </View>
            ))}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
 screen: {
     flex: 1,
     padding: 10,
     alignItems: 'center'
 },
 buttonContainer: {
     flexDirection: 'row',
     justifyContent: 'space-around',
     marginTop: 20,
     width: 350,
     maxWidth: '90%'
 }
});

export default GameScreen;
import React, {useState} from 'react';
import Header from './components/Header';
import StarGameScreen from './screens/StarGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import { StyleSheet, View } from 'react-native';

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  let content = <StarGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = 
    <GameScreen 
      userChoice={userNumber} 
      onGameOver={gameOverHandler} 
    />;
  } else if(guessRounds > 0) {
    content = <GameOverScreen guessRounds={guessRounds} userNumber={userNumber}  onRestart={configureNewGameHandler} />
  }

  return (
    <View style={styles.screen}>
     <Header title="Guess a Number"/>
     {content}
    </View>
  );
}

const styles = StyleSheet.create({
 screen: {
   flex: 1
 }
});

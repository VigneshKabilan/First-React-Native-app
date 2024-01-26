import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

import StartGameScreen from './Screens/StartGameScreen';
import GameScreen from './Screens/GameScreen';
import Colors from './Constants/Colors';
import GameOverScreen from './Screens/GameOverScreen';
import AppLoading from 'expo-app-loading';

const App = () => {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRound, setGuessRound] = useState(0);

  const [fontLoaded] = useFonts({
    'open-san': require('./assets/Fonts/OpenSans-Regular.ttf'),
    'open-san-bold': require('./assets/Fonts/OpenSans-Bold.ttf')
  });

  if (!fontLoaded) { return <AppLoading />; }

  const PickedNumberHandle = (pickedNumber) => { 
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  const GameOverHandle = (numberOfRound) => {
    setGameIsOver(true);
    setGuessRound(numberOfRound);
  }

  const startNewGameHandler = () => {
    setUserNumber(null);
    setGuessRound(0);
  }

  let screen = <StartGameScreen onPicked={PickedNumberHandle}/>;

  if (userNumber) { screen = <GameScreen userNumber={userNumber} onGameover={GameOverHandle} />; }

  if (gameIsOver && userNumber) { 
    screen = <GameOverScreen 
      roundNumber={ guessRound } 
      userNumber={ userNumber } 
      onStartNewGame={ startNewGameHandler }
    /> 
  }

  return (
    <>
      <StatusBar style='light' /> 
      <LinearGradient colors={[ Colors.primary100 , Colors.assent100 ]} style={ styles.appContainer }>
        <ImageBackground 
          source={require('./assets/Images/Background.jpg')} 
          resizeMode='cover'
          style={styles.appContainer}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView>
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.3
  }
});

export default App;
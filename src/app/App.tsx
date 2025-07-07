/**
 * npx react-native run-android
 */

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';
import Calc from '../pages/calc/Calc';
import { useEffect, useState } from 'react';
import Game from '../pages/game/Game.tsx';
import { AppContext } from '../shared/context/AppContext.tsx';

function App() {
  type PageInfo = {
    slug: string,
    pathParams: Array<string>,
    queryParams: object,
  }

  const [page, setPage] = useState("calc");
  const [history, setHistory] = useState([] as Array<string>)

  const navigate = (href: string) => {
    if (href == page) return;
    history.push(page);
    setHistory(history);
    setPage(href);
  }

  const popRoute = () => {
    if (history.length > 0) {
      const page = history.pop() ?? "calc";
      setHistory(history);
      setPage(page);
    } else {
      BackHandler.exitApp();
    }
  }

  useEffect(() => {
    const listener = BackHandler.addEventListener('hardwareBackPress', () => {
      popRoute();
      return true
    })

    return () => listener.remove()
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <AppContext.Provider value={{navigate}}>
        <View style={styles.content}>
          { page == "calc" ? <Calc /> : <Game /> }
        </View>

        <View style={styles.bottomNav}>
          <Pressable onPress={() => navigate("calc")} style={styles.bottomNavItem}>
            <Text>Calc</Text>
          </Pressable>
          <Pressable onPress={() => navigate("game")} style={styles.bottomNavItem}>
            <Text>Game</Text>
          </Pressable>
        </View>
        </AppContext.Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  bottomNav: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 50,
    width: '100%',
  },
  bottomNavItem: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    padding: 5,
  }
});

export default App;

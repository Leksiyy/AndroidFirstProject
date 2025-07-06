/**
 * npx react-native run-android
 */

import { StyleSheet, Text, View } from 'react-native';

function App() {

  return (
    <View style={styles.container}>
      <Text>Hello World!!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

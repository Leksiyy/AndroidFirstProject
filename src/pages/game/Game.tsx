import { Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useContext, useState } from 'react';
import { AppContext } from '../../shared/context/AppContext.tsx';

type EventData = {
  x: number,
  y: number,
  t: number,
}

const distanceThreshould = 50;
const timeThreshould = 500;

export default function Game() {
  const {navigate} = useContext(AppContext);
  const [text, setText] = useState("Game");

  var startData: EventData | null = null;
  const detectSwipe = (finishData: EventData) => {
    if (startData == null) return;
    const dx = finishData.x - startData?.x;
    const dy = finishData.y - startData?.y;
    const dt = finishData.t - startData?.t;
    console.log(dx, dy, dt)
    if (dt < timeThreshould) {
      if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > distanceThreshould) {
          if (dx > 0) {
            setText("Right")
          } else {
            setText("Left")
          }
        }
      } else {
        if (Math.abs(dy) > distanceThreshould) {
          if (dy > 0) {
            setText("Down")
          } else {
            setText("Up")
          }
        }
      }
    }
  }

  return <TouchableWithoutFeedback
    onPressIn={e => {startData = {x:e.nativeEvent.pageX, y:e.nativeEvent.pageY, t:e.nativeEvent.timestamp}}}
    onPressOut={e => detectSwipe({x:e.nativeEvent.pageX, y:e.nativeEvent.pageY, t:e.nativeEvent.timestamp})}>
      <View style={styles.container}>
        <Pressable onPress={() => navigate("calc")}>
          <Text>{text}</Text>
        </Pressable>
      </View>
  </TouchableWithoutFeedback>
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

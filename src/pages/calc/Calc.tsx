import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Calc() {
  const onButtonPress = (title: string) => {
    console.log(title);
  }
  return (
    <View style={styles.calcContainer}>
      <Text style={styles.title}>Calculator</Text>
      <Text style={styles.expression}>22 + 33 =</Text>
      <Text style={styles.result}>55</Text>
      <View style={styles.calcButtonRow}>
        <CaclButton title="%" action={onButtonPress} />
        <CaclButton title="CE" action={onButtonPress} />
        <CaclButton title="C" action={onButtonPress} />
        <CaclButton title={'\u232B'} action={onButtonPress} />
      </View>
      <View style={styles.calcButtonRow}>
        <CaclButton title={'\u00B9/\u2093'} action={onButtonPress} />
        <CaclButton title={'x\u00B2'} action={onButtonPress} />
        <CaclButton title={'\u00B2\u221Ax'} action={onButtonPress} />
        <CaclButton title={'\u00f7'} action={onButtonPress} />
      </View>
      <View style={styles.calcButtonRow}>
        <CaclButton title="7" action={onButtonPress} />
        <CaclButton title="8" action={onButtonPress} />
        <CaclButton title="9" action={onButtonPress} />
        <CaclButton title={'\u00D7'} action={onButtonPress} />
      </View>
      <View style={styles.calcButtonRow}>
        <CaclButton title="4" action={onButtonPress} />
        <CaclButton title="5" action={onButtonPress} />
        <CaclButton title="6" action={onButtonPress} />
        <CaclButton title="-" action={onButtonPress} />
      </View>
      <View style={styles.calcButtonRow}>
        <CaclButton title="1" action={onButtonPress} />
        <CaclButton title="2" action={onButtonPress} />
        <CaclButton title="3" action={onButtonPress} />
        <CaclButton title='+' action={onButtonPress} />
      </View>
      <View style={styles.calcButtonRow}>
        <CaclButton title={'\u207A/\u208B'} action={onButtonPress} />
        <CaclButton title="0" action={onButtonPress} />
        <CaclButton title="," action={onButtonPress} />
        <CaclButton title="=" action={onButtonPress} />
      </View>
    </View>
  );
}

type CalcButtonData = {
  title: string,
  type?: string,
  action: (title: string, type?: string) => any
}

function CaclButton({title, type, action}: CalcButtonData) {
  return(
    <TouchableOpacity onPress={() => action(title, type)} style={styles.caclButton}>
      <Text style={styles.calcButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  calcButtonText: {
    color: "#ffffff",
    fontSize: 20,
  },
  caclButton: {
    backgroundColor: '#323232',
    borderRadius: 7,
    flex: 1,
    margin: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calcContainer: {
    backgroundColor: '#202020',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    // justifyContent: 'center',
    width: '100%',
  },
  title: {
    color: "#ffffff",
    margin: 10,
  },
  expression: {
    color: "#a6a6a6",
    textAlign: 'right',
    margin: 10,
  },
  result: {
    color: "#ffffff",
    textAlign: 'right',
    margin: 10,
    fontSize: 30,
    fontWeight: '700',
  },
  calcButtonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 3,
  }
});
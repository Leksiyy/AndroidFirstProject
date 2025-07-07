import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type CalcButtonMemoryControlData = {
  title: string,
}

export function CaclButtonMemoryControl({ title }: CalcButtonMemoryControlData) {
  return (
    <TouchableOpacity onPress={() => {}} style={[styles.caclButton, styles.caclButtonMemoryControl]}>
      <Text style={styles.calcButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

type CalcButtonData = {
  title:  string,
  type?:  string,
  data?:  string,
  action: (title:string, data?:string) => any
};

export function CalcButton({title, type, data, action}: CalcButtonData) {
  return <TouchableOpacity
    onPress={() => action(title, data)}
    style={[styles.caclButton, (
      type=="digit" ? styles.digitButton
        : type=="equal" ? styles.equalButton
          : styles.operationButton
    )]}>
    <Text style={
      type=="equal" ? styles.equalButton
        : styles.calcButtonText
    }>{title}</Text>
  </TouchableOpacity>;
}


const styles = StyleSheet.create({
  caclButtonMemoryControl: {
    backgroundColor: 'transparent',
  },
  calcButtonText: {
    color: "#ffffff",
    fontSize: 20,
  },
  caclButton: {
    borderRadius: 7,
    flex: 1,
    margin: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  operationButton: {
    backgroundColor: '#323232',
  },
  digitButton: {
    backgroundColor: '#3b3b3b',
  },
  equalButton: {
    backgroundColor: '#4cc2ff',
    color: '#323232',
  }
})

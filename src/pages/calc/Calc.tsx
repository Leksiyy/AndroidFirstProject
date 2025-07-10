import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {CalcButton, CaclButtonMemoryControl} from './components/CalcButton';
import {useState} from "react";

export default function Calc() {
  const [result, setResult] = useState("0");      // то, что показываем
  const [operand, setOperand] = useState<number | null>(null); // левый аргумент
  const [operator, setOperator] = useState<string | null>(null); // символ операции
  const [waitingNext, setWaitingNext] = useState(false); // ждём набор второго аргумента?

  const {width, height} = useWindowDimensions()

  const maxResultDigits = 20;

  const perform = (a: number, op: string | null, b: number): number => {
    switch (op) {
      case "add": return a + b;
      case "sub": return a - b;
      case "mul": return a * b;
      case "div": return b === 0 ? NaN : a / b;
      default:    return b;          // если оператор ещё не задан
    }
  };


  const onOperaionPress = (title: string, data?: string) => {
    switch (data) {
      case "clear": setResult("0"); break;
      case "backspace":
        if(result.length > 1) {
          setResult(result.substring(0, result.length - 1));
        } else {
          setResult("0");
        }
        break;
      case "inverse": setResult((1/Number(result)).toString()); break;

      case "add":
      case "sub":
      case "mul":
      case "div": {
        // если уже был введён оператор, сначала посчитать промежуточный итог
        if (operator && !waitingNext) {
          const interim = perform(operand ?? 0, operator, Number(result));
          setOperand(interim);
          setResult(interim.toString());
        } else {
          setOperand(Number(result));
        }
        setOperator(data);
        setWaitingNext(true);        // ждём ввод второго аргумента
        break;
      }

      case "equal": {
        if (operator) {
          const res = perform(operand ?? 0, operator, Number(result));
          setResult(res.toString());
          setOperand(null);          // обнуляем цепочку
          setOperator(null);
        }
        break;
      }

      case "square": {
        const res = Math.pow(Number(result), 2);
        setResult(res.toString());
        break;
      }

      case "sqrt": {
        const res = Math.sqrt(Number(result));
        setResult(res.toString());
        break;
      }
    }
  };


  const onDigitPress = (title: string) => {
    if (waitingNext) {          // начинаем вводить второй аргумент
      setResult(title);
      setWaitingNext(false);
    } else {
      setResult(result === "0" ? title : result + title);
    }
  };

    const onDotPress = (title: string) => {
        if(!result.includes(".")) {
            setResult(result + ".");
        }
    }
    const onPmPress = () => {
      if (result === "0") return;

      if (result.startsWith("-")) {
        setResult(result.substring(1));
      } else {
        setResult("-" + result);
      }
    };


    const portraitView = () => {
        return (
            <View style={styles.calcContainer}>
                <Text style={styles.title}>Calculator</Text>
                <Text style={styles.expression}>22 + 33 =</Text>
                <Text style={[styles.result, {fontSize: result.length < 20 ? styles.result.fontSize : styles.result.fontSize * 19 / result.length}]}>{result}</Text>
                <View style={styles.calcButtonRow}>
                    <CaclButtonMemoryControl title="MC" />
                    <CaclButtonMemoryControl title="MR" />
                    <CaclButtonMemoryControl title="M+" />
                    <CaclButtonMemoryControl title="M-" />
                    <CaclButtonMemoryControl title="MS" />
                    <CaclButtonMemoryControl title={'M\u02C5'} />
                </View>
                <View style={styles.calcButtonRow}>
                    <CalcButton title="%" action={onOperaionPress} />
                    <CalcButton title="CE" action={onOperaionPress} />
                    <CalcButton title="C" action={onOperaionPress} data="clear"/>
                    <CalcButton title={'\u232B'} action={onOperaionPress} data="backspace" />
                </View>
                <View style={styles.calcButtonRow}>
                    <CalcButton title={'\u00B9/\u2093'} action={onOperaionPress} data="inverse" />
                    <CalcButton title={'x\u00B2'} action={onOperaionPress} data="square" />
                    <CalcButton title={'\u00B2\u221Ax'} action={onOperaionPress} data="sqrt" />
                    <CalcButton title={'\u00F7'} action={onOperaionPress} data="div" />
                </View>
                <View style={styles.calcButtonRow}>
                    <CalcButton title="7" action={onDigitPress} type="digit" />
                    <CalcButton title="8" action={onDigitPress} type="digit" />
                    <CalcButton title="9" action={onDigitPress} type="digit" />
                    <CalcButton title={'\u00D7'} action={onOperaionPress} data="mul" />
                </View>
                <View style={styles.calcButtonRow}>
                    <CalcButton title="4" action={onDigitPress} type="digit" />
                    <CalcButton title="5" action={onDigitPress} type="digit" />
                    <CalcButton title="6" action={onDigitPress} type="digit" />
                    <CalcButton title="-"  action={onOperaionPress} data="sub" />
                </View>
                <View style={styles.calcButtonRow}>
                    <CalcButton title="1" action={onDigitPress} type="digit" />
                    <CalcButton title="2" action={onDigitPress} type="digit" />
                    <CalcButton title="3" action={onDigitPress} type="digit" />
                    <CalcButton title="+"  action={onOperaionPress} data="add" />
                </View>
                <View style={styles.calcButtonRow}>
                    <CalcButton title={'\u207A/\u208B'} action={onPmPress} />
                    <CalcButton title="0" action={onDigitPress} type="digit" />
                    <CalcButton title="," action={onDotPress} />
                  <CalcButton title="="  action={onOperaionPress} data="equal" type="equal" />
                </View>
            </View>

    );
    }

    const landscapeView = () => {
        return <View style={styles.calcContainer}>

            <View style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>

                <View style={{flex: 2,display: "flex", flexDirection: "column"}}>
                    <Text style={[styles.title, {margin: 0}]}>Калькулятор</Text>
                    <Text style={styles.expression}>22 + 33 =</Text>
                </View>

                <Text style={[styles.result, {fontSize: result.length < 20 ? styles.result.fontSize : styles.result.fontSize * 19 / result.length}]}>{result}</Text>
            </View>

            <View style={styles.calcButtonRow}>
                <CaclButtonMemoryControl title="MC" />
                <CaclButtonMemoryControl title="MR" />
                <CaclButtonMemoryControl title="M+" />
                <CaclButtonMemoryControl title="M-" />
                <CaclButtonMemoryControl title="MS" />
                <CaclButtonMemoryControl title={'M\u02C5'} />
            </View>

            <View style={styles.calcButtonRow}>
                <CalcButton title="%"        action={onOperaionPress}/>
                <CalcButton title="7" type="digit" action={onDigitPress}/>
                <CalcButton title="8" type="digit" action={onDigitPress}/>
                <CalcButton title="9" type="digit" action={onDigitPress}/>
                <CalcButton title={'\u00F7'}  action={onOperaionPress} data="div"/>
                <CalcButton title={"\u232B"} action={onOperaionPress} data="backspace"/>
            </View>
            <View style={styles.calcButtonRow}>
                <CalcButton title={'\u00B9/\u{1D465}'} action={onOperaionPress} data="inverse" />
                <CalcButton title="4" type="digit"  action={onDigitPress}/>
                <CalcButton title="5" type="digit"  action={onDigitPress}/>
                <CalcButton title="6" type="digit"  action={onDigitPress}/>
                <CalcButton title={'\u00D7'} action={onOperaionPress} data="mul"/>
                <CalcButton title="C"        action={onOperaionPress} data="clear"/>
            </View>
            <View style={styles.calcButtonRow}>
                <CalcButton title={'\u{1D465}\u00B2'} action={onOperaionPress} data="square"/>
                <CalcButton title="1" type="digit"  action={onDigitPress}/>
                <CalcButton title="2" type="digit"  action={onDigitPress}/>
                <CalcButton title="3" type="digit"  action={onDigitPress}/>
                <CalcButton title={'\uFF0D'} action={onOperaionPress} data="sub"/>
                <CalcButton title="CE"       action={onOperaionPress} data="clearEntry"/>
            </View>
            <View style={styles.calcButtonRow}>
                <CalcButton title={'\u221A\u{1D465}\u0305'}action={onOperaionPress} data="sqrt" />
                <CalcButton title={'\u00B1'} type="digit" action={onPmPress}/>
                <CalcButton title="0" type="digit"        action={onDigitPress}/>
                <CalcButton title="," type="digit"        action={onDotPress}/>
                <CalcButton title={'\uFF0B'} action={onOperaionPress} data="add" />
                <CalcButton title={'\uFF1D'} type="equal" action={onOperaionPress}/>
            </View>
        </View>;
    };

    return width < height ? portraitView() : landscapeView();
}



const styles = StyleSheet.create({

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
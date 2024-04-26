import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  value: [0, 0],
  current: 0,
}

export default function App() {
  const [displayValue, setDisplayValue] = useState(initialState.displayValue);
  const [clearDisplay, setClearDisplay] = useState(initialState.clearDisplay);
  const [operation, setOperation] = useState(initialState.operation);
  const [values, setValues] = useState(initialState.values);
  const [current, setCurrent] = useState(initialState.current);

  const addDigit = n => {
    const clear = displayValue === "0" || clearDisplay;

    if (n === "." && !clear && displayValue.includes(".")) {
      return;
    }

    const currentValue = clear ? "" : displayValue;
    const newValue = currentValue + n;
    setDisplayValue(newValue);
    setClearDisplay(false);

    if (n !== ".") {
      const newValueFloat = parseFloat(newValue);
      const newValues = [...values];
      newValues[current] = newValueFloat;
      setValues(newValues);
    }
  };

  const clearMemory = () => {
    setDisplayValue(initialState.displayValue);
    setClearDisplay(initialState.clearDisplay);
    setOperation(initialState.operation);
    setValues(initialState.values);
    setCurrent(initialState.current);
  };

  const performOperation = op => {
    if (current === 0) {
      setOperation(op);
      setCurrent(1);
      setClearDisplay(true);
    } else {
      const equals = op === "=";
      const newValues = [...values];
      try {
        newValues[0] = eval(`${values[0]} ${operation} ${values[1]}`);
      } catch (e) {
        newValues[0] = values[0];
      }
      newValues[1] = 0;

      setDisplayValue(`${newValues[0]}`);
      setOperation(equals ? null : op);
      setCurrent(equals ? 0 : 1);
      setClearDisplay(true);
      setValues(newValues);
    }
  };

  return (
    <View style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" triple onClick={clearMemory} />
        <Button label="/" operation onClick={() => performOperation("/")} />
        <Button label="7" onClick={() => addDigit(7)} />
        <Button label="8" onClick={() => addDigit(8)} />
        <Button label="9" onClick={() => addDigit(9)} />
        <Button label="*" operation onClick={() => performOperation("*")} />
        <Button label="4" onClick={() => addDigit(4)} />
        <Button label="5" onClick={() => addDigit(5)} />
        <Button label="6" onClick={() => addDigit(6)} />
        <Button label="-" operation onClick={() => performOperation("-")} />
        <Button label="1" onClick={() => addDigit(1)} />
        <Button label="2" onClick={() => addDigit(2)} />
        <Button label="3" onClick={() => addDigit(3)} />
        <Button label="+" operation onClick={() => performOperation("+")} />
        <Button label="0" double onClick={() => addDigit(0)} />
        <Button label="." onClick={() => addDigit(".")} />
        <Button label="=" operation onClick={() => performOperation("=")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

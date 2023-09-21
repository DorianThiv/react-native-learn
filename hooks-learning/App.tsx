import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface NumberInputProps {
  onClick: (v: number) => void;
}

function NumberInput({ onClick }: NumberInputProps) {

  const [value, setValue] = useState(0);

  return (
    <div>
      <input type="number" style={styles.input} pattern="[0-9]*" value={value} onChange={(e) => {
        setValue(e.target.validity.valid ? parseInt(e.target.value) : value);
      }}/>
      <button style={styles.button} onClick={(e) => onClick(value)}>Add delta</button>
    </div>
  )

}

export default function App() {

  const [count, setCount] = useState(0);

  function handleClick(delta: number) {
    setCount(count + delta);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Count: {count}</Text>
      <StatusBar style="auto" />
      <br></br>
      <NumberInput onClick={handleClick}></NumberInput>
      <br></br>
      <div>
        <button style={styles.button} onClick={(e) => handleClick(-1)}>Click to -1</button>
        <button style={styles.button} onClick={(e) => handleClick(1)}>Click to +1</button>
      </div>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 50
  },
  input: {
    width: 200,
    height: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: '#888'
  },
  button: {
    height: 52,
    margin: 10
  }
});

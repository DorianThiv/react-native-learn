import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

interface NumberInputProps {
  onClick: (v: string) => void;
}

function NumberInput({ onClick }: NumberInputProps) {

  const [value, setValue] = useState('');

  return (
    <View style={styles.containerField}>
      <TextInput keyboardType='numeric' style={styles.input} value={value} onChangeText={(v) => setValue(v)}></TextInput>
      <Pressable style={styles.button} onPress={(e) => onClick(value)}>
        <Text style={styles.textBtn}>Add delta</Text>
      </Pressable>
    </View>
  )

}

interface CountTextProps {
  count: number;
}

function CountText({ count }: CountTextProps) {

  const [color, setColor] = useState({ r: 168, g: 164, b: 50 });

  useEffect(() => {
    var cg = color.g - (count);
    cg = cg <= 0 ? 1 : cg;
    cg = cg >= 255 ? 255 : cg;
    cg = isNaN(cg) ? 0 : cg;
    setColor({ r: 168, g: cg, b: 50 });
  }, [count]);

  return (
    <Text style={{...styles.text, ...{ color: `rgb(${color.r}, ${color.g}, ${color.b})` }}}>Count: {count}</Text>
  )

}

export default function App() {

  const [count, setCount] = useState(0);

  function handleClick(delta: string) {
    const v = parseInt(delta);
    if (!isNaN(v)) {
      setCount(count + v);
    }
  }

  return (
    <View style={styles.container}>
      <CountText count={count}></CountText>
      <StatusBar style="auto" />
      <NumberInput onClick={handleClick}></NumberInput>
      <View style={styles.containerField}>
        <Pressable style={styles.button} onPress={(e) => handleClick('-1')}>
          <Text style={styles.textBtn}>Click to -1</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={(e) => handleClick('1')}>
          <Text style={styles.textBtn}>Click to +1</Text>
        </Pressable>
      </View>
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
  containerField: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 50,
    color: '#333'
  },
  input: {
    width: 200,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#888'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    height: 50,
    backgroundColor: 'black',
    margin: 10,
  },
  textBtn: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

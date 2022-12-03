import { useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      console.log('User signed up !');
    } catch (err) {
      console.log(err);
      Alert.alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        onChangeText={(txt) => setEmail(txt)}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        secureTextEntry={true}
        onChangeText={(txt) => setPassword(txt)}
      />
      <Button
        mode="contained"
        onPress={() => userSignUp()}
        disabled={email && password ? false : true}
        style={styles.btn}>
        Sign Up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  input: {
    height: 35,
    marginBottom: 10,
  },
  btn: {
    alignSelf: 'center',
  },
});

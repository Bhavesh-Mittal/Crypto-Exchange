import { useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignIn = async() => {
    if (!email && !password) {
      Alert.alert('Please fill all the fields');
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log('User signed in !');
    } catch(err) {
      Alert.alert('Something went wrong. Please try again later.')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        onChangeText={ txt => setEmail(txt) }
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        secureTextEntry={ true }
        onChangeText={ txt => setPassword(txt) }
      />
      <Button mode="contained" onPress={ () => userSignIn() }>Sign In</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 35,
    marginBottom: 10,
  },
});
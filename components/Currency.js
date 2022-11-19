import * as React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function Currency() {
  const userSignOut = async() => {
    try {
      await auth().signOut();
      console.log('User logged out !');
    } catch(err) {
      Alert.alert('Something went wrong. Please try again later.')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} mode="outlined" label="Crypto Currency" />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Current Exchange Rate"
      />
      <Button mode="contained">Send</Button>
      <Button mode="contained" onPress={ () => userSignOut() } style={styles.signOutBtn}>Sign Out</Button>
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
  signOutBtn: {
    marginTop: 10,
  },
});
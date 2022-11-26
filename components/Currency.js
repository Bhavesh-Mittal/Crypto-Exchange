import { useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function Currency() {
  const [currency, setCurrency] = useState('');
  const [exchangeRate, setExchangeRate] = useState('');
  const [image, setImage] = useState();

  const userSignOut = async() => {
    try {
      await auth().signOut();
      console.log('User logged out !');
    } catch(err) {
      Alert.alert('Something went wrong. Please try again later.')
    }
  }

  const openCamera = async() => {
    await launchCamera({ quality: 0.5 }, (result) => {
      if (result.errorCode ) {
        console.log(result.errorCode);
      }

      const img = result.assets[0];
      const uploadTask = storage()
        .ref()
        .child(`/items/${Date.now()}`)
        .putFile(img.uri);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress == 100) {
            Alert.alert('Uploaded Image');
          }
        },
        (error) => {
          console.log(error);
          Alert.alert('Something went wrong. Please try again later.');
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setImage(downloadURL);
          });
        },
      );
    });
  }

  const sendPost = async() => {
    try {
      await firestore().collection('exchange')
        .add({
          currency: currency,
          exchangeRate: exchangeRate,
          uid : auth().currentUser.uid })
        .then(() => {
          Alert.alert('Posted');
        });
    } catch (error) {
      console.log(error);
      Alert.alert('Something went wrong. Please try again later');
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Crypto Currency"
        onChangeText={ (txt) => setCurrency(txt) }
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Current Exchange Rate"
        onChangeText={ (txt) => setExchangeRate(txt) }
        keyboardType='numeric'
      />
      <Button mode="contained" disabled={ currency && exchangeRate ? false : true } onPress={ () => sendPost() }>Send</Button>
      <Button mode="contained" onPress={ () => openCamera() } style={styles.btn}>Open Camera</Button>
      <Button mode="contained" onPress={ () => userSignOut() } style={styles.btn}>Sign Out</Button>
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
    marginTop: 10,
  },
});
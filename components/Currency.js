import { Text, View, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function Currency() {
  const userSignOut = async () => {
    try {
      await auth().signOut();
      console.log('User logged out !');
    } catch (err) {
      Alert.alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => userSignOut()}>
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

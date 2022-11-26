import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Currency from './components/Currency';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Sign Up" component={SignUp} />
      <Tab.Screen name="Sign In" component={SignIn} />
    </Tab.Navigator>
  );
};

const CryptoNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Crypto Exchange" component={Currency} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  const [user, setUser] = useState('');
  useEffect(() => {
    auth().onAuthStateChanged((userExist) => {
      if (userExist) {
        setUser(userExist);
      } else {
        setUser('');
      }
    })
  }, []);

  return (
    <NavigationContainer>
      {user ? <CryptoNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
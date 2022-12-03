import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import PostScreen from './components/PostScreen';
import Currency from './components/Currency';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';

const Tab = createBottomTabNavigator();

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
    <Tab.Navigator>
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen name="Crypto Currency" component={Currency} />
    </Tab.Navigator>
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
    });
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
  },
});
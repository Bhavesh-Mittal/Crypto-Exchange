import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import PostScreen from './components/PostScreen';
import Currency from './components/Currency';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';

const Tab1 = createBottomTabNavigator();
const Tab2 = createBottomTabNavigator();

const AuthNavigator = () => {
  return (
    <Tab1.Navigator>
      <Tab1.Screen name="Sign Up" component={SignUp} />
      <Tab1.Screen name="Sign In" component={SignIn} />
    </Tab1.Navigator>
  );
};

const CryptoNavigator = () => {
  return (
    <Tab2.Navigator>
      <Tab2.Screen name="Post" component={PostScreen} />
      <Tab2.Screen name="Crypto Currency" component={Currency} />
    </Tab2.Navigator>
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

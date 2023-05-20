import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home';
import 'react-native-gesture-handler';
import { SignIn } from './src/components/SignIn';
import { SignUp } from './src/components/SignUp';
import MainPanel from './src/screens/MainPanel';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Panel" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Panel" component={MainPanel} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



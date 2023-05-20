import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import * as Font from 'expo-font';
import Home from './src/screens/Home';
import MainPanel from './src/screens/MainPanel';

const Drawer = createDrawerNavigator();

export default function App() {

  useEffect(() => {
    Font.loadAsync({
        'MontserratRegular': require('./assets/Montserrat/static/Montserrat-Regular.ttf'),
        'MontserratBold': require('./assets/Montserrat/static/Montserrat-Bold.ttf'),
        'TitilliumSemiBold': require('./assets/Titillium_Web/TitilliumWeb-SemiBold.ttf'),
    })
  }, []);

  return (
    <NavigationContainer >
      <Drawer.Navigator 
        initialRouteName="Panel" 
        screenOptions={{drawerPosition: 'right', headerShown: false}} 
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Panel" component={MainPanel} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}



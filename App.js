import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home';
import MainPanel from './src/screens/MainPanel';
import Teste from './src/screens/Teste';

const Drawer = createDrawerNavigator();

export default function App() {
 
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



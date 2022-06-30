
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Text, View} from "react-native";
import HomeScreen from "./HomeScreen";


const Stack = createNativeStackNavigator();

const App = () => {

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Notenverwaltung' }}
          />

        </Stack.Navigator>
      </NavigationContainer>
  );
};



export default App;

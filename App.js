
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Text, View} from "react-native";
import HomeScreen from "./HomeScreen";
import NotenForm from "./Components/grades/NotenForm";
import Setting from "./Components/other/Settings";


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
            <Stack.Screen
                name="Setting"
                component={Setting}
            />

            <Stack.Screen
                name="addNote"
                component={NotenForm}
                options={{ title: 'Note erfassen',  headerTitleAlign: "center" }}
            />
        </Stack.Navigator>
      </NavigationContainer>
  );
};



export default App;

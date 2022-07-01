import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "./HomeScreen";
import Setting from "./Components/other/Settings";
import NotenForm from "./Components/grades/forms/NotenForm";
import Create from "./Components/grades/forms/Create";
import SemesterList from "./Components/grades/overview/SemesterList";
import SubjectList from "./Components/grades/overview/SubjectList";
import GradeOverview from "./Components/grades/overview/GradeOverview";


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
            <Stack.Screen
                name="Create"
                component={Create}
                options={{ title: 'Erstellen',  headerTitleAlign: "center" }}
            />

            <Stack.Screen
                name="SemesterL"
                component={SemesterList}
            />

            <Stack.Screen
                name="SubjectL"
                component={SubjectList}
            />

          <Stack.Screen
              name="GradeList"
              component={GradeOverview}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};



export default App;

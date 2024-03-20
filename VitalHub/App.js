import { Quicksand_500Medium, Quicksand_400Regular, Quicksand_600SemiBold } from '@expo-google-fonts/quicksand';
import { ClinicLocation } from './src/screens/ClinicLocation/ClinicLocation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MedicalRecord } from './src/screens/MedicalRecord/MedicalRecord';
import { ResetPassword } from './src/screens/ResetPassword/ResetPassword';
import { ClinicSelect } from './src/screens/ClinicSelect/ClinicSelect';
import { MedicSelect } from './src/screens/MedicSelect/MedicSelect';
import { MedicRecord } from './src/screens/MedicRecord/MedicRecord';
import { UserProfile } from './src/screens/UserProfile/UserProfile';
import { DateSelect } from './src/screens/DateSelect/DateSelect';
import { Navegation } from './src/screens/Navegation/Navegation';
import { NavigationContainer } from '@react-navigation/native';
import { EmailCode } from './src/screens/EmailCode/EmailCode';
import { Register } from './src/screens/Register/Register';
import { Login } from './src/screens/Login/Login';
import { Reset } from './src/screens/Reset/Reset';
import { StatusBar } from 'expo-status-bar';

//Instancia do stack navigator
const Stack = createNativeStackNavigator();

import {
  useFonts, MontserratAlternates_600SemiBold,
  MontserratAlternates_500Medium,
  MontserratAlternates_700Bold,
} from '@expo-google-fonts/montserrat-alternates';
import { Main } from './src/screens/Main/Main';
import { Home } from './src/screens/Home/Home';

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    MontserratAlternates_600SemiBold,
    MontserratAlternates_500Medium,
    MontserratAlternates_700Bold,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold
  });

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    //Navigation
    //Conatainer
    //Stack Navigation
    //Stack Secreen

    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator
      screenOptions={{headerShown : false}}
      >

        <Stack.Screen
          name='Login'
          component={Login}
          options={{ title: 'Login' }}
        />
        
        <Stack.Screen
          name='Main'
          component={Main}
        />

        {/* <Stack.Screen
          //Nome da tela
          name='Navegacao'
          //Componente que sera chamado
          component={Navegation}
          options={{ title: 'Navegacao' }}
        /> */}

        <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: 'Home' }}
        />

        <Stack.Screen
          name='Reset'
          component={Reset}
          options={{ title: 'Reset' }}
        />

        <Stack.Screen
          name='Register'
          component={Register}
          options={{ title: 'Register' }}
        />

        <Stack.Screen
          name='EmailCode'
          component={EmailCode}
          options={{ title: 'EmailCode' }}
        />

        <Stack.Screen
          name='ResetPassword'
          component={ResetPassword}
          options={{ title: 'ResetPassword' }}
        />

        <Stack.Screen
          name='UserProfile'
          component={UserProfile}
          options={{ title: 'UserProfile' }}
        />

        <Stack.Screen
          name='ClinicLocation'
          component={ClinicLocation}
          options={{ title: 'ClinicLocation' }}
        />


        <Stack.Screen
          name='MedicalRecord'
          component={MedicalRecord}
          options={{ title: 'MedicalRecord' }}
        />

        <Stack.Screen
          name='ClinicSelect'
          component={ClinicSelect}
          options={{ title: 'ClinicSelect' }}
        />
        <Stack.Screen
          name='MedicSelect'
          component={MedicSelect}
          options={{ title: 'MedicSelect' }}
        />

        <Stack.Screen
          name='DateSelect'
          component={DateSelect}
          options={{ title: 'DateSelect' }}
        />

        <Stack.Screen
          name='MedicRecord'
          component={MedicRecord}
          options={{ title: 'MedicRecord' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
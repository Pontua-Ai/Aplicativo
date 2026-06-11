import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Autenticar from './Autenticacao.js';
import Materias from './Materias';
import Conteudo from './Conteudo';
import Documentacao from './Documentacao';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Autenticar" component={Autenticar}/>
            <Stack.Screen name="Materias" component={Materias}/>
            <Stack.Screen name="Conteudo" component={Conteudo} />
            <Stack.Screen name="Documentacao" component={Documentacao} />
          </Stack.Navigator>
        </NavigationContainer>
  );
}
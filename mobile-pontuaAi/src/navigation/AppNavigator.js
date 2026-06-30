import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

import SobreScreen from '../screens/SobreScreen';
import InicioScreen from '../screens/InicioScreen';
import CadastroScreen from '../screens/CadastroScreen';
import RecuperarScreen from '../screens/RecuperarScreen';
import RedefinirScreen from '../screens/RedefinirScreen';
import CallbackScreen from '../screens/CallbackScreen';
import ConfirmarScreen from '../screens/ConfirmarScreen';
import MateriasScreen from '../screens/MateriasScreen';
import ConteudoScreen from '../screens/ConteudoScreen';
import PerguntasScreen from '../screens/PerguntasScreen';
import PerguntasProfScreen from '../screens/PerguntasProfScreen';
import ProvaScreen from '../screens/ProvaScreen';
import ProvaProfScreen from '../screens/ProvaProfScreen';
import RedacaoScreen from '../screens/RedacaoScreen';
import ContaAlunoScreen from '../screens/ContaAlunoScreen';
import ContaProfScreen from '../screens/ContaProfScreen';
import HistoricoScreen from '../screens/HistoricoScreen';
import HistoricoProfScreen from '../screens/HistoricoProfScreen';
import TurmasProfScreen from '../screens/TurmasProfScreen';
import DocProfScreen from '../screens/DocProfScreen';
import ResultadoProvaScreen from '../screens/ResultadoProvaScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { colors } = useTheme();
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        {/* Public screens */}
        <Stack.Screen name="Sobre" component={SobreScreen} />
        <Stack.Screen name="Inicio" component={InicioScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Recuperar" component={RecuperarScreen} />
        <Stack.Screen name="Redefinir" component={RedefinirScreen} />
        <Stack.Screen name="Callback" component={CallbackScreen} />
        <Stack.Screen name="Confirmar" component={ConfirmarScreen} />

        {/* Student screens */}
        <Stack.Screen name="Materias" component={MateriasScreen} />
        <Stack.Screen name="Conteudo" component={ConteudoScreen} />
        <Stack.Screen name="Perguntas" component={PerguntasScreen} />
        <Stack.Screen name="Prova" component={ProvaScreen} />
        <Stack.Screen name="Redacao" component={RedacaoScreen} />
        <Stack.Screen name="Historico" component={HistoricoScreen} />
        <Stack.Screen name="ContaAluno" component={ContaAlunoScreen} />
        <Stack.Screen name="ResultadoProva" component={ResultadoProvaScreen} />

        {/* Teacher screens */}
        <Stack.Screen name="DocProf" component={DocProfScreen} />
        <Stack.Screen name="PerguntasProf" component={PerguntasProfScreen} />
        <Stack.Screen name="ProvaProf" component={ProvaProfScreen} />
        <Stack.Screen name="TurmasProf" component={TurmasProfScreen} />
        <Stack.Screen name="HistoricoProf" component={HistoricoProfScreen} />
        <Stack.Screen name="ContaProf" component={ContaProfScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

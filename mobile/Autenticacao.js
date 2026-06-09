import { Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import Estilo from './styles/Estilo-autenticacao'; 
import * as LocalAuthentication from 'expo-local-authentication';
import { useState } from 'react';

export default function App({ navigation }) {
  const [autenticado, setAutenticado] = useState(false);

  async function verAutenticacao() {
    const biometriaPadrao = await LocalAuthentication.isEnrolledAsync();

    if (!biometriaPadrao) {
      return Alert.alert('Acesso', 'Nenhuma biometria encontrada');
    }

    const autenticacao = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Acesso com biometria',
    });

    setAutenticado(autenticacao.success);
    navigation.navigate('Materias');
  }

  return (
    <View style={Estilo.formulario}>
      <View style={Estilo.header}>
        <Image
          style={Estilo.logo}
          source={require('./assets/logo-completa.png')}
        />
        <Text style={Estilo.textGray}>Bem vindo de volta</Text>
      </View>

      <View>
        <Text style={Estilo.label}>E-mail</Text>
        <TextInput
          style={Estilo.input}
          placeholder="Digite seu e-mail"
        />

        <Text style={Estilo.label}>Senha</Text>
        <TextInput
          secureTextEntry={true}
          style={Estilo.input}
          placeholder="Digite sua senha"
        />
      </View>

      <View>
        <TouchableOpacity
          onPress={verAutenticacao}
          style={Estilo.botao}
        >
          <Text style={Estilo.botaoTexto}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { showToast } from '../components/Toast';

export default function RecuperarScreen({ navigation }) {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');

  function handleRecuperar() {
    if (!email) {
      showToast('Digite seu email', 'error');
      return;
    }
    showToast('Link de recuperação enviado para seu email!', 'success');
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 20 }}>
        <Text style={{ color: colors.primary, fontSize: 16 }}>Voltar</Text>
      </TouchableOpacity>

      <Image
        source={require('../../assets/logo-completa.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Recuperar senha</Text>
        <Text style={[styles.desc, { color: colors.textGray }]}>
          Digite seu email para receber um link de recuperação.
        </Text>

        <TextInput
          style={[styles.input, { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.borderColor }]}
          placeholder="Seu email"
          placeholderTextColor={colors.placeholder}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: colors.primary }]}
          onPress={handleRecuperar}
        >
          <Text style={styles.btnText}>Enviar link de recuperação</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Inicio')} style={{ marginTop: 16 }}>
          <Text style={{ color: colors.primary, textAlign: 'center' }}>Voltar para o login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  logo: { width: 160, height: 50, alignSelf: 'center', marginBottom: 30 },
  card: { padding: 24, borderRadius: 16, elevation: 4 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  desc: { fontSize: 14, marginBottom: 20, lineHeight: 20 },
  input: { padding: 14, borderRadius: 10, fontSize: 15, borderWidth: 1, marginBottom: 16 },
  btn: { padding: 16, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { validarSenha } from '../services/auth';
import { showToast } from '../components/Toast';

export default function RedefinirScreen({ navigation, route }) {
  const { colors } = useTheme();
  const token = route?.params?.token;
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const criteria = [
    { label: 'Pelo menos 8 caracteres', check: senha.length >= 8 },
    { label: 'Pelo menos 1 letra maiúscula', check: /[A-Z]/.test(senha) },
    { label: 'Pelo menos 1 letra minúscula', check: /[a-z]/.test(senha) },
    { label: 'Pelo menos 1 número', check: /[0-9]/.test(senha) },
    { label: 'Pelo menos 1 caractere especial', check: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(senha) },
  ];

  function handleRedefinir() {
    if (!senha || !confirmSenha) {
      showToast('Preencha todos os campos', 'error');
      return;
    }
    if (senha !== confirmSenha) {
      showToast('As senhas não conferem', 'error');
      return;
    }
    const erros = validarSenha(senha);
    if (erros.length > 0) {
      showToast('Senha não atende aos requisitos', 'error');
      return;
    }
    showToast('Senha redefinida com sucesso!', 'success');
    setTimeout(() => navigation.navigate('Inicio'), 2000);
  }

  if (!token) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', padding: 24 }]}>
        <Text style={{ color: colors.error, fontSize: 16, textAlign: 'center' }}>
          Link inválido ou expirado. Solicite uma nova recuperação de senha.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Recuperar')} style={{ marginTop: 20 }}>
          <Text style={{ color: colors.primary, textAlign: 'center' }}>Solicitar novo link</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={require('../../assets/logo-completa.png')} style={styles.logo} resizeMode="contain" />
      <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Redefinir senha</Text>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textGray }]}>Nova senha</Text>
          <View style={[styles.passwordContainer, { backgroundColor: colors.input, borderColor: colors.borderColor }]}>
            <TextInput
              style={[styles.passwordInput, { color: colors.textPrimary }]}
              placeholder="Nova senha"
              placeholderTextColor={colors.placeholder}
              secureTextEntry={!showSenha}
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity onPress={() => setShowSenha(!showSenha)} style={{ padding: 12 }}>
              <Text>{showSenha ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {senha.length > 0 && (
          <View style={styles.criteriaList}>
            {criteria.map((c, i) => (
              <View key={i} style={styles.criteriaItem}>
                <Text>{c.check ? '✅' : '⬜'}</Text>
                <Text style={[styles.criteriaText, { color: colors.textGray }]}>{c.label}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textGray }]}>Confirmar senha</Text>
          <View style={[styles.passwordContainer, { backgroundColor: colors.input, borderColor: colors.borderColor }]}>
            <TextInput
              style={[styles.passwordInput, { color: colors.textPrimary }]}
              placeholder="Repita a senha"
              placeholderTextColor={colors.placeholder}
              secureTextEntry={!showConfirm}
              value={confirmSenha}
              onChangeText={setConfirmSenha}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={{ padding: 12 }}>
              <Text>{showConfirm ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]} onPress={handleRedefinir}>
          <Text style={styles.btnText}>Redefinir senha</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24 },
  logo: { width: 160, height: 50, alignSelf: 'center', marginVertical: 30 },
  card: { padding: 24, borderRadius: 16, elevation: 4 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, marginBottom: 6, fontWeight: '500' },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 10, borderWidth: 1 },
  passwordInput: { flex: 1, padding: 14, fontSize: 15 },
  criteriaList: { marginBottom: 16, gap: 4 },
  criteriaItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  criteriaText: { fontSize: 12 },
  btn: { padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

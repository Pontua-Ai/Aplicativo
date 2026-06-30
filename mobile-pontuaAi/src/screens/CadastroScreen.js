import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform, Image
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { signup, validarSenha } from '../services/auth';
import { showToast } from '../components/Toast';

export default function CadastroScreen({ navigation }) {
  const { colors, isDark, toggleTheme } = useTheme();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordErrors = validarSenha(senha);

  const criteria = [
    { label: 'Pelo menos 8 caracteres', check: senha.length >= 8 },
    { label: 'Pelo menos 1 letra maiúscula', check: /[A-Z]/.test(senha) },
    { label: 'Pelo menos 1 letra minúscula', check: /[a-z]/.test(senha) },
    { label: 'Pelo menos 1 número', check: /[0-9]/.test(senha) },
    { label: 'Pelo menos 1 caractere especial', check: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(senha) },
  ];

  async function handleCadastro() {
    if (!username || !email || !senha || !confirmSenha) {
      showToast('Preencha todos os campos', 'error');
      return;
    }
    if (senha !== confirmSenha) {
      showToast('As senhas não conferem', 'error');
      return;
    }
    if (passwordErrors.length > 0) {
      showToast('Senha não atende aos requisitos', 'error');
      return;
    }
    setLoading(true);
    const result = await signup(username, email, senha);
    setLoading(false);
    if (result.success) {
      showToast('Cadastro realizado! Verifique seu email.', 'success');
      navigation.navigate('Callback', { email });
    } else {
      showToast(result.error, 'error');
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.header, { borderBottomColor: colors.borderColor }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: colors.primary, fontSize: 16 }}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleTheme}>
            <Text style={{ fontSize: 20 }}>{isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.formCard, { backgroundColor: colors.cardBg }]}>
          <View style={styles.logoSection}>
            <Image
              source={require('../../assets/logo-completa.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.formTitle, { color: colors.textPrimary }]}>Criar conta</Text>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textGray }]}>Nome de usuário</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.borderColor }]}
              placeholder="Seu nome de usuário"
              placeholderTextColor={colors.placeholder}
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textGray }]}>Email institucional</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.borderColor }]}
              placeholder="@cps.sp.gov.br ou @aluno.cps.sp.gov.br"
              placeholderTextColor={colors.placeholder}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textGray }]}>Senha</Text>
            <View style={[styles.passwordContainer, { backgroundColor: colors.input, borderColor: colors.borderColor }]}>
              <TextInput
                style={[styles.passwordInput, { color: colors.textPrimary }]}
                placeholder="Crie uma senha"
                placeholderTextColor={colors.placeholder}
                secureTextEntry={!showSenha}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity onPress={() => setShowSenha(!showSenha)} style={styles.eyeBtn}>
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
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeBtn}>
                <Text>{showConfirm ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.submitBtn, { backgroundColor: colors.primary, opacity: loading ? 0.7 : 1 }]}
            onPress={handleCadastro}
            disabled={loading}
          >
            <Text style={styles.submitBtnText}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ marginTop: 20, marginBottom: 40 }}
          onPress={() => navigation.navigate('Inicio')}
        >
          <Text style={{ color: colors.textGray, textAlign: 'center' }}>
            Já tem conta? <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Entrar</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 12, borderBottomWidth: 1, marginBottom: 20 },
  logoSection: { alignItems: 'center', marginBottom: 10 },
  logo: { width: 150, height: 50 },
  formCard: { padding: 24, borderRadius: 16, elevation: 4 },
  formTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, marginBottom: 6, fontWeight: '500' },
  input: { padding: 14, borderRadius: 10, fontSize: 15, borderWidth: 1 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 10, borderWidth: 1 },
  passwordInput: { flex: 1, padding: 14, fontSize: 15 },
  eyeBtn: { padding: 12 },
  criteriaList: { marginBottom: 16, gap: 4 },
  criteriaItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  criteriaText: { fontSize: 12 },
  submitBtn: { padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  submitBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

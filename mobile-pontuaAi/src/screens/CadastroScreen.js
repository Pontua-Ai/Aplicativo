import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform, Image
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { signup, validarSenha } from '../services/auth';
import { showToast } from '../components/Toast';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';


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
            <Text style={{ fontSize: 20 }}>{isDark ? <Fontisto name="day-sunny" size={24} color="white" />: <Ionicons name="moon-outline" size={24} color="black" />}</Text>
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
          <Text style={[styles.formTitle ]}>Aprender ficou mais fácil</Text>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Nome de usuário</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.borderColor }]}
              placeholder="Como podemos te chamar?"
              placeholderTextColor={colors.placeholder}
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>E-mail institucional</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.borderColor }]}
              placeholder="Digite seu e-mail institucional"
              placeholderTextColor={colors.placeholder}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Senha</Text>
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
                <Text>{showSenha ? <Ionicons name="eye-outline" size={18} color={colors.textGray} /> : <Ionicons name="eye-off-outline" size={18} color={colors.textGray} />}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {senha.length > 0 && (
            <View style={styles.criteriaList}>
              {criteria.map((c, i) => (
                <View key={i} style={styles.criteriaItem}>
                  <Text>{c.check ? <Feather name="check-square" size={15} color="white" /> : <Feather name="square" size={15} color="white" />}</Text>
                  <Text style={[styles.criteriaText, { color: colors.textGray }]}>{c.label}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Confirmar senha</Text>
            <View style={[styles.passwordContainer, { backgroundColor: colors.input, borderColor: colors.borderColor }]}>
              <TextInput
                style={[styles.passwordInput, { color: colors.textPrimary }]}
                placeholder="confirme sua senha"
                placeholderTextColor={colors.placeholder}
                secureTextEntry={!showConfirm}
                value={confirmSenha}
                onChangeText={setConfirmSenha}
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeBtn}>
                <Text>{showConfirm ? <Ionicons name="eye-outline" size={18} color={colors.textGray} /> : <Ionicons name="eye-off-outline" size={18} color={colors.textGray} />}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.submitBtn, { backgroundColor: colors.primary, opacity: loading ? 0.7 : 1 }]}
            onPress={handleCadastro}
            disabled={loading}
          >
            <Text style={styles.submitBtnText}>
              {loading ? 'Cadastrando...' : 'Cadastrar →'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ marginTop: 20, marginBottom: 40 }}
          onPress={() => navigation.navigate('Inicio')}
        >
          <Text style={{ color: colors.textGray, textAlign: 'center' }}>
            Já possui conta? <Text style={{ color: colors.tertiary, fontWeight: 'bold' }}>Entre aqui</Text>
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
  formTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#B9B5B5', alignContent: 'center', textAlign: 'center' },
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

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform, Image
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { loginUsuario } from '../services/auth';
import { showToast } from '../components/Toast';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function InicioScreen({ navigation }) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!login || !senha) {
      showToast('Preencha todos os campos', 'error');
      return;
    }
    setLoading(true);
    const result = await loginUsuario(login, senha);
    setLoading(false);
    if (result.success) {
      await signIn(result.user);
      showToast('Login realizado com sucesso!', 'success');
      if (result.user.tipo_conta === 'professor') {
        navigation.reset({ index: 0, routes: [{ name: 'DocProf' }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'Materias' }] });
      }
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
          <TouchableOpacity onPress={toggleTheme}>
            <Text style={{ fontSize: 20 }}>{isDark ? <Ionicons name="sunny-outline" size={24} color="white" /> : <Ionicons name="moon-outline" size={24} color="black" />}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.logoSection}>
          <Image
            source={require('../../assets/logo-completa.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.slogan, { color: colors.textGray }]}>
            Estude, pratique e evolua com o PontuaAI
          </Text>
        </View>

        {/* Login Form */}
        <View style={[styles.formCard, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.formTitle, { color: colors.textPrimary }]}>Entrar</Text>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textGray }]}>Email ou usuário</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.borderColor }]}
              placeholder="Digite seu email ou usuário"
              placeholderTextColor={colors.placeholder}
              value={login}
              onChangeText={setLogin}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textGray }]}>Senha</Text>
            <View style={[styles.passwordContainer, { backgroundColor: colors.input, borderColor: colors.borderColor }]}>
              <TextInput
                style={[styles.passwordInput, { color: colors.textPrimary }]}
                placeholder="Digite sua senha"
                placeholderTextColor={colors.placeholder}
                secureTextEntry={!showPassword}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.submitBtn, { backgroundColor: colors.primary, opacity: loading ? 0.7 : 1 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.submitBtnText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Recuperar')} style={{ marginTop: 12 }}>
            <Text style={{ color: colors.primary, textAlign: 'center', fontSize: 14 }}>
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ marginTop: 20, marginBottom: 40 }}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={{ color: colors.textGray, textAlign: 'center' }}>
            Não tem conta? <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 12, borderBottomWidth: 1, marginBottom: 20 },
  logoSection: { alignItems: 'center', marginBottom: 30 },
  logo: { width: 180, height: 60 },
  slogan: { fontSize: 14, marginTop: 10, textAlign: 'center' },
  formCard: { padding: 24, borderRadius: 16, elevation: 4 },
  formTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, marginBottom: 6, fontWeight: '500' },
  input: { padding: 14, borderRadius: 10, fontSize: 15, borderWidth: 1 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 10, borderWidth: 1 },
  passwordInput: { flex: 1, padding: 14, fontSize: 15 },
  eyeBtn: { padding: 12 },
  submitBtn: { padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  submitBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

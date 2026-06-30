import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function CallbackScreen({ navigation, route }) {
  const { colors } = useTheme();
  const email = route?.params?.email || '';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={require('../../assets/logo-completa.png')} style={styles.logo} resizeMode="contain" />
      <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
        <Text style={{ fontSize: 40, textAlign: 'center', marginBottom: 10 }}>📧</Text>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Verifique seu email</Text>
        <Text style={[styles.desc, { color: colors.textGray }]}>
          Enviamos um link de confirmação para:
        </Text>
        <Text style={[styles.email, { color: colors.primary }]}>{email}</Text>
        <Text style={[styles.desc, { color: colors.textGray }]}>
          Clique no link para ativar sua conta.
        </Text>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('Inicio')}
        >
          <Text style={styles.btnText}>Voltar para o início</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  logo: { width: 160, height: 50, alignSelf: 'center', marginBottom: 30 },
  card: { padding: 24, borderRadius: 16, elevation: 4, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  desc: { fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 8 },
  email: { fontSize: 16, fontWeight: 'bold', marginBottom: 16 },
  btn: { padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 16, width: '100%' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

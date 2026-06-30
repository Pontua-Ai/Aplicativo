import React, { useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { SUPABASE_URL, SUPABASE_KEY } from '../config/constants';

export default function ConfirmarScreen({ navigation, route }) {
  const { colors } = useTheme();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const token = route?.params?.token;
    if (!token) {
      navigation.replace('Inicio', { erro: 'Token inválido' });
      return;
    }

    async function confirm() {
      try {
        const functionUrl = SUPABASE_URL.replace(/\/+$/, '') + '/functions/v1/confirm-email';
        const response = await fetch(functionUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', apikey: SUPABASE_KEY },
          body: JSON.stringify({ token }),
        });
        const data = await response.json();
        if (data.success) {
          navigation.replace('Inicio', { confirmado: 'true' });
        } else {
          navigation.replace('Inicio', { erro: data.error || 'Erro ao confirmar' });
        }
      } catch {
        navigation.replace('Inicio', { erro: 'Erro de conexão' });
      }
    }

    confirm();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={[styles.text, { color: colors.textPrimary }]}>Confirmando seu email...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
  text: { fontSize: 16 },
});

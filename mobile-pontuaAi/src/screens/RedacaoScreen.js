import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { OPENROUTER_API_KEY } from '../config/constants';
import { showToast } from '../components/Toast';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const VESTIBULAR_TYPES = ['ENEM', 'VUNESP', 'FUVEST', 'UNICAMP', 'ITA/IME'];

export default function RedacaoScreen({ navigation }) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [vestibular, setVestibular] = useState('ENEM');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);

  async function handleAvaliar() {
    if (!titulo.trim()) {
      showToast('Digite um título para a redação', 'error');
      return;
    }
    if (texto.length < 500) {
      showToast('A redação deve ter pelo menos 500 caracteres', 'error');
      return;
    }
    setLoading(true);
    setResultado(null);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: `Você é um corretor de redações do vestibular ${vestibular}. Avalie a redação do aluno seguindo as 5 competências do ENEM. Dê uma nota de 0-200 para cada competência e um feedback detalhado.` },
            { role: 'user', content: `Título: ${titulo}\n\nRedação:\n${texto}` },
          ],
        }),
      });

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content || 'Erro ao avaliar.';
      setResultado(content);
    } catch (e) {
      showToast('Erro ao avaliar redação', 'error');
    }
    setLoading(false);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StudentHeader navigation={navigation} colors={colors} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.primary }]}>Redação</Text>

        <View style={[styles.infoCard, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
          <Text style={[styles.infoText, { color: colors.textGray }]}>
            Escreva sua redação e o PONT irá corrigir seguindo as 5 competências do ENEM.
          </Text>
        </View>

        <TextInput
          style={[styles.input, { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.borderColor }]}
          placeholder="Título da redação"
          placeholderTextColor={colors.placeholder}
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={[styles.label, { color: colors.textGray }]}>Tipo de vestibular</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          {VESTIBULAR_TYPES.map((v) => (
            <TouchableOpacity
              key={v}
              style={[styles.vestBtn, { borderColor: colors.borderColor }, vestibular === v && { backgroundColor: colors.primary, borderColor: colors.primary }]}
              onPress={() => setVestibular(v)}
            >
              <Text style={{ color: vestibular === v ? '#fff' : colors.textGray, fontSize: 13, fontWeight: '600' }}>{v}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TextInput
          style={[styles.textArea, { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.borderColor }]}
          placeholder="Digite sua redação aqui... (mínimo 500 caracteres)"
          placeholderTextColor={colors.placeholder}
          multiline
          value={texto}
          onChangeText={setTexto}
        />

        <Text style={[styles.charCount, { color: colors.textGray }]}>
          {texto.length} caracteres {texto.length < 500 ? `(faltam ${500 - texto.length})` : <MaterialCommunityIcons name="check" size={14} color={colors.textGray} />}
        </Text>

        <TouchableOpacity
          style={[styles.avaliarBtn, { backgroundColor: colors.primary, opacity: loading ? 0.7 : 1 }]}
          onPress={handleAvaliar}
          disabled={loading}
        >
          <Text style={styles.avaliarBtnText}>{loading ? 'Avaliando...' : 'Avaliar redação'}</Text>
        </TouchableOpacity>

        {resultado && (
          <View style={[styles.resultCard, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
            <Text style={[styles.resultTitle, { color: colors.textPrimary }]}>Resultado da correção</Text>
            <Text style={[styles.resultText, { color: colors.textPrimary }]}>{resultado}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function StudentHeader({ navigation, colors }) {
  const tabs = ['Matérias', 'Conteúdos', 'Prova', 'Redação', 'Histórico', 'Conta'];
  return (
    <View style={[styles.header, { backgroundColor: colors.cardBg, borderBottomColor: colors.borderColor }]}>
      <Image source={require('../../assets/cabeca-header.png')} style={styles.headerLogo} resizeMode="contain" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tabs.map((tab) => (
          <TouchableOpacity key={tab} style={styles.headerTab}>
            <Text style={{ color: colors.textGray, fontSize: 13 }}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1 },
  headerLogo: { width: 30, height: 30, marginRight: 8 },
  headerTab: { paddingHorizontal: 10, paddingVertical: 6 },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  infoCard: { padding: 16, borderRadius: 10, borderWidth: 1, marginBottom: 16 },
  infoText: { fontSize: 14, lineHeight: 20 },
  input: { padding: 14, borderRadius: 10, borderWidth: 1, fontSize: 15, marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '500', marginBottom: 8 },
  vestBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1, marginRight: 8 },
  textArea: { padding: 14, borderRadius: 10, borderWidth: 1, minHeight: 200, fontSize: 15, textAlignVertical: 'top' },
  charCount: { fontSize: 12, textAlign: 'right', marginTop: 4, marginBottom: 16 },
  avaliarBtn: { padding: 16, borderRadius: 12, alignItems: 'center' },
  avaliarBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resultCard: { padding: 20, borderRadius: 12, borderWidth: 1, marginTop: 24, elevation: 2 },
  resultTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  resultText: { fontSize: 14, lineHeight: 22 },
});

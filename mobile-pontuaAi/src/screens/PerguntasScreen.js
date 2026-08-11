import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import supabaseClient from '../config/supabase';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import StudentHeader from '../components/StudentHeader';

export default function PerguntasScreen({ navigation, route }) {
  const { colors } = useTheme();
  const materia = route?.params?.materia;
  const conteudo = route?.params?.conteudo;
  const [pergunta, setPergunta] = useState(null);
  const [alternativas, setAlternativas] = useState([]);
  const [selected, setSelected] = useState(null);
  const [respondida, setRespondida] = useState(false);
  const [pontos, setPontos] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (conteudo) loadPergunta();
  }, [conteudo]);

  async function loadPergunta() {
    setLoading(true);
    setSelected(null);
    setRespondida(false);
    const { data: perguntas } = await supabaseClient
      .from('perguntas')
      .select('*')
      .eq('id_conteudo', conteudo?.id_conteudo || conteudo?.id)
      .limit(1);

    if (perguntas && perguntas.length > 0) {
      setPergunta(perguntas[0]);
      const { data: alts } = await supabaseClient
        .from('alternativa')
        .select('*')
        .eq('id_pergunta', perguntas[0].id_pergunta || perguntas[0].id);
      setAlternativas(alts || []);
    }
    setLoading(false);
  }

  function verificar(index) {
    if (respondida) return;
    setSelected(index);
    setRespondida(true);
    const alt = alternativas[index];
    if (alt?.correta) {
      setPontos(p => p + 1);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StudentHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoRow}>
          <View style={[styles.cronometro, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
            <Text style={{ color: colors.textGray }}><MaterialCommunityIcons name="timer-outline" size={16} color={colors.textGray} /> 00:00</Text>
          </View>
          <Text style={[styles.pontos, { color: colors.primary }]}><Ionicons name="star" size={14} color={colors.starColor} /> {pontos}</Text>
        </View>

        {loading ? (
          <Text style={{ color: colors.textGray, textAlign: 'center', marginTop: 40 }}>Carregando...</Text>
        ) : !pergunta ? (
          <Text style={{ color: colors.textGray, textAlign: 'center', marginTop: 40 }}>
            Nenhuma pergunta disponível para este conteúdo.
          </Text>
        ) : (
          <>
            <View style={[styles.perguntaCard, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
              <Text style={[styles.perguntaText, { color: colors.textPrimary }]}>
                {pergunta.pergunta_texto}
              </Text>
            </View>

            <View style={styles.alternativas}>
              {alternativas.map((alt, index) => {
                let borderColor = colors.borderColor;
                let bgColor = colors.cardBg;
                if (respondida) {
                  if (alt.correta) {
                    borderColor = colors.success;
                    bgColor = 'rgba(76, 175, 80, 0.1)';
                  } else if (selected === index) {
                    borderColor = colors.error;
                    bgColor = 'rgba(244, 67, 54, 0.1)';
                  }
                } else if (selected === index) {
                  borderColor = colors.primary;
                }

                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.alternativa, { borderColor, backgroundColor: bgColor }]}
                    onPress={() => verificar(index)}
                    disabled={respondida}
                  >
                    <Text style={[styles.altLabel, { color: colors.textPrimary }]}>
                      {String.fromCharCode(65 + index)}.
                    </Text>
                    <Text style={[styles.altText, { color: colors.textPrimary }]}>
                      {alt.nome_alternativa}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={[styles.nextBtn, { backgroundColor: colors.primary }]}
              onPress={loadPergunta}
            >
              <Text style={styles.nextBtnText}>Próxima pergunta</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  cronometro: { padding: 10, borderRadius: 8, borderWidth: 1 },
  pontos: { fontSize: 18, fontWeight: 'bold' },
  perguntaCard: { padding: 20, borderRadius: 12, borderWidth: 1, marginBottom: 20, elevation: 2 },
  perguntaText: { fontSize: 16, lineHeight: 24 },
  alternativas: { gap: 12 },
  alternativa: {
    flexDirection: 'row', padding: 16, borderRadius: 10,
    borderWidth: 1.5, alignItems: 'center', gap: 10,
  },
  altLabel: { fontSize: 16, fontWeight: 'bold' },
  altText: { fontSize: 15, flex: 1 },
  nextBtn: { padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 24 },
  nextBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

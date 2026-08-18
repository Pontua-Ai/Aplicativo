import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import supabaseClient from '../config/supabase';
import Ionicons from '@expo/vector-icons/Ionicons';
import TeacherHeader from '../components/TeacherHeader';

export default function ProvaProfScreen({ navigation }) {
  const { colors } = useTheme();
  const [materias, setMaterias] = useState([]);
  const [conteudos, setConteudos] = useState([]);
  const [materiaId, setMateriaId] = useState('');
  const [conteudoId, setConteudoId] = useState('');
  const [perguntas, setPerguntas] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    loadMaterias();
  }, []);

  async function loadMaterias() {
    const { data } = await supabaseClient.from('materia').select('*');
    if (data) setMaterias(data);
  }

  async function loadPerguntas() {
    let query = supabaseClient.from('perguntas').select('*, alternativa(*)');
    if (conteudoId) query = query.eq('id_conteudo', conteudoId);
    else if (materiaId) query = query.eq('id_materia', materiaId);
    const { data } = await query;
    if (data) setPerguntas(data);
  }

  useEffect(() => {
    if (materiaId || conteudoId) loadPerguntas();
  }, [materiaId, conteudoId]);

  function toggleSelect(id) {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TeacherHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.primary }]}>Criar Prova</Text>

        <View style={styles.filters}>
          <TouchableOpacity style={[styles.filterBtn, { backgroundColor: colors.input, borderColor: colors.borderColor }]}>
            <Text style={{ color: colors.textGray }}>{materiaId ? 'Matéria selecionada' : 'Matéria'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterBtn, { backgroundColor: colors.input, borderColor: colors.borderColor }]}>
            <Text style={{ color: colors.textGray }}>{conteudoId ? 'Conteúdo selecionado' : 'Conteúdo'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${Object.keys(selected).filter(k => selected[k]).length * 10}%`, backgroundColor: colors.primary }]} />
        </View>

        <Text style={[styles.selectedCount, { color: colors.textGray }]}>
          {Object.keys(selected).filter(k => selected[k]).length} perguntas selecionadas
        </Text>

        <TouchableOpacity
          style={[styles.selectAll, { borderColor: colors.borderColor }]}
          onPress={() => {
            const all = {};
            perguntas.forEach(p => { all[p.id_pergunta || p.id] = true; });
            setSelected(all);
          }}
        >
          <Text style={{ color: colors.primary }}>Selecionar todas</Text>
        </TouchableOpacity>

        {perguntas.map((p) => (
          <TouchableOpacity
            key={p.id_pergunta || p.id}
            style={[styles.perguntaCard, { backgroundColor: colors.cardBg, borderColor: selected[p.id_pergunta || p.id] ? colors.primary : colors.borderColor }]}
            onPress={() => toggleSelect(p.id_pergunta || p.id)}
          >
            <View style={styles.checkbox}>
              {selected[p.id_pergunta || p.id] && <Ionicons name="checkmark" size={16} color={colors.primary} />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.perguntaText, { color: colors.textPrimary }]} numberOfLines={2}>
                {p.pergunta_texto}
              </Text>
              <Text style={{ color: colors.textGray, fontSize: 12, marginTop: 4 }}>
                {(p.alternativa || []).length} alternativas
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  filters: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  filterBtn: { flex: 1, padding: 14, borderRadius: 10, borderWidth: 1 },
  progressBar: { height: 6, backgroundColor: '#ddd', borderRadius: 3, marginBottom: 8 },
  progressFill: { height: 6, borderRadius: 3 },
  selectedCount: { fontSize: 13, marginBottom: 12 },
  selectAll: { padding: 12, borderRadius: 8, borderWidth: 1, alignItems: 'center', marginBottom: 16 },
  perguntaCard: {
    flexDirection: 'row', padding: 14, borderRadius: 10, borderWidth: 1,
    marginBottom: 8, alignItems: 'center', gap: 12,
  },
  checkbox: { width: 24, height: 24, borderRadius: 4, borderWidth: 2, borderColor: '#ddd', alignItems: 'center', justifyContent: 'center' },
  perguntaText: { fontSize: 14 },
});

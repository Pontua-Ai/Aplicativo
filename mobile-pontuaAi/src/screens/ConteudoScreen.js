import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import supabaseClient from '../config/supabase';
import { getImage } from '../config/images';
import Ionicons from '@expo/vector-icons/Ionicons';
import StudentHeader from '../components/StudentHeader';

export default function ConteudoScreen({ navigation, route }) {
  const { colors } = useTheme();
  const materia = route?.params?.materia;
  const [search, setSearch] = useState('');
  const [conteudos, setConteudos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMaterias();
    loadConteudos();
  }, [materia?.id]);

  async function loadMaterias() {
    const { data } = await supabaseClient.from('materia').select('*');
    if (data) setMaterias(data);
  }

  async function loadConteudos() {
    setLoading(true);
    let query = supabaseClient.from('conteudo').select('*');
    if (materia?.id) query = query.eq('id_materia', materia.id);
    const { data } = await query;
    if (data) setConteudos(data);
    setLoading(false);
  }

  function materiaNome(id) {
    const m = materias.find((m) => (m.id_materia || m.id) == id);
    return m?.nome_materia || m?.name || '';
  }

  const filtered = conteudos.filter(c =>
    c.nome_conteudo?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StudentHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleRow}>
          {materia && <Image source={getImage(materia.icon)} style={styles.materiaIcon} resizeMode="contain" />}
          <Text style={[styles.title, { color: colors.primary }]}>
            {materia?.name || 'Conteúdos'}
          </Text>
        </View>

        <View style={[styles.searchBar, { backgroundColor: colors.input, borderColor: colors.borderColor }]}>
          <Ionicons name="search" size={18} color={colors.textPrimary} />
          <TextInput
            style={[styles.searchInput, { color: colors.textPrimary }]}
            placeholder="Pesquisar conteúdo..."
            placeholderTextColor={colors.placeholder}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close" size={18} color={colors.textGray} />
            </TouchableOpacity>
          )}
        </View>

        {loading ? (
          <Text style={{ color: colors.textGray, textAlign: 'center', marginTop: 40 }}>Carregando...</Text>
        ) : filtered.length === 0 ? (
          <Text style={{ color: colors.textGray, textAlign: 'center', marginTop: 40 }}>
            Nenhum conteúdo encontrado
          </Text>
        ) : (
          <View style={styles.list}>
            {filtered.map((c) => (
              <TouchableOpacity
                key={c.id_conteudo || c.id}
                style={[styles.conteudoCard, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}
                onPress={() => navigation.navigate('Perguntas', { conteudo: c, materia })}
              >
                <Text style={[styles.conteudoTitle, { color: colors.textPrimary }]}>{c.nome_conteudo}</Text>
                {!materia && (
                  <Text style={[styles.conteudoSubtitle, { color: colors.textGray }]}>
                    {materiaNome(c.id_materia)}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 12 },
  materiaIcon: { width: 40, height: 40 },
  title: { fontSize: 22, fontWeight: 'bold' },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', padding: 10,
    borderRadius: 10, borderWidth: 1, marginBottom: 16,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15 },
  list: { gap: 12 },
  conteudoCard: {
    padding: 16, borderRadius: 12, borderWidth: 1, elevation: 2,
  },
  conteudoTitle: { fontSize: 16, fontWeight: '600' },
  conteudoSubtitle: { fontSize: 13, marginTop: 4 },
});

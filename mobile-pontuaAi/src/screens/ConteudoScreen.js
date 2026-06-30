import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import supabaseClient from '../config/supabase';
import { getImage } from '../config/images';
import { showToast } from '../components/Toast';

export default function ConteudoScreen({ navigation, route }) {
  const { colors } = useTheme();
  const materia = route?.params?.materia;
  const [search, setSearch] = useState('');
  const [conteudos, setConteudos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConteudos();
  }, []);

  async function loadConteudos() {
    setLoading(true);
    const { data, error } = await supabaseClient
      .from('conteudo')
      .select('*')
      .eq('id_materia', materia?.id);
    if (data) setConteudos(data);
    setLoading(false);
  }

  const filtered = conteudos.filter(c =>
    c.titulo?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StudentHeader navigation={navigation} colors={colors} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleRow}>
          {materia && <Image source={getImage(materia.icon)} style={styles.materiaIcon} resizeMode="contain" />}
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            {materia?.name || 'Conteúdos'}
          </Text>
        </View>

        <View style={[styles.searchBar, { backgroundColor: colors.input, borderColor: colors.borderColor }]}>
          <Text style={{ fontSize: 16 }}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: colors.textPrimary }]}
            placeholder="Pesquisar conteúdo..."
            placeholderTextColor={colors.placeholder}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={{ color: colors.textGray, fontSize: 18 }}>✕</Text>
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
                <Text style={[styles.conteudoTitle, { color: colors.textPrimary }]}>{c.titulo}</Text>
                <Text style={{ color: colors.textGray, fontSize: 12, marginTop: 4 }}>
                  {c.descricao || ''}
                </Text>
              </TouchableOpacity>
            ))}
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
});

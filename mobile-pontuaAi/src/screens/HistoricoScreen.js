import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';

const MOCK_HISTORICO = [
  { id: 1, title: 'Redação ENEM 2024', type: 'Redação', date: '15/03/2024', points: 920, desc: 'Redação sobre educação no Brasil' },
  { id: 2, title: 'Matemática - Funções', type: 'Atividade', date: '14/03/2024', points: 8, desc: '10 questões de funções' },
  { id: 3, title: 'Português - Interpretação', type: 'Atividade', date: '13/03/2024', points: 7, desc: '5 questões de interpretação textual' },
];

export default function HistoricoScreen({ navigation }) {
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Todas');

  const filtered = MOCK_HISTORICO.filter(h => {
    const matchSearch = h.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'Todas' || h.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StudentHeader navigation={navigation} colors={colors} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Histórico</Text>

        <TextInput
          style={[styles.searchInput, { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.borderColor }]}
          placeholder="Pesquisar por tema..."
          placeholderTextColor={colors.placeholder}
          value={search}
          onChangeText={setSearch}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          {['Todas', 'Redação', 'Atividade'].map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, { borderColor: colors.borderColor }, filter === f && { backgroundColor: colors.primary, borderColor: colors.primary }]}
              onPress={() => setFilter(f)}
            >
              <Text style={{ color: filter === f ? '#fff' : colors.textGray, fontSize: 13 }}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filtered.map((h) => (
          <View key={h.id} style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>{h.title}</Text>
                <Text style={[styles.cardDate, { color: colors.textGray }]}>{h.date}</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: h.type === 'Redação' ? colors.accentOrange : colors.primary }]}>
                <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>{h.type}</Text>
              </View>
            </View>
            <Text style={[styles.cardDesc, { color: colors.textGray }]}>{h.desc}</Text>
            <View style={styles.cardFooter}>
              <Text style={[styles.cardPoints, { color: colors.primary }]}><Ionicons name="star" size={14} color={colors.starColor} /> {h.points} pts</Text>
              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.actionBtn}><Ionicons name="eye-outline" size={18} color={colors.textGray} /></TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}><Ionicons name="pencil-outline" size={18} color={colors.textGray} /></TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
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
  searchInput: { padding: 12, borderRadius: 10, borderWidth: 1, fontSize: 14, marginBottom: 12 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, marginRight: 8 },
  card: { padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 12, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardDate: { fontSize: 12, marginTop: 2 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start' },
  cardDesc: { fontSize: 13, marginBottom: 8 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardPoints: { fontSize: 14, fontWeight: '600' },
  cardActions: { flexDirection: 'row', gap: 8 },
  actionBtn: { padding: 4 },
});

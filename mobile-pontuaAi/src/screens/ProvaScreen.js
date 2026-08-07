import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { getImage } from '../config/images';
import { SUBJECTS } from '../config/constants';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const PROVA_TYPES = [
  { title: 'Prova por matéria', desc: '10 questões por matéria', icon: <MaterialCommunityIcons name="book-open-variant" size={32} color="black" />, type: 'materia' },
  { title: 'Prova Geral', desc: '20 questões de todas as matérias', icon: <MaterialCommunityIcons name="clipboard-text-outline" size={32} color="black" />, type: 'geral' },
  { title: 'Simulado ENEM', desc: '60 questões, 5 horas de duração', icon: <MaterialCommunityIcons name="target" size={32} color="black" />, type: 'enem' },
];

export default function ProvaScreen({ navigation }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StudentHeader navigation={navigation} colors={colors} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.primary }]}>Prova</Text>
        <Text style={[styles.desc, { color: colors.textGray }]}>
          Escolha o tipo de prova que deseja fazer:
        </Text>

        {PROVA_TYPES.map((pt, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.provaCard, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}
            onPress={() => navigation.navigate('Perguntas', { provaType: pt.type })}
          >
            <Text style={{ fontSize: 32, marginBottom: 8 }}>{pt.icon}</Text>
            <Text style={[styles.provaTitle, { color: colors.textPrimary }]}>{pt.title}</Text>
            <Text style={[styles.provaDesc, { color: colors.textGray }]}>{pt.desc}</Text>
          </TouchableOpacity>
        ))}

        <Text style={[styles.subtitle, { color: colors.textPrimary, marginTop: 24 }]}>
          Provas por matéria
        </Text>
        <View style={styles.grid}>
          {SUBJECTS.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={[styles.subjectCard, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}
              onPress={() => navigation.navigate('Perguntas', { materia: m, provaType: 'materia' })}
            >
              <Image source={getImage(m.icon)} style={styles.subjectIcon} resizeMode="contain" />
              <Text style={[styles.subjectLabel, { color: colors.textPrimary }]}>{m.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  desc: { fontSize: 14, marginBottom: 20 },
  provaCard: { padding: 20, borderRadius: 12, borderWidth: 1, marginBottom: 12, elevation: 2 },
  provaTitle: { fontSize: 16, fontWeight: 'bold' },
  provaDesc: { fontSize: 13, marginTop: 4 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  subjectCard: {
    width: '30%', aspectRatio: 1, borderRadius: 12, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center', padding: 8,
  },
  subjectIcon: { width: 40, height: 40, marginBottom: 6 },
  subjectLabel: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
});

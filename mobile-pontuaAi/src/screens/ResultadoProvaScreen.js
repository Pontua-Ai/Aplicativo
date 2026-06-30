import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function ResultadoProvaScreen({ navigation, route }) {
  const { colors } = useTheme();
  const result = route?.params?.result;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StudentHeader navigation={navigation} colors={colors} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.resultCard, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Resultado</Text>
          <View style={styles.scoreContainer}>
            <Text style={[styles.score, { color: colors.primary }]}>
              {result?.acertos || 0}/{result?.total || 0}
            </Text>
            <Text style={[styles.scoreLabel, { color: colors.textGray }]}>Questões corretas</Text>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: colors.success }]}>{result?.acertos || 0}</Text>
              <Text style={[styles.statLabel, { color: colors.textGray }]}>Acertos</Text>
            </View>
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: colors.error }]}>{result?.erros || 0}</Text>
              <Text style={[styles.statLabel, { color: colors.textGray }]}>Erros</Text>
            </View>
          </View>
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
  resultCard: { borderRadius: 16, padding: 24, alignItems: 'center', elevation: 4 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  scoreContainer: { alignItems: 'center', marginBottom: 24 },
  score: { fontSize: 48, fontWeight: 'bold' },
  scoreLabel: { fontSize: 14, marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 40 },
  stat: { alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold' },
  statLabel: { fontSize: 13, marginTop: 4 },
});

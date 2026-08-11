import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import StudentHeader from '../components/StudentHeader';

export default function ResultadoProvaScreen({ navigation, route }) {
  const { colors } = useTheme();
  const result = route?.params?.result;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StudentHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.resultCard, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.title, { color: colors.primary }]}>Resultado</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1 },
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

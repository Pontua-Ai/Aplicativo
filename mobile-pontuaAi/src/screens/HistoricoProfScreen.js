import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import TeacherHeader from '../components/TeacherHeader';

export default function HistoricoProfScreen({ navigation }) {
  const { colors } = useTheme();
  const [search, setSearch] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TeacherHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.primary }]}>Histórico</Text>

        <TextInput
          style={[styles.searchInput, { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.borderColor }]}
          placeholder="Pesquisar por tema..."
          placeholderTextColor={colors.placeholder}
          value={search}
          onChangeText={setSearch}
        />

        <View id="historicoContainer">
          <Text style={{ color: colors.textGray, textAlign: 'center', marginTop: 40 }}>
            Nenhum histórico disponível.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  searchInput: { padding: 12, borderRadius: 10, borderWidth: 1, fontSize: 14, marginBottom: 12 },
});

import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function HistoricoProfScreen({ navigation }) {
  const { colors } = useTheme();
  const [search, setSearch] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TeacherHeader navigation={navigation} colors={colors} />
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

function TeacherHeader({ navigation, colors }) {
  const tabs = ['Doc', 'Perguntas', 'Prova', 'Turmas', 'Histórico', 'Conta'];
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
});

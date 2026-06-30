import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import supabaseClient from '../config/supabase';
import { getImage } from '../config/images';
import { SUBJECTS } from '../config/constants';

export default function MateriasScreen({ navigation }) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [materias, setMaterias] = useState(SUBJECTS);
  const [showHidden, setShowHidden] = useState(false);

  const visible = materias.slice(0, 8);
  const hidden = materias.slice(8);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StudentHeader navigation={navigation} user={user} colors={colors} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Matérias</Text>
        <View style={styles.grid}>
          {visible.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}
              onPress={() => navigation.navigate('Conteudo', { materia: m })}
            >
              <Image source={getImage(m.icon)} style={styles.cardImage} resizeMode="contain" />
              <Text style={[styles.cardLabel, { color: colors.textPrimary }]}>{m.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {hidden.length > 0 && (
          <>
            <TouchableOpacity onPress={() => setShowHidden(!showHidden)} style={{ marginVertical: 16 }}>
              <Text style={{ color: colors.primary, textAlign: 'center' }}>
                {showHidden ? 'Mostrar menos' : `Ver todas (${hidden.length} mais)`}
              </Text>
            </TouchableOpacity>
            {showHidden && (
              <View style={styles.grid}>
                {hidden.map((m) => (
                  <TouchableOpacity
                    key={m.id}
                    style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}
                    onPress={() => navigation.navigate('Conteudo', { materia: m })}
                  >
                    <Image source={getImage(m.icon)} style={styles.cardImage} resizeMode="contain" />
                    <Text style={[styles.cardLabel, { color: colors.textPrimary }]}>{m.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

function StudentHeader({ navigation, user, colors }) {
  function logout() {
    navigation.reset({ index: 0, routes: [{ name: 'Inicio' }] });
  }
  const tabs = [
    { name: 'Matérias', screen: 'Materias' },
    { name: 'Conteúdos', screen: 'Materias' },
    { name: 'Prova', screen: 'Prova' },
    { name: 'Redação', screen: 'Redacao' },
    { name: 'Histórico', screen: 'Historico' },
    { name: 'Conta', screen: 'ContaAluno' },
  ];
  return (
    <View style={[styles.header, { backgroundColor: colors.cardBg, borderBottomColor: colors.borderColor }]}>
      <Image source={require('../../assets/cabeca-header.png')} style={styles.headerLogo} resizeMode="contain" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
        {tabs.map((tab) => (
          <TouchableOpacity key={tab.name} style={styles.headerTab} onPress={() => navigation.navigate(tab.screen)}>
            <Text style={{ color: colors.textGray, fontSize: 13 }}>{tab.name}</Text>
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
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: {
    width: '30%', aspectRatio: 0.9, borderRadius: 12, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center', padding: 8, elevation: 2,
  },
  cardImage: { width: 50, height: 50, marginBottom: 8 },
  cardLabel: { fontSize: 12, fontWeight: '600', textAlign: 'center' },
});

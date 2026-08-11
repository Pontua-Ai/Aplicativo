import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';

const TABS = [
  { name: 'Matérias', screen: 'Materias' },
  { name: 'Conteúdos', screen: 'Conteudo' },
  { name: 'Prova', screen: 'Prova' },
  { name: 'Redação', screen: 'Redacao' },
  { name: 'Histórico', screen: 'Historico' },
  { name: 'Conta', screen: 'ContaAluno' },
];

export default function StudentHeader({ navigation }) {
  const { colors } = useTheme();
  const route = useRoute();
  const active = route?.name;

  return (
    <View style={[styles.header, { backgroundColor: colors.cardBg, borderBottomColor: colors.borderColor }]}>
      <Image source={require('../../assets/cabeca-header.png')} style={styles.headerLogo} resizeMode="contain" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
        {TABS.map((tab) => {
          const isActive = active === tab.screen;
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.headerTab}
              onPress={() => navigation.navigate(tab.screen)}
            >
              <Text
                style={{
                  color: isActive ? colors.primary : colors.textGray,
                  fontSize: 13,
                  fontWeight: isActive ? 'bold' : 'normal',
                }}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1 },
  headerLogo: { width: 30, height: 30, marginRight: 8 },
  headerTab: { paddingHorizontal: 10, paddingVertical: 6 },
});

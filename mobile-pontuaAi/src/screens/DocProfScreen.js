import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TeacherHeader from '../components/TeacherHeader';

const INFO_CARDS = [
  {
    icon: <MaterialCommunityIcons name="robot-outline" size={36} color="black" />,
    title: 'Assistente Inteligente',
    desc: 'A inteligência artificial do PontuaAI foi treinada para auxiliar na criação de conteúdo educacional de qualidade. Basta acessar a página "Perguntas" no menu superior e digitar o tema ou assunto que deseja trabalhar.',
  },
  {
    icon: <MaterialCommunityIcons name="note-text-outline" size={36} color="black" />,
    title: 'Criação de Provas',
    desc: 'Crie provas personalizadas selecionando perguntas do banco de questões. Você pode filtrar por matéria e conteúdo, escolher as questões desejadas e gerar uma prova completa para seus alunos.',
  },
  {
    icon: <MaterialCommunityIcons name="chart-bar" size={36} color="black" />,
    title: 'Acompanhamento',
    desc: 'Acompanhe o progresso dos seus alunos através do histórico de atividades. Veja quais questões foram respondidas, o desempenho da turma e identifique pontos que precisam de mais atenção.',
  },
  {
    icon: <MaterialCommunityIcons name="lightbulb-on-outline" size={36} color="black" />,
    title: 'Tire Dúvidas',
    desc: 'O PontuaAI não serve apenas para gerar perguntas — você pode usar a assistente para tirar dúvidas sobre qualquer conteúdo. É como ter um tutor disponível 24 horas por dia, 7 dias por semana.',
  },
  {
    icon: <MaterialCommunityIcons name="tools" size={36} color="black" />,
    title: 'Gestão da Conta',
    desc: 'Na página "Conta" você pode alterar sua senha, alternar entre modo claro e escuro, gerenciar sua conta e muito mais.',
  },
];

export default function DocProfScreen({ navigation }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TeacherHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.primary }]}>Como funciona o PontuaAI</Text>

        <View style={styles.introCard}>
          <Image
            source={require('../../assets/pontDeFrente.png')}
            style={styles.pontImage}
            resizeMode="contain"
          />
          <Text style={[styles.introText, { color: colors.textGray }]}>
            Utilize o menu superior para navegar entre as funcionalidades.
          </Text>
        </View>

        {INFO_CARDS.map((card, i) => (
          <View key={i} style={[styles.infoCard, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
            <Text style={{ fontSize: 36, marginBottom: 12 }}>{card.icon}</Text>
            <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>{card.title}</Text>
            <Text style={[styles.cardDesc, { color: colors.textGray }]}>{card.desc}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  introCard: { alignItems: 'center', marginBottom: 24 },
  pontImage: { width: 120, height: 140, marginBottom: 12 },
  introText: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  infoCard: { padding: 20, borderRadius: 12, borderWidth: 1, marginBottom: 12, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  cardDesc: { fontSize: 14, lineHeight: 20 },
});

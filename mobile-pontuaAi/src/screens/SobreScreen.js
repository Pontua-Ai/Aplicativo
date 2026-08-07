import React, { useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Image, Dimensions, Animated, Linking
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Octicons from '@expo/vector-icons/Octicons';

const { width } = Dimensions.get('window');

const features = [
  { icon: <EvilIcons name="pencil" size={50} color="black" />, title: 'Envie sua redação', desc: 'Cole seu texto e envie para análise' },
  { icon: <MaterialCommunityIcons name="brain" size={50} color="black" />, title: 'IA analisa', desc: 'O PONT avalia conforme 5 competências' },
  { icon: <MaterialCommunityIcons name="google-spreadsheet" size={50} color="black" />, title: 'Receba feedback', desc: 'Notas detalhadas e sugestões' },
  { icon: <AntDesign name="area-chart" size={50} color="black" />, title: 'Evolua sempre', desc: 'Acompanhe seu progresso' },
];

export default function SobreScreen({ navigation }) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.cardBg, borderBottomColor: colors.borderColor }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => navigation.navigate('Inicio')}
          >
            <Text style={[styles.headerBtnText, { color: colors.textPrimary }]}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => navigation.navigate('Cadastro')}
          >
            <Text style={{ color: colors.primary, fontWeight: '600', fontSize: 14 }}>Cadastrar</Text>
          </TouchableOpacity>
          <Text style={[styles.headerBtnActive, { color: colors.primary }]}>Sobre</Text>
        </View>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeBtn}>
          <Text style={{ fontSize: 18 }}>{isDark ? <Ionicons name="sunny-outline" size={24} color="white" /> : <Ionicons name="moon-outline" size={24} color="black" />}</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Banner */}
      <View style={[styles.hero, { backgroundColor: colors.primary }]}>
        <View style={styles.heroContent}>
          <Text style={styles.heroLabel}>SOBRE O PONTUAAI</Text>
          <Text style={styles.heroTitle}>Seu companheiro inteligente de estudos</Text>
          <Text style={styles.heroDesc}>
            O PontuaAI avalia sua evolução com métricas que indicam o que precisa melhorar e como melhorar.
            Nossa IA está sempre pronta para ajudar na revisão de redações, com dicas e notas seguindo as normas
            do vestibular de sua escolha.
          </Text>
          <View style={styles.heroButtons}>
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => navigation.navigate('Cadastro')}
            >
              <Text style={styles.btnPrimaryText}>Começar agora</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnSecondary, { borderColor: colors.textSecondary }]}
              onPress={() => scrollRef.current?.scrollToEnd?.()}
            >
              <Text style={{ color: colors.textSecondary }}>Como funciona</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Conheça o PONT */}
      <View style={styles.section}>
        <View style={styles.aboutRow}>
          <Image
            source={require('../../assets/coala-magro.png')}
            style={styles.aboutImg}
            resizeMode="contain"
          />
          <View style={styles.aboutText}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Conheça o PONT</Text>
            <Text style={[styles.aboutDesc, { color: colors.textGray }]}>
              Chamamos nosso agente de IA de <Text style={{ fontWeight: 'bold', color: colors.textPrimary }}>PONT</Text>,
              seu amigo nessa jornada para alcançar seus sonhos, seja passar no vestibular ou conseguir um emprego público.
            </Text>
            <Text style={[styles.aboutDesc, { color: colors.textGray, marginTop: 10 }]}>
              O PONT avalia suas redações conforme o que você escreve, seguindo as 5 competências do ENEM para dar
              feedback detalhado e sugestões de melhoria personalizadas.
            </Text>
          </View>
        </View>
      </View>

      {/* Nossa plataforma */}
      <View style={[styles.section, { backgroundColor: colors.gray }]}>
        <View style={styles.aboutRow}>
          <View style={styles.aboutText}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Nossa plataforma</Text>
            <Text style={[styles.aboutDesc, { color: colors.textGray }]}>
              O logotipo do site PontuaAI apresenta a imagem de um coala, animal que transmite a calma e leveza
              essenciais para um bom aprendizado, além de representar um ambiente amigável para os estudos.
            </Text>
            <Text style={[styles.aboutDesc, { color: colors.textGray, marginTop: 10 }]}>
              Utilizamos tecnologia de ponta em inteligência artificial para oferecer uma experiência de aprendizado
              personalizada e eficiente para cada estudante.
            </Text>
          </View>
          <Image
            source={require('../../assets/logo-completa.png')}
            style={styles.logoImg}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Stats */}
      <View style={[styles.statsSection, { backgroundColor: colors.primary }]}>
        <Text style={styles.statsTitle}>Impacto em números</Text>
        <View style={styles.statsGrid}>
          {[
            { num: '+10 mil', label: 'Redações corrigidas' },
            { num: '+5 mil', label: 'Estudantes ativos' },
            { num: '98%', label: 'Satisfação dos usuários' },
            { num: '+50', label: 'Vestibulares contemplados' },
          ].map((stat, i) => (
            <View key={i} style={[styles.statCard, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
              <Text style={styles.statNumber}>{stat.num}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Nossos Objetivos */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary, textAlign: 'center' }]}>Nossos Objetivos</Text>
        <Text style={[styles.subtitle, { color: colors.textGray, textAlign: 'center' }]}>
          Transformar a educação através da inteligência artificial
        </Text>
        <View style={styles.objectivesGrid}>
          {[
            { icon: <SimpleLineIcons name="graduation" size={40} color="black" />, title: 'Ampliar o acesso ao ensino de qualidade', desc: 'Democratizar o acesso a ferramentas de correção de redações com IA.' },
            { icon: <Ionicons name="person-outline" size={40} color="black" />, title: 'Ajudar estudantes em sua jornada', desc: 'Acompanhar cada etapa do aprendizado com métricas claras e relatórios personalizados.' },
            { icon: <Octicons name="law" size={40} color="black" />, title: 'Uniformizar a qualidade do ensino', desc: 'Oferecer critérios de avaliação padronizados com base nas competências exigidas.' },
          ].map((obj, i) => (
            <View key={i} style={[styles.objectiveCard, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
              <Text style={{ fontSize: 32, marginBottom: 10 }}>{obj.icon}</Text>
              <Text style={[styles.objTitle, { color: colors.textPrimary }]}>{obj.title}</Text>
              <Text style={[styles.objDesc, { color: colors.textGray }]}>{obj.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Features Carousel */}
      <View style={[styles.section, { backgroundColor: colors.gray }]}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary, textAlign: 'center' }]}>Como funciona</Text>
        <Text style={[styles.subtitle, { color: colors.textGray, textAlign: 'center' }]}>Em apenas 4 passos simples</Text>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={{ marginVertical: 20 }}
        >
          {features.map((f, i) => (
            <View key={i} style={[styles.featureCard, { width: width * 0.8, backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
              <Text style={{ fontSize: 48, marginBottom: 15 }}>{f.icon}</Text>
              <Text style={[styles.featureTitle, { color: colors.textPrimary }]}>{f.title}</Text>
              <Text style={[styles.featureDesc, { color: colors.textGray }]}>{f.desc}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.dots}>
          {features.map((_, i) => (
            <View key={i} style={[styles.dot, { backgroundColor: i === currentIndex ? colors.primary : colors.textGray }]} />
          ))}
        </View>
      </View>

      {/* FAQ */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary, textAlign: 'center' }]}>Perguntas Frequentes</Text>
        {[
          { q: 'O que é o PontuaAI?', a: 'O PontuaAI é uma plataforma de estudos que utiliza inteligência artificial para corrigir redações e acompanhar sua evolução acadêmica.' },
          { q: 'Como o PONT avalia minha redação?', a: 'O PONT analisa seu texto com base nas 5 competências do ENEM, fornecendo notas detalhadas, feedback personalizado e sugestões de melhoria.' },
          { q: 'É gratuito?', a: 'Oferecemos planos gratuitos e premium. No plano gratuito você pode enviar redações com funcionalidades básicas.' },
          { q: 'Quais vestibulares são contemplados?', a: 'Atualmente contemplamos ENEM, Fuvest, Unicamp, e outros vestibulares estaduais.' },
        ].map((faq, i) => (
          <View key={i} style={[styles.faqItem, { borderBottomColor: colors.borderColor }]}>
            <Text style={[styles.faqQuestion, { color: colors.textPrimary }]}>{faq.q}</Text>
            <Text style={[styles.faqAnswer, { color: colors.textGray }]}>{faq.a}</Text>
          </View>
        ))}
      </View>

      {/* CTA */}
      <View style={[styles.ctaSection, { backgroundColor: colors.primary }]}>
        <Text style={styles.ctaTitle}>Pronto para transformar seus estudos?</Text>
        <Text style={styles.ctaDesc}>Junte-se a milhares de estudantes que já estão evoluindo com o PontuaAI.</Text>
        <TouchableOpacity style={[styles.ctaBtn, { backgroundColor: colors.textSecondary }]} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Criar conta gratuita</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={[styles.footer, { backgroundColor: colors.footerBg }]}>
        <Image source={require('../../assets/logo-completa.png')} style={styles.footerLogo} resizeMode="contain" />
        <Text style={[styles.footerText, { color: colors.textGray }]}>Sua jornada vai muito além do que você imagina.</Text>
        <Text style={[styles.footerText, { color: colors.textGray, marginTop: 20, fontSize: 12 }]}>
          &copy; 2026 PontuaAI. Todos os direitos reservados.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1,
  },
  headerBtn: { marginRight: 16, paddingVertical: 4 },
  headerBtnText: { fontSize: 14 },
  headerBtnActive: { fontSize: 14, fontWeight: 'bold', marginLeft: 8 },
  themeBtn: { padding: 8 },
  hero: { padding: 24, paddingTop: 40, paddingBottom: 40 },
  heroContent: { alignItems: 'center' },
  heroLabel: {
    color: 'rgba(255,255,255,0.8)', fontSize: 12, letterSpacing: 2,
    marginBottom: 12, fontWeight: '600',
  },
  heroTitle: { color: '#fff', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  heroDesc: { color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 22, marginBottom: 20 },
  heroButtons: { flexDirection: 'row', gap: 12 },
  btnPrimary: {
    backgroundColor: '#fff', paddingHorizontal: 24, paddingVertical: 12,
    borderRadius: 25, elevation: 3,
  },
  btnPrimaryText: { color: '#0B9395', fontWeight: 'bold' },
  btnSecondary: {
    paddingHorizontal: 24, paddingVertical: 12, borderRadius: 25,
    borderWidth: 1.5,
  },
  section: { padding: 20 },
  aboutRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  aboutImg: { width: 120, height: 160 },
  aboutText: { flex: 1 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  aboutDesc: { fontSize: 14, lineHeight: 20 },
  logoImg: { width: 120, height: 80 },
  statsSection: { padding: 24 },
  statsTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' },
  statCard: {
    width: '45%', padding: 16, borderRadius: 12, alignItems: 'center',
  },
  statNumber: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  statLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 4 },
  subtitle: { fontSize: 14, marginBottom: 20 },
  objectivesGrid: { gap: 16 },
  objectiveCard: { padding: 20, borderRadius: 12, borderWidth: 1 },
  objTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  objDesc: { fontSize: 13, lineHeight: 18 },
  featureCard: {
    padding: 24, borderRadius: 16, alignItems: 'center',
    marginHorizontal: 10, borderWidth: 1, elevation: 2,
  },
  featureTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  featureDesc: { fontSize: 14, textAlign: 'center' },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  faqItem: { paddingVertical: 16, borderBottomWidth: 1 },
  faqQuestion: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  faqAnswer: { fontSize: 14, lineHeight: 20 },
  ctaSection: { padding: 40, alignItems: 'center' },
  ctaTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  ctaDesc: { color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginBottom: 20 },
  ctaBtn: { paddingHorizontal: 32, paddingVertical: 14, borderRadius: 25 },
  footer: { padding: 24, alignItems: 'center' },
  footerLogo: { width: 120, height: 40 },
  footerText: { fontSize: 13, marginTop: 8 },
});

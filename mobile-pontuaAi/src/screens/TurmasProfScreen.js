import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image, Modal
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import supabaseClient from '../config/supabase';
import { showToast } from '../components/Toast';

export default function TurmasProfScreen({ navigation }) {
  const { colors } = useTheme();
  const [turmas, setTurmas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nomeTurma, setNomeTurma] = useState('');
  const [codigoAcesso, setCodigoAcesso] = useState('');

  useEffect(() => {
    generateCode();
  }, []);

  function generateCode() {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCodigoAcesso(code);
  }

  async function handleCriarTurma() {
    if (!nomeTurma.trim()) {
      showToast('Digite um nome para a turma', 'error');
      return;
    }
    showToast('Turma criada com sucesso!', 'success');
    setShowModal(false);
    setNomeTurma('');
    generateCode();
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TeacherHeader navigation={navigation} colors={colors} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Gerenciar Turmas</Text>
          <TouchableOpacity
            style={[styles.newBtn, { backgroundColor: colors.primary }]}
            onPress={() => { setShowModal(true); generateCode(); }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>+ Nova Turma</Text>
          </TouchableOpacity>
        </View>

        {turmas.length === 0 ? (
          <View style={{ marginTop: 60, alignItems: 'center' }}>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>🏫</Text>
            <Text style={[styles.emptyText, { color: colors.textGray }]}>
              Nenhuma turma criada ainda.
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.textGray }]}>
              Crie sua primeira turma para começar.
            </Text>
          </View>
        ) : (
          turmas.map((t, i) => (
            <View key={i} style={[styles.turmaCard, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
              <Text style={[styles.turmaName, { color: colors.textPrimary }]}>{t.nome}</Text>
              <Text style={[styles.turmaCode, { color: colors.textGray }]}>Código: {t.codigo}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.cardBg }]}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Nova Turma</Text>

            <Text style={[styles.modalLabel, { color: colors.textGray }]}>Nome da Turma</Text>
            <TextInput
              style={[styles.modalInput, { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.borderColor }]}
              placeholder="Ex: 3º Ano A"
              placeholderTextColor={colors.placeholder}
              value={nomeTurma}
              onChangeText={setNomeTurma}
            />

            <Text style={[styles.modalLabel, { color: colors.textGray }]}>Código de Acesso</Text>
            <View style={[styles.codeRow, { backgroundColor: colors.input, borderColor: colors.borderColor }]}>
              <Text style={[styles.codeText, { color: colors.primary }]}>{codigoAcesso}</Text>
              <TouchableOpacity onPress={generateCode}>
                <Text style={{ color: colors.textGray }}>🔄</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: colors.gray }]}
                onPress={() => setShowModal(false)}
              >
                <Text style={{ color: colors.textPrimary }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: colors.primary }]}
                onPress={handleCriarTurma}
              >
                <Text style={{ color: '#fff' }}>Criar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
  newBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  emptyText: { fontSize: 16, textAlign: 'center' },
  emptySubtext: { fontSize: 14, textAlign: 'center', marginTop: 8 },
  turmaCard: { padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 12, elevation: 2 },
  turmaName: { fontSize: 16, fontWeight: '600' },
  turmaCode: { fontSize: 13, marginTop: 4 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '90%', padding: 24, borderRadius: 16, elevation: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  modalLabel: { fontSize: 13, fontWeight: '500', marginBottom: 6 },
  modalInput: { padding: 14, borderRadius: 10, borderWidth: 1, fontSize: 15, marginBottom: 16 },
  codeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderRadius: 10, borderWidth: 1, marginBottom: 20 },
  codeText: { fontSize: 18, fontWeight: 'bold', letterSpacing: 2 },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  modalBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
});

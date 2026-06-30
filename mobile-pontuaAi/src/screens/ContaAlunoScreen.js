import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput, Modal
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { verificarSenha, excluirConta } from '../services/auth';
import supabaseClient from '../config/supabase';
import { showToast } from '../components/Toast';

export default function ContaAlunoScreen({ navigation }) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);
  const [deleteStep, setDeleteStep] = useState(false);
  const [deleteSenha, setDeleteSenha] = useState('');
  const [classCode, setClassCode] = useState('');

  async function handleExcluir() {
    if (!deleteStep) {
      setDeleteStep(true);
      return;
    }
    if (!deleteSenha) {
      showToast('Digite sua senha', 'error');
      return;
    }
    const result = await verificarSenha(user?.email, deleteSenha);
    if (!result.success) {
      showToast('Senha incorreta', 'error');
      return;
    }
    await excluirConta(user?.id_usuario);
    showToast('Conta excluída com sucesso!', 'success');
    setShowDeleteModal(false);
    await signOut();
    navigation.reset({ index: 0, routes: [{ name: 'Inicio' }] });
  }

  async function handleSair() {
    await signOut();
    navigation.reset({ index: 0, routes: [{ name: 'Inicio' }] });
  }

  const settings = [
    { icon: '🔑', label: 'Alterar senha', onPress: () => navigation.navigate('Redefinir') },
    { icon: isDark ? '☀️' : '🌙', label: isDark ? 'Modo claro' : 'Modo escuro', onPress: toggleTheme },
    { icon: '🏫', label: 'Entrar em turma', onPress: () => setShowClassModal(true) },
    { icon: '🚪', label: 'Sair', onPress: handleSair },
    { icon: '🗑️', label: 'Excluir conta', onPress: () => { setShowDeleteModal(true); setDeleteStep(false); }, danger: true },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StudentHeader navigation={navigation} colors={colors} />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile */}
        <View style={[styles.profileCard, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
          <View style={styles.avatarContainer}>
            <Image source={require('../../assets/avatar-padrao.png')} style={styles.avatar} />
            <View style={[styles.cameraOverlay, { backgroundColor: colors.overlay }]}>
              <Text style={{ color: '#fff', fontSize: 16 }}>📷</Text>
            </View>
          </View>
          <Text style={[styles.profileName, { color: colors.textPrimary }]}>
            {user?.username || 'Usuário'}
          </Text>
          <Text style={[styles.profileType, { color: colors.textGray }]}>
            {user?.tipo_conta || 'Aluno'}
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { value: '0', label: 'Provas feitas' },
            { value: '0', label: 'Redações feitas' },
            { value: '0.0', label: 'Média redações' },
          ].map((s, i) => (
            <View key={i} style={[styles.statCard, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
              <Text style={[styles.statValue, { color: colors.primary }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textGray }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Settings */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Configurações</Text>
        {settings.map((s, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.settingCard, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}
            onPress={s.onPress}
          >
            <Text style={{ fontSize: 20, marginRight: 12 }}>{s.icon}</Text>
            <Text style={[styles.settingLabel, { color: s.danger ? colors.error : colors.textPrimary }]}>
              {s.label}
            </Text>
            <Text style={{ color: colors.textGray, marginLeft: 'auto' }}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Delete Modal */}
      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.cardBg }]}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
              {deleteStep ? 'Para confirmar, digite sua senha:' : 'Tem certeza de que deseja excluir sua conta?'}
            </Text>
            {deleteStep && (
              <TextInput
                style={[styles.modalInput, { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.borderColor }]}
                placeholder="Sua senha"
                placeholderTextColor={colors.placeholder}
                secureTextEntry
                value={deleteSenha}
                onChangeText={setDeleteSenha}
              />
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: colors.gray }]}
                onPress={() => { setShowDeleteModal(false); setDeleteSenha(''); }}
              >
                <Text style={{ color: colors.textPrimary }}>Não</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: colors.error }]}
                onPress={handleExcluir}
              >
                <Text style={{ color: '#fff' }}>{deleteStep ? 'Excluir' : 'Sim'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Class Code Modal */}
      <Modal visible={showClassModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.cardBg }]}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Entrar em turma</Text>
            <TextInput
              style={[styles.modalInput, { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.borderColor }]}
              placeholder="Código da turma"
              placeholderTextColor={colors.placeholder}
              value={classCode}
              onChangeText={setClassCode}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: colors.gray }]}
                onPress={() => setShowClassModal(false)}
              >
                <Text style={{ color: colors.textPrimary }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: colors.primary }]} onPress={() => {
                showToast('Funcionalidade em desenvolvimento', 'success');
                setShowClassModal(false);
              }}>
                <Text style={{ color: '#fff' }}>Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  profileCard: { padding: 24, borderRadius: 16, borderWidth: 1, alignItems: 'center', marginBottom: 20, elevation: 2 },
  avatarContainer: { position: 'relative', marginBottom: 12 },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  cameraOverlay: { position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  profileName: { fontSize: 20, fontWeight: 'bold' },
  profileType: { fontSize: 14, marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: { flex: 1, padding: 16, borderRadius: 12, borderWidth: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold' },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  settingCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 8 },
  settingLabel: { fontSize: 15, fontWeight: '500' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '85%', padding: 24, borderRadius: 16, elevation: 10 },
  modalTitle: { fontSize: 16, fontWeight: '600', marginBottom: 16 },
  modalInput: { padding: 14, borderRadius: 10, borderWidth: 1, fontSize: 15, marginBottom: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  modalBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
});

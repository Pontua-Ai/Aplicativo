import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import supabaseClient from '../config/supabase';
import { showToast } from '../components/Toast';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import TeacherHeader from '../components/TeacherHeader';

export default function PerguntasProfScreen({ navigation }) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [materias, setMaterias] = useState([]);
  const [conteudos, setConteudos] = useState([]);
  const [materiaId, setMateriaId] = useState('');
  const [conteudoId, setConteudoId] = useState('');
  const [perguntaTexto, setPerguntaTexto] = useState('');
  const [alternativas, setAlternativas] = useState(['', '', '', '', '']);
  const [correta, setCorreta] = useState(null);
  const [visibilidade, setVisibilidade] = useState('publico');

  useEffect(() => {
    loadMaterias();
  }, []);

  async function loadMaterias() {
    const { data } = await supabaseClient.from('materia').select('*');
    if (data) setMaterias(data);
  }

  async function loadConteudos(id) {
    if (!id) return;
    const { data } = await supabaseClient.from('conteudo').select('*').eq('id_materia', id);
    if (data) setConteudos(data);
  }

  function handleMateriaChange(id) {
    setMateriaId(id);
    setConteudoId('');
    loadConteudos(id);
  }

  async function handleSubmit() {
    if (!materiaId || !conteudoId || !perguntaTexto) {
      showToast('Preencha todos os campos obrigatórios', 'error');
      return;
    }
    if (alternativas.some(a => !a.trim())) {
      showToast('Preencha todas as alternativas', 'error');
      return;
    }
    if (correta === null) {
      showToast('Selecione a alternativa correta', 'error');
      return;
    }

    const { data: perguntaCriada, error } = await supabaseClient
      .from('perguntas')
      .insert([{
        pergunta_texto: perguntaTexto,
        id_conteudo: conteudoId,
        id_materia: materiaId,
        id_usuario: user?.id_usuario,
        visibilidade,
      }])
      .select();

    if (error) {
      showToast('Erro ao criar pergunta: ' + error.message, 'error');
      return;
    }

    const idPergunta = perguntaCriada[0].id_pergunta || perguntaCriada[0].id;
    for (let i = 0; i < alternativas.length; i++) {
      await supabaseClient.from('alternativa').insert([{
        nome_alternativa: alternativas[i],
        id_pergunta: idPergunta,
        correta: i === correta,
      }]);
    }

    showToast('Pergunta cadastrada com sucesso!', 'success');
    setPerguntaTexto('');
    setAlternativas(['', '', '', '', '']);
    setCorreta(null);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TeacherHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.primary }]}>Criar Pergunta</Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.select, { backgroundColor: colors.input, borderColor: colors.borderColor }]}
            onPress={() => {}}
          >
            <Text style={{ color: colors.textGray }}>{materiaId ? materias.find(m => (m.id_materia || m.id) == materiaId)?.nome_materia || 'Matéria' : 'Matéria'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.select, { backgroundColor: colors.input, borderColor: colors.borderColor }]}
            onPress={() => {}}
          >
            <Text style={{ color: colors.textGray }}>{conteudoId ? 'Conteúdo selecionado' : 'Conteúdo'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.visibilidadeRow}>
          {['publico', 'privado'].map((v) => (
            <TouchableOpacity
              key={v}
              style={[styles.visBtn, visibilidade === v && { backgroundColor: colors.primary }]}
              onPress={() => setVisibilidade(v)}
            >
              <Text style={{ color: visibilidade === v ? '#fff' : colors.textGray, fontSize: 13 }}>
                {v === 'publico' ? <><MaterialCommunityIcons name="earth" size={14} color={visibilidade === v ? '#fff' : colors.textGray} /> Público</> : <><MaterialCommunityIcons name="lock-outline" size={14} color={visibilidade === v ? '#fff' : colors.textGray} /> Privado</>}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={[styles.textArea, { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.borderColor }]}
          placeholder="Digite a pergunta..."
          placeholderTextColor={colors.placeholder}
          multiline
          value={perguntaTexto}
          onChangeText={setPerguntaTexto}
        />

        <Text style={[styles.subtitle, { color: colors.textPrimary }]}>Alternativas</Text>
        {alternativas.map((alt, i) => (
          <View key={i} style={styles.alternativaRow}>
            <Text style={[styles.altLabel, { color: colors.textPrimary }]}>
              {String.fromCharCode(65 + i)}
            </Text>
            <TextInput
              style={[styles.altInput, { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.borderColor }]}
              placeholder={`Alternativa ${String.fromCharCode(65 + i)}`}
              placeholderTextColor={colors.placeholder}
              value={alt}
              onChangeText={(t) => {
                const newAlts = [...alternativas];
                newAlts[i] = t;
                setAlternativas(newAlts);
              }}
            />
            <TouchableOpacity
              style={[styles.radio, correta === i && { backgroundColor: colors.success }]}
              onPress={() => setCorreta(i)}
            >
              {correta === i && <Ionicons name="checkmark" size={14} color="#fff" />}
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={[styles.submitBtn, { backgroundColor: colors.primary }]} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Cadastrar pergunta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  select: { flex: 1, padding: 14, borderRadius: 10, borderWidth: 1 },
  visibilidadeRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  visBtn: { padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  textArea: { padding: 14, borderRadius: 10, borderWidth: 1, minHeight: 120, marginBottom: 20, fontSize: 15 },
  subtitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  alternativaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  altLabel: { fontSize: 16, fontWeight: 'bold', width: 24 },
  altInput: { flex: 1, padding: 12, borderRadius: 8, borderWidth: 1, fontSize: 14 },
  radio: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: '#ddd', alignItems: 'center', justifyContent: 'center' },
  submitBtn: { padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  submitBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Estilo from './styles/Estilo-documentacao';

export default function Documentacao({ navigation }) {
  return (
    <View style={Estilo.formulario}>
      <ScrollView contentContainerStyle={Estilo.scrollContainer}>

        <View style={Estilo.menu}>
          <TouchableOpacity
            style={Estilo.botaoMenuInativo}
            onPress={() => navigation.navigate('Materias')}
          >
            <Text style={Estilo.textoMenuInativo}>Matérias</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Estilo.botaoMenuInativo}
            onPress={() => navigation.navigate('Conteudo')}
          >
            <Text style={Estilo.textoMenuInativo}>Conteúdo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Estilo.botaoMenuAtivo}
            onPress={() => navigation.navigate('Documentacao')}
          >
            <Text style={Estilo.textoMenuAtivo}>Docs</Text>
          </TouchableOpacity>
        </View>

        <Text style={Estilo.titulo}>Como funciona o PontuaAI</Text>

        <Text style={Estilo.subtitulo}>
          Um guia completo para você aproveitar ao máximo a plataforma.
        </Text>

        <View style={Estilo.secao}>
          <Text style={Estilo.tituloSecao}>🤖 Sua assistente inteligente</Text>
          <Text style={Estilo.texto}>
            A inteligência artificial do PontuaAI foi treinada para auxiliar
            na criação de conteúdo educacional de qualidade. Basta acessar a
            página "Perguntas" e informar o tema desejado para gerar questões
            contextualizadas, com alternativas e gabarito.
          </Text>
        </View>

        <View style={Estilo.secao}>
          <Text style={Estilo.tituloSecao}>📝 Crie avaliações facilmente</Text>
          <Text style={Estilo.texto}>
            Com as perguntas geradas pela IA, você pode montar provas completas
            em poucos cliques. Selecione as questões desejadas e o sistema
            organiza automaticamente o documento.
          </Text>
        </View>

        <View style={Estilo.secao}>
          <Text style={Estilo.tituloSecao}>📊 Acompanhe o progresso</Text>
          <Text style={Estilo.texto}>
            Na página "Histórico", você encontra relatórios inteligentes sobre
            o desempenho da turma, facilitando a identificação dos conteúdos
            que precisam de reforço.
          </Text>
        </View>

        <View style={Estilo.secao}>
          <Text style={Estilo.tituloSecao}>❓ Tire dúvidas</Text>
          <Text style={Estilo.texto}>
            O PontuaAI também pode ser utilizado para responder perguntas e
            explicar conteúdos de forma clara, funcionando como um tutor
            disponível sempre que necessário.
          </Text>
        </View>

        <View style={Estilo.secao}>
          <Text style={Estilo.tituloSecao}>⚙️ Gerencie sua conta</Text>
          <Text style={Estilo.texto}>
            Na página "Conta", você pode alterar seu nome, e-mail e senha de
            forma segura, além de manter suas informações sempre atualizadas.
          </Text>
        </View>

        <Text style={Estilo.rodape}>
          Use o menu acima para navegar pela plataforma.
        </Text>

      </ScrollView>
    </View>
  );
}
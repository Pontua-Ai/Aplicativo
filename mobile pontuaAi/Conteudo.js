import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Estilo from './styles/Estilo-conteudo';

export default function Conteudo({ navigation, route }) {
  const { materia } = route.params;
  const conteudos = {
    Matemática: [
      {
        titulo: 'Álgebra',
        texto:
          'A álgebra usa letras como caixas misteriosas para descobrir números escondidos. Se X mais três é igual a dez, o X é o espaço vazio que vale sete. É um jogo de detetive onde as letras são valores desconhecidos que descobrimos com pistas básicas.',
      },
      {
        titulo: 'Geometria',
        texto:
          'A geometria é a matemática que estuda o espaço, as formas e o tamanho das coisas. Ela analisa desde figuras simples como linhas, quadrados e círculos, até objetos tridimensionais como cubos e esferas. É a ferramenta que usamos para medir tamanhos, calcular áreas e entender como as coisas se encaixam no mundo real.',
      },
      {
        titulo: 'Trigonometria',
        texto:
          'A trigonometria estuda a relação entre os lados e os ângulos dos triângulos. Ela serve para calcular distâncias e alturas gigantescas ou inacessíveis, como o tamanho de uma montanha, usando apenas a inclinação de uma linha.',
      },
      {
        titulo: 'Estatística',
        texto:
          'A estatística é a matemática que coleta, organiza e analisa dados para entender a realidade e prever o futuro. Ela transforma um monte de números soltos em informações úteis, revelando padrões e tendências por meio de médias e porcentagens. É a ferramenta usada para calcular intenções de voto, prever o clima e entender o comportamento de grupos de pessoas.',
      },
      {
        titulo: 'Financias',
        texto:
          'A matemática financeira controla o dinheiro ao longo do tempo para calcular juros, investimentos e parcelas. Ela mostra como o valor do dinheiro muda, ajudando a planejar gastos, evitar dívidas e fazer o patrimônio crescer.',
      },
      {
        titulo: 'Conjuntos',
        texto:
          'Os conjuntos agrupam elementos com características comuns em coleções organizadas. Eles servem para classificar informações e mostrar como grupos diferentes se cruzam ou se separam.',
      },
      {
        titulo: 'Números',
        texto:
          'Os números são símbolos criados para contar, medir, ordenar e identificar tudo ao nosso redor. Eles servem para dar uma quantidade exata às coisas, permitindo desde contas simples até a organização do tempo, do dinheiro e da ciência.',
      },
      {
        titulo: 'Operações',
        texto:
          'As operações são as ações matemáticas que combinam ou modificam números para resolver problemas. As quatro principais são somar (juntar), subtrair (tirar), multiplicar (somar repetidamente) e dividir (repartir em partes iguais).',
      },
      {
        titulo: 'Frações',
        texto:
          'A fração representa partes de um todo que foi dividido em fatias iguais. O número de cima mostra quantas fatias você pegou, e o de baixo diz em quantas partes o total foi cortado.',
      },
      {
        titulo: 'Proporção',
        texto:
          'A proporção é a igualdade entre duas razões, mostrando que duas frações ou relações mantêm o mesmo equilíbrio. Ela serve para aumentar ou diminuir tamanhos mantendo o formato original, como em receitas de cozinha ou mapas.',
      },
      {
        titulo: 'Grandezas',
        texto:
          'As grandezas são tudo aquilo que pode ser medido, contado ou comparado, como o tempo, a velocidade, o peso e o preço. Elas servem para dar valores exatos à realidade e podem subir ou descer juntas ou em sentidos opostos.',
      },
    ],
    Português: [
      {
        titulo: 'Leitura',
        texto:
          'A leitura é o processo de decodificar símbolos escritos para compreender mensagens, ideias e histórias. Ela serve para expandir o conhecimento, desenvolver o vocabulário e estimular a imaginação através da interpretação do pensamento de outras pessoas.',
      },
    ],
  };

  return (
    <View style={Estilo.formulario}>
      <ScrollView contentContainerStyle={Estilo.scrollContainer}>
        <View style={Estilo.menu}>
          <TouchableOpacity
            style={Estilo.botaoMenuInativo}
            onPress={() => navigation.navigate('Materias')}>
            <Text style={Estilo.textoMenuInativo}>Matérias</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Estilo.botaoMenuAtivo}
            onPress={() => navigation.navigate('Conteudo')}>
            <Text style={Estilo.textoMenuAtivo}>Conteúdo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Estilo.botaoMenuInativo}
            onPress={() => navigation.navigate('Documentacao')}>
            <Text style={Estilo.textoMenuInativo}>Docs</Text>
          </TouchableOpacity>
        </View>

        {conteudos[materia]?.map((item, index) => (
          <View
            key={index}
            style={{
              marginTop: 50,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
              }}>
              <Text style={{ fontWeight: 'bold' }}>{item.titulo}:</Text>{' '}
              {item.texto}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Estilo from './styles/Estilo-materia';

export default function Materias({ navigation }) {
  return (
    <View style={Estilo.formulario}>
      <ScrollView contentContainerStyle={Estilo.scrollContainer}>
        <View style={Estilo.menu}>
          <TouchableOpacity style={Estilo.botaoMenuAtivo} onPress={() => navigation.navigate('Materias')}>
            <Text style={Estilo.textoMenuAtivo}>Matérias</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={Estilo.botaoMenuInativo} onPress={() => navigation.navigate('Conteudo')}>
            <Text style={Estilo.textoMenuInativo}>Conteúdo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={Estilo.botaoMenuInativo} onPress={() => navigation.navigate('Documentacao')}>
            <Text style={Estilo.textoMenuInativo}>Docs</Text>
          </TouchableOpacity>
        </View>

        <View style={Estilo.conteiner}>
          <View style={Estilo.quadrado}>
            <Image style={Estilo.coala} source={require('./assets/matematica.png')} />
            <TouchableOpacity
              style={Estilo.botao}
              onPress={() =>
                navigation.navigate('Conteudo', {
                  materia: 'Matemática'
                })
              }
            >
              <Text style={Estilo.botaoTextoMat}>Matemática</Text>
            </TouchableOpacity>
          </View>

          <View style={Estilo.quadrado}>
            <Image style={Estilo.coala} source={require('./assets/artes.png')} />
            <TouchableOpacity style={Estilo.botao}>
              <Text style={Estilo.botaoTextoMat}>Artes</Text>
            </TouchableOpacity>
          </View>

          <View style={Estilo.quadrado}>
            <Image style={Estilo.coala} source={require('./assets/biologia.png')} />
            <TouchableOpacity style={Estilo.botao}>
              <Text style={Estilo.botaoTextoMat}>Biologia</Text>
            </TouchableOpacity>
          </View>

          <View style={Estilo.quadrado}>
            <Image style={Estilo.coala} source={require('./assets/espanhol.png')} />
            <TouchableOpacity style={Estilo.botao}>
              <Text style={Estilo.botaoTextoMat}>Espanhol</Text>
            </TouchableOpacity>
          </View>

          <View style={Estilo.quadrado}>
            <Image style={Estilo.coala} source={require('./assets/filosofia.png')} />
            <TouchableOpacity style={Estilo.botao}>
              <Text style={Estilo.botaoTextoMat}>Filosofia</Text>
            </TouchableOpacity>
          </View>

          <View style={Estilo.quadrado}>
            <Image style={Estilo.coala} source={require('./assets/fisica.png')} />
            <TouchableOpacity style={Estilo.botao}>
              <Text style={Estilo.botaoTextoMat}>Física</Text>
            </TouchableOpacity>
          </View>

          <View style={Estilo.quadrado}>
            <Image style={Estilo.coala} source={require('./assets/geografia.png')} />
            <TouchableOpacity style={Estilo.botao}>
              <Text style={Estilo.botaoTextoMat}>Geografia</Text>
            </TouchableOpacity>
          </View>

          <View style={Estilo.quadrado}>
            <Image style={Estilo.coala} source={require('./assets/historia.png')} />
            <TouchableOpacity style={Estilo.botao}>
              <Text style={Estilo.botaoTextoMat}>História</Text>
            </TouchableOpacity>
          </View>

          <View style={Estilo.quadrado}>
            <Image style={Estilo.coala} source={require('./assets/ingles.png')} />
            <TouchableOpacity style={Estilo.botao}>
              <Text style={Estilo.botaoTextoMat}>Inglês</Text>
            </TouchableOpacity>
          </View>

          <View style={Estilo.quadrado}>
            <Image style={Estilo.coala} source={require('./assets/portugues.png')} />
            <TouchableOpacity style={Estilo.botao}>
              <Text style={Estilo.botaoTextoMat}>Português</Text>
            </TouchableOpacity>
          </View>

          <View style={Estilo.quadrado}>
            <Image style={Estilo.coala} source={require('./assets/quimica.png')} />
            <TouchableOpacity style={Estilo.botao}>
              <Text style={Estilo.botaoTextoMat}>Química</Text>
            </TouchableOpacity>
          </View>

          <View style={Estilo.quadrado}>
            <Image style={Estilo.coala} source={require('./assets/sociologia.png')} />
            <TouchableOpacity style={Estilo.botao}>
              <Text style={Estilo.botaoTextoMat}>Sociologia</Text>
            </TouchableOpacity>
          </View>
          </View>
      </ScrollView>
    </View>
  );
}
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  formulario: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    width: '100%',
  },

  scrollContainer: {
    paddingTop: 40,
    paddingBottom: 30,
  },

  menu: {
    flexDirection: 'row',
    width: '90%',
    height: 54,
    backgroundColor: '#1a1a1a',
    borderRadius: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#343a40',
  },

  botaoMenuAtivo: {
    flex: 1,
    height: 42,
    backgroundColor: '#0b9395',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },

  botaoMenuInativo: {
    flex: 1,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },

  textoMenuAtivo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  textoMenuInativo: {
    color: '#aaa',
    fontWeight: '500',
    fontSize: 14,
  },

  titulo: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },

  subtitulo: {
    color: '#aaa',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  secao: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#343a40',
  },

  tituloSecao: {
    color: '#0b9395',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  texto: {
    color: '#ddd',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'justify',
  },

  rodape: {
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    fontSize: 14,
  },
}); 

export default styles;
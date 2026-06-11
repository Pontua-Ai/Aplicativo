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
  conteiner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 15,
  },
  coala: {
    width: 45,
    height: 75,
  },
  quadrado: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#343a40',
    margin: 10,
    borderRadius: 20
  },
  botao: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 20,
    backgroundColor: '#0B9395',
    margin: 10,
    borderRadius: 10,
    marginTop: 6
  },
  botaoTextoMat: {
    color: '#fff',
    fontSize: 11,
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
    borderColor: '#343a40'
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
  }
});

export default styles;
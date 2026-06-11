import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  formulario: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },

  header: {
    alignItems: 'center',
    marginBottom: 50,
  },

  logo: {
    width: 220,
    height: 70,
    resizeMode: 'contain',
  },

  textGray: {
    color: '#8A8A8A',
    fontSize: 16,
    marginTop: 15,
  },

  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#1C1C1E',
    height: 55,
    borderRadius: 14,
    paddingHorizontal: 18,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },

  botao: {
    backgroundColor: '#4ECDE2',
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 4,
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
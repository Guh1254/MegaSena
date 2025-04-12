import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Resultado = ({ numerosSorteados, numerosUsuario, resultado }) => {
  const renderBolinhasSorteadas = () => {
    return numerosSorteados.map((num, index) => (
      <View 
        key={index} 
        style={[
          estilos.bolinha,
          numerosUsuario.includes(num) && estilos.bolinhaAcerto
        ]}
      >
        <Text style={estilos.textoBolinha}>{num}</Text>
      </View>
    ));
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Resultado</Text>
      
      <Text style={estilos.subtitulo}>Números Sorteados:</Text>
      <View style={estilos.numerosContainer}>
        {renderBolinhasSorteadas()}
      </View>

      <Text style={[estilos.resultado, estilos.destaque]}>{resultado}</Text>
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0066b3',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  numerosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 15,
  },
  bolinha: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  bolinhaAcerto: {
    backgroundColor: '#4CAF50',
  },
  textoBolinha: {
    color: '#333',
    fontWeight: 'bold',
  },
  resultado: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  destaque: {
    fontWeight: 'bold',
    color: '#0066b3',
    fontSize: 20,
  },
});

export default Resultado;
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Resultado from './componentes/Resultado';

const gerarNumerosAleatorios = () => {
  const numeros = [];
  while (numeros.length < 6) {
    const num = Math.floor(Math.random() * 60) + 1;
    if (!numeros.includes(num)) {
      numeros.push(num);
    }
  }
  return numeros.sort((a, b) => a - b);
};

export default function App() {
  const [numerosSelecionados, setNumerosSelecionados] = useState([]);
  const [numerosSorteados, setNumerosSorteados] = useState([]);
  const [resultado, setResultado] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const selecionarNumero = (numero) => {
    if (numerosSelecionados.includes(numero)) {
      setNumerosSelecionados(numerosSelecionados.filter(n => n !== numero));
    } else {
      if (numerosSelecionados.length < 6) {
        setNumerosSelecionados([...numerosSelecionados, numero].sort((a, b) => a - b));
      } else {
        Alert.alert('Atenção', 'Você só pode selecionar 6 números');
      }
    }
  };

  const verificarNumeros = () => {
    if (numerosSelecionados.length !== 6) {
      Alert.alert('Atenção', 'Por favor, selecione 6 números');
      return;
    }

    const sorteados = gerarNumerosAleatorios();
    setNumerosSorteados(sorteados);

    const acertos = numerosSelecionados.filter(num => sorteados.includes(num)).length;

    if (acertos === 6) {
      setResultado('SENA! Você acertou todos os 6 números!');
    } else if (acertos === 5) {
      setResultado('QUINA! Você acertou 5 números!');
    } else if (acertos === 4) {
      setResultado('QUADRA! Você acertou 4 números!');
    } else {
      setResultado('Não ganhou desta vez. Tente novamente!');
    }

    setMostrarResultado(true);
  };

  const renderBolinhas = () => {
    const bolinhas = [];
    for (let i = 1; i <= 60; i++) {
      bolinhas.push(
        <TouchableOpacity
          key={i}
          style={[
            estilos.bolinha,
            numerosSelecionados.includes(i) && estilos.bolinhaSelecionada
          ]}
          onPress={() => selecionarNumero(i)}
        >
          <Text style={estilos.textoBolinha}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return bolinhas;
  };

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.titulo}>Mega Sena</Text>
      <Text style={estilos.instrucoes}>Selecione 6 números</Text>

      <View style={estilos.numerosContainer}>
        {renderBolinhas()}
      </View>

      <Text style={estilos.selecionados}>
        Números selecionados: {numerosSelecionados.join(', ')}
      </Text>

      <TouchableOpacity 
        style={estilos.botao} 
        onPress={verificarNumeros}
        disabled={numerosSelecionados.length !== 6}
      >
        <Text style={estilos.textoBotao}>Sortear Números</Text>
      </TouchableOpacity>

      {mostrarResultado && (
        <Resultado 
          numerosSorteados={numerosSorteados} 
          numerosUsuario={numerosSelecionados} 
          resultado={resultado} 
        />
      )}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
    paddingTop: 50,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0066b3',
    marginBottom: 10,
  },
  instrucoes: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
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
  bolinhaSelecionada: {
    backgroundColor: '#0066b3',
  },
  textoBolinha: {
    color: '#333',
    fontWeight: 'bold',
  },
  selecionados: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  botao: {
    backgroundColor: '#0066b3',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginVertical: 15,
    opacity: 1,
  },
  textoBotao: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
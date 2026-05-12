import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import {
  Provider as PaperProvider,
  MD3DarkTheme,
  Button,
  Text,
  Surface,
} from 'react-native-paper';

const { width } = Dimensions.get('window');

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#9D4EDD',
    secondary: '#C77DFF',
    background: '#0D0D0D',
    surface: '#1A1A1A',
  },
};

export default function App() {
  const [display, setDisplay] = useState('');

  const adicionarValor = (valor) => {
    setDisplay(display + valor);
  };

  const limpar = () => {
    setDisplay('');
  };

  const apagarUltimo = () => {
    setDisplay(display.slice(0, -1));
  };

  const calcular = () => {
    try {
      const resultado = eval(display).toString();
      setDisplay(resultado);
    } catch {
      setDisplay('Erro');
    }
  };

  const botoes = [
    ['C', '⌫', '/', '*'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.'],
  ];

  const renderBotao = (item) => {
    const operador = ['/', '*', '-', '+', '='].includes(item);

    const especial = ['C', '⌫'].includes(item);

    let estilo = styles.botaoNumero;

    if (operador) estilo = styles.botaoOperador;
    if (especial) estilo = styles.botaoEspecial;

    const onPress = () => {
      if (item === 'C') {
        limpar();
      } else if (item === '⌫') {
        apagarUltimo();
      } else if (item === '=') {
        calcular();
      } else {
        adicionarValor(item);
      }
    };

    return (
      <Button
        key={item}
        mode="contained"
        style={estilo}
        contentStyle={styles.botaoConteudo}
        labelStyle={styles.botaoTexto}
        onPress={onPress}
      >
        {item}
      </Button>
    );
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>

        <View style={styles.topo}>
          <Text style={styles.titulo}>
            Calculadora
          </Text>

          <Text style={styles.subtitulo}>
            React Native Paper
          </Text>
        </View>

        <Surface style={styles.display} elevation={5}>
          <Text
            numberOfLines={2}
            adjustsFontSizeToFit
            style={styles.displayTexto}
          >
            {display || '0'}
          </Text>
        </Surface>

        <View style={styles.teclado}>
          {botoes.map((linha, index) => (
            <View style={styles.linha} key={index}>
              {linha.map(renderBotao)}
            </View>
          ))}
        </View>

      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 30,
  },

  topo: {
    marginTop: 20,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
  },

  subtitulo: {
    color: '#BDBDBD',
    fontSize: 16,
    marginTop: 4,
  },

  display: {
    backgroundColor: '#161616',
    borderRadius: 30,
    padding: 25,
    minHeight: 160,
    justifyContent: 'flex-end',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#2B2B2B',
  },

  displayTexto: {
    color: '#FFFFFF',
    fontSize: width * 0.12,
    textAlign: 'right',
    fontWeight: '300',
  },

  teclado: {
    marginBottom: 10,
  },

  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  botaoNumero: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#232323',
  },

  botaoOperador: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#7B2CBF',
  },

  botaoEspecial: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#3A3A3A',
  },

  botaoConteudo: {
    height: 72,
  },

  botaoTexto: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
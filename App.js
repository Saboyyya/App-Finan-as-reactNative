import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';

import React, { useState } from 'react';

export default function App() {

  // estados
  const [entrada, setEntrada] = useState('');
  const [orcamento, setOrcamento] = useState(0);
  const [gasto, setGasto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [lista, setLista] = useState([]);

  // definir orçamento
  function definirOrcamento() {
    setOrcamento(Number(entrada));
    setEntrada('');
  }

  // limpar tudo
  function limpar() {
    setEntrada('');
    setOrcamento(0);
    setGasto('');
    setCategoria('');
    setLista([]);
  }

  // adicionar gasto
  function adicionarGasto() {
    const valor = Number(gasto);

    if (!valor || !categoria) {
      alert("Preencha o valor e escolha uma categoria");
      return;
    }

    if (valor > orcamento) {
      alert("Saldo insuficiente!");
      return;
    }

    // atualizar saldo
    setOrcamento(orcamento - valor);

    // salvar histórico
    setLista([
      ...lista,
      {
        valor,
        categoria
      }
    ]);

    setGasto('');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.titulo}>💰 App de Finanças</Text>

        {/* ORÇAMENTO */}
        <TextInput
          style={styles.input}
          placeholder="Digite seu orçamento"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          onChangeText={setEntrada}
          value={entrada}
        />

        <TouchableOpacity style={styles.botao} onPress={definirOrcamento}>
          <Text style={styles.textoBotao}>Definir Orçamento</Text>
        </TouchableOpacity>

        <Text style={styles.saldo}>
          Saldo: R$ {orcamento}
        </Text>

        {/* CATEGORIAS */}
        <View style={styles.categorias}>
          <TouchableOpacity 
            onPress={() => setCategoria('🍔 Alimentação')}
            style={[styles.catBtn, categoria === '🍔 Alimentação' && styles.selecionado]}
          >
            <Text style={styles.icone}>🍔</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setCategoria('🚗 Transporte')}
            style={[styles.catBtn, categoria === '🚗 Transporte' && styles.selecionado]}
          >
            <Text style={styles.icone}>🚗</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setCategoria('🎮 Lazer')}
            style={[styles.catBtn, categoria === '🎮 Lazer' && styles.selecionado]}
          >
            <Text style={styles.icone}>🎮</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.categoriaTexto}>
          Categoria: {categoria}
        </Text>

        {/* GASTO */}
        <TextInput
          style={styles.input}
          placeholder="Digite o valor do gasto"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          onChangeText={setGasto}
          value={gasto}
        />

        <TouchableOpacity style={styles.botao} onPress={adicionarGasto}>
          <Text style={styles.textoBotao}>Adicionar Gasto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoVermelho} onPress={limpar}>
          <Text style={styles.textoBotao}>Limpar Tudo</Text>
        </TouchableOpacity>

        {/* HISTÓRICO */}
        <Text style={styles.subtitulo}>📋 Histórico</Text>

        {lista.map((item, index) => (
          <Text key={index} style={styles.item}>
            {item.categoria} - R$ {item.valor}
          </Text>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#1e1e2f'
  },

  container: {
    padding: 20,
    paddingTop: 30 // 👈 garante espaço extra no topo
  },

  titulo: {
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold'
  },

  saldo: {
    color: '#00ffcc',
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 15,
    fontWeight: 'bold'
  },

  input: {
    backgroundColor: '#2c2c3e',
    color: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  botao: {
    backgroundColor: '#00ffcc',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center'
  },

  botaoVermelho: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center'
  },

  textoBotao: {
    fontWeight: 'bold'
  },

  categorias: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15
  },

  catBtn: {
    padding: 10,
    borderRadius: 10
  },

  selecionado: {
    backgroundColor: '#00ffcc'
  },

  icone: {
    fontSize: 30
  },

  categoriaTexto: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 10
  },

  subtitulo: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10
  },

  item: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 16
  }

});
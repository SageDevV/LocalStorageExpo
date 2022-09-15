import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import NotaEditor from "./src/componentes/NotaEditor";
import { Nota } from "./src/componentes/Nota";
import { useEffect, useState } from "react";
import { criaTabela, buscarNotas } from "./src/services/Nota";

export default function App() {

  const [notas, setNotas] = useState([]);
  const [notaSelecionada, setNotaSelecionada] = useState({});

  useEffect(() => {
    criaTabela();
    mostraNotas();
  }, [])

  async function mostraNotas() {
    const todasNotas = await buscarNotas();
    setNotas(todasNotas);
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        renderItem={(nota) => <Nota {...nota} setNotaSelecionada={setNotaSelecionada} />}
        keyExtractor={nota => nota.id} />
      <NotaEditor mostraNotas={mostraNotas} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada} />
      <StatusBar />
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});


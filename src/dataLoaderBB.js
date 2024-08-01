import data from '../dados_bb.json'; // Importar o JSON diretamente

// Função para processar os dados JSON
function processData(data) {
  const labels = data.map(item => item.data_coleta);
  const bpmData = data.map(item => item.bpm);
  const movimentosData = data.map(item => item.movimentos);

  return {
    labels,
    bpmData,
    movimentosData
  };
}

// Processar os dados e exportar o objeto
const bb = processData(data);
export default bb;
import data from '../dados_mae.json'; // Importar o JSON diretamente

// Função para processar os dados JSON
function processData(data) {
  const labels = data.map(item => item.data_coleta);
  const baixaData = data.map(item => item.baixa);
  const altaData = data.map(item => item.alta);
  const glicemiaData = data.map(item => item.glicemia);
  const bpmData = data.map(item => item.bpm);

  return {
    labels,
    baixaData,
    altaData,
    glicemiaData,
    bpmData
  };
}

// Processar os dados e exportar o objeto
const mm = processData(data);
export default mm;
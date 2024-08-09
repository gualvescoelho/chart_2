import data from '../dados_bb.json'; // Importar o JSON diretamente


function processDateTime(dateTimeStr) {
  // Divida a string em data e hora
  const [date, time] = dateTimeStr.split(' ');

  // Converta para um objeto Date, ajustando para o formato ISO 8601
  const dateTime = new Date(`${date}T${time}:00`);

  return {
    date, // "yyyy-MM-dd"
    time, // "HH:mm"
    dateTime // Objeto Date
  };
}

// Função para processar os dados JSON
function processData(data) {
  const labels = data.map(item => item.data_coleta);
  const bpmData = data.map(item => item.bpm);
  const movimentosData = data.map(item => item.movimentos);

  // Processa cada string de data e hora usando processDateTime
  const dates = labels.map(processDateTime);

  return {
    dates,
    bpmData,
    movimentosData
  };
}

// Processar os dados e exportar o objeto
const bb = processData(data);
export default bb;
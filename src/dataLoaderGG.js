import datas from '../dados_gestante2.json'; // Importar o JSON diretamente

// Função para processar os dados JSON
// Função para processar cada string de data e hora
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

function processMedia(altaData, baixaData) {
  return altaData.map((alta, index) => (2 * baixaData[index] + alta) / 3);
}


// Função principal para processar os dados
function processData(data) {
  // Mapeia cada item para obter as strings de data e hora
  const labels = data.map(item => item.data_coleta);
  const baixaData = data.map(item => item.baixa);
  const altaData = data.map(item => item.alta);
  const glicemiaData = data.map(item => item.glicemia);
  const bpmData = data.map(item => item.bpm);

  const mediaPressao = processMedia(altaData,baixaData);

  // Processa cada string de data e hora usando processDateTime
  const dates = labels.map(processDateTime);

  return {
    dates,
    mediaPressao,
    baixaData,
    altaData,
    glicemiaData,
    bpmData
  };
}

const gg = processData(datas);
export default gg;
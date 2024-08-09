import Chart from 'chart.js/auto';
import bb from './dataLoaderBB.js'; // Supondo que esses módulos sejam necessários
import mm from './dataLoaderMM.js'; // Supondo que esses módulos sejam necessários
import gg from './dataLoaderGG.js'; // Dados principais

(async function() {
  // Função para converter "HH:mm" para minutos desde a meia-noite
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const interval_time = 1;

  // Função para converter minutos desde a meia-noite para "HH:mm"
  const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(interval_time, '0')}:${mins.toString().padStart(interval_time, '0')}`;
  };

  // Obter a hora atual
  const now = new Date();
  const currentTimeStr = minutesToTime(now.getHours() * 60 + now.getMinutes());
  
  // Definir o intervalo de 2 horas antes e depois da hora atual
  const twoHoursInMinutes = interval_time * 60;
  const currentTimeInMinutes = timeToMinutes(currentTimeStr);
  const startTimeInMinutes = currentTimeInMinutes - twoHoursInMinutes;
  const endTimeInMinutes = currentTimeInMinutes + twoHoursInMinutes;

  // Filtrar os dados para a data específica e dentro do intervalo de tempo
  const dataForDate = gg.dates.filter(date => date.date === '2024-07-07');
  const filteredData = dataForDate.filter(data => {
    const timeInMinutes = timeToMinutes(data.time);
    return timeInMinutes >= startTimeInMinutes && timeInMinutes <= endTimeInMinutes;
  });

  // Ordenar pelo campo 'time'
  const sortedFilteredData = filteredData.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

  // Extrair labels e dados ordenados
  const labels = sortedFilteredData.map(data => data.time);
  const mediaPressaoData = sortedFilteredData.map((_, index) => gg.mediaPressao[index]); // Ajustar conforme necessário
  const glicemiaData = sortedFilteredData.map((_, index) => gg.glicemiaData[index]); // Ajustar conforme necessário
  const bpmData = sortedFilteredData.map((_, index) => gg.bpmData[index]); // Ajustar conforme necessário

  // Exibir os resultados
  console.log('Filtered and Sorted Data:', sortedFilteredData);

  // Gráfico de linha para dados BPM
  new Chart(
    document.getElementById('acquisitionsArea'),
    {
      type: 'line',
      options: {
        animation: false,
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            enabled: true
          }
        }
      },
      data: {
        labels: labels,
        datasets: [
          {
            label: 'BPM Data',
            data: bpmData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor do preenchimento
            borderColor: 'rgba(75, 192, 192, 1)', // Cor da linha
            fill: false // Preencher a área abaixo da linha
          }
        ]
      }
    }
  );

  // Gráfico de linha para pressão arterial
  new Chart(
    document.getElementById('acquisitionsLine'),
    {
      type: 'line',
      options: {
        animation: false,
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            enabled: true
          }
        }
      },
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Pressão Arterial',
            data: mediaPressaoData,
            borderColor: 'rgba(255, 99, 132, 1)', // Cor da linha
            fill: false // Não preencher a área abaixo da linha
          }
        ]
      }
    }
  );

  // Gráfico de barras para glicemia
  new Chart(
    document.getElementById('acquisitionsBar'),
    {
      type: 'line',
      options: {
        animation: false,
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            enabled: true
          }
        }
      },
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Glicemia',
            data: glicemiaData,
          }
        ]
      }
    }
  );
})();

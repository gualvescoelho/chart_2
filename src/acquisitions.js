import Chart from 'chart.js/auto'
import bb from './dataLoaderBB.js'
import mm from './dataLoaderMM.js'
import gg from './dataLoaderGG.js'

// async function fetchData() {
//     const response = await fetch('../dados_bb.json');
//     const data = await response.json();
//     return data;
// }

(async function() {
    // const datajson = await fetchData();

    // Extrair labels (data_coleta) e datasets (bpm, movimentos)
    // const labels = data.map(item => item.data_coleta);
    // const bpmData = data.map(item => item.bpm);
    // const movimentosData = data.map(item => item.movimentos);

  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  console.log(gg.dates.data);

  // console.log("dados BB")

  // console.log('BB dates:', bb.dates);
  // console.log('BB bpm:', bb.bpmData);
  // console.log('BB movimentos:', bb.movimentosData);

  // console.log("Dados mae")

  // console.log('Labels:', mm.labels);
  //   console.log('Baixa Data:', mm.baixaData);
  //   console.log('Alta Data:', mm.altaData);
  //   console.log('Glicemia Data:', mm.glicemiaData);
  //   console.log('BPM Data:', mm.bpmData);
   new Chart(
    document.getElementById('acquisitionsArea'),
    {
      type: 'line',
      options: {
        animation: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      },
      data: {
        labels: gg.dates.data,
        datasets: [
          {
            label: 'Acquisitions by year',
            data: bb.bpmData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor do preenchimento
            fill: true // Preencher a área abaixo da linha
          }
        ]
      }
    }
  );

  new Chart(
    document.getElementById('acquisitionsLine'),
    {
      type: 'line',
      options: {
        animation: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      },
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count)
          }
        ]
      }
    }
  );

  new Chart(
    document.getElementById('acquisitionsBar'),
    {
      type: 'bar',
      options: {
        animation: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      },
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count),
          }
        ]
      }
    }
  );

})();
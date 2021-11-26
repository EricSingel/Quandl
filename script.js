const API_KEY = 'ZT9zbksxz3axS6muNArG';
let ctxL = document.getElementById('lineChart').getContext('2d');
let myLineChart = new Chart(ctxL, drawChart());

function drawChart() {
  return {
    type: 'bar',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Mittelwert',
          data: [0],
          backgroundColor: ['rgba(150, 154, 255, .8)'],
          borderColor: ['rgba(13, 24, 255, 1)'],
          borderWidth: 2,
        },
        {
          label: 'Niedrigster Wert',
          data: [0],
          backgroundColor: ['rgba(250, 255, 142, .8)'],
          borderColor: ['rgba(244, 255, 0, 1)'],
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
    },
  };
}
async function loadCourse() {
  let from = document.getElementById('from').value;
  // let fromToDate = new Date(from);
  let to = document.getElementById('to').value;
  // let toToDate = new Date(to);
  // let days = getDays(fromToDate, toToDate);
  let url = `https://data.nasdaq.com/api/v3/datasets/BITFINEX/LUNAF0USTF0?start_date=${from}&end_date=${to}&api_key=ZT9zbksxz3axS6muNArG`;
  let response = await fetch(url);
  let responseAsJson = await response.json();
  updateChart(responseAsJson);
}

// function getDays(from, to) {
//   let difference = Math.abs(to - from);
//   let days = difference / (1000 * 60 * 60 * 24);

//   return days;
// }

function updateChart(responseAsJson) {
  let dataLength = responseAsJson.dataset.data.length;
  let data = responseAsJson.dataset.data;
  let lineChartDataFirst = myLineChart.data.datasets[0].data;
  let lineChartDataSecond = myLineChart.data.datasets[1].data;
  let lineChartLabels = myLineChart.data.labels;

  removeData(myLineChart, 100);

  for (let i = 0; i < dataLength; i++) {
    lineChartDataFirst[i] = data[i][3];
    lineChartDataSecond[i] = data[i][2];
    lineChartLabels[i] = data[i][0];
  }

  lineChartDataFirst = lineChartDataFirst.reverse();
  lineChartDataSecond = lineChartDataSecond.reverse();
  lineChartLabels = lineChartLabels.reverse();
  myLineChart.update();
}

function removeData(chart, length) {
  for (let i = 0; i < length; i++) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chart.update();
  }
}

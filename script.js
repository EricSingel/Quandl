const API_KEY = 'ZT9zbksxz3axS6muNArG';
var ctxL = document.getElementById('lineChart').getContext('2d');
var myLineChart = new Chart(ctxL, drawChart());
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
  let fromToDate = new Date(from);
  let to = document.getElementById('to').value;
  let toToDate = new Date(to);
  let days = getDays(fromToDate, toToDate);
  // console.log(to.getDate() - from.getDate());
  let url = `https://data.nasdaq.com/api/v3/datasets/BITFINEX/LUNAF0USTF0?start_date=${from}&end_date=${to}&api_key=ZT9zbksxz3axS6muNArG`;
  let response = await fetch(url);
  let responseAsJson = await response.json();
  let dataLength = responseAsJson.dataset.data.length;
  let data = responseAsJson.dataset.data;
  console.log('API answers:', responseAsJson);

  for (let i = 0; i < dataLength; i++) {
    let lineChartDataFirst = myLineChart.data.datasets[0];
    let lineChartDataSecond = myLineChart.data.datasets[1];
    let lineChartLabels = myLineChart.data.labels;
    lineChartDataFirst.data[i] = data[i][3];
    lineChartDataSecond.data[i] = data[i][2];
    lineChartLabels[i] = i;
  }
  myLineChart.update();
}

function getDays(from, to) {
  let difference = Math.abs(to - from);
  let days = difference / (1000 * 60 * 60 * 24);

  return days;
}

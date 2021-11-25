const API_KEY = 'ZT9zbksxz3axS6muNArG';

async function loadCourse() {
  let url =
    'https://data.nasdaq.com/api/v3/datasets/BITFINEX/LUNAF0USTF0?start_date=2021-11-18&end_date=2021-11-18&api_key=ZT9zbksxz3axS6muNArG';
  let response = await fetch(url);
  let responseAsJson = await response.json();
  console.log('API answers:', responseAsJson);
  // ['dataset']['data'][0]
}

var ctxL = document.getElementById('lineChart').getContext('2d');
var myLineChart = new Chart(ctxL, {
  type: 'bar',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: ['rgba(150, 154, 255, .8)'],
        borderColor: ['rgba(13, 24, 255, 1)'],
        borderWidth: 2,
      },
      {
        label: 'My Second dataset',
        data: [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: ['rgba(0, 137, 132, .2)'],
        borderColor: ['rgba(0, 10, 130, .7)'],
        borderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
  },
});

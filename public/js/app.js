console.log('Client')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const iconWeather = document.querySelector('#icon-weather');

messageOne.textContent = 'Loading ...';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  fetch('/weather?q=' + location)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = `City is  ${data.address}.`;
          messageTwo.textContent = `The temperature ${data.temperature}C. Feels like : ${data.feels_like}C.`;
          messageThree.textContent = `Humidity: ${data.humidity}%. Wind: ${data.wind} km/h. ${data.description}  `
          iconWeather.src = `http://openweathermap.org/img/w/${data.weather_icons}.png`;
        }
      })
    })
})
console.log('Client')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const iconWeather = document.querySelector('#icon-weather');

// messageOne.textContent = '';
messageOne.textContent = 'Loading ...';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  fetch('/weather?address=' + location)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = `City is  ${data.location}`
          messageTwo.textContent = `The temperature ${data.temperature}C.
          Feelslike : ${data.feelslike}C. ${data.weather_descriptions}`;
          iconWeather.src = data.weather_icons;
        }
      })
    })
})
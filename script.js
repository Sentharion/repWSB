const input = document.querySelector('input');
const button = document.querySelector('button');
const errMSG = document.querySelector('p.error_message');
const cityName = document.querySelector('h2.city_name');
const weatherIMG = document.querySelector('img.weather_img');
const temperature = document.querySelector('p.temp');
const description = document.querySelector('p.description');
const feels_like = document.querySelector('span.feels_like');
const pressure = document.querySelector('span.pressure');
const humidity = document.querySelector('span.humidity');
const wind_speed = document.querySelector('span.wind_speed');
const coluds = document.querySelector('span.clouds');
const visibility = document.querySelector('span.visibility');
const pollutionImg = document.querySelector('img.pollution_img');
const pollutionValue = document.querySelector('span.pollution_value');

const apiInfo = {
    link: 'https://api.openweathermap.org/data/2.5/weather?q=',
    key: '&appid=c585f2e25e65f2adc14e14aff662709a',
    units: '&units=metric',
    lang: '&lang=pl'
}

function getWeatherInfo() {
    const apiInfoCity = input.value;
    const URL = `${apiInfo.link}${apiInfoCity}${apiInfo.key}${apiInfo.units}${apiInfo.lang}`
    //console.log(URL);

    axios.get(URL).then((response) => {
        //console.log(response.data);

        cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
        weatherIMG.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        temperature.textContent = `${Math.round(response.data.main.temp)}℃`;
        description.textContent = `${response.data.weather[0].description}`;
        feels_like.textContent = `${Math.round(response.data.main.feels_like)}℃`;
        pressure.textContent = `${response.data.main.pressure} hPa`;
        humidity.textContent = `${response.data.main.humidity}%`;
        wind_speed.textContent = `${response.data.wind.speed * 3, 6} km/h`;
        visibility.textContent = `${response.data.visibility / 1000} km`;
        coluds.textContent = `${response.data.clouds.all}%`;
        errMSG.textContent = "";

        const url_pollution = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}${apiInfo.key}`;
        axios.get(url_pollution).then((res) => {
            //console.log(res.data);

            pollutionValue.textContent = `${res.data.list[0].components.pm2_5}`;


            const pollutionValueNumber = res.data.list[0].components.pm2_5;
            console.log(pollutionValueNumber)

            if (pollutionValueNumber < 10) {
                pollutionImg.style.backgroundColor = 'green';
            }
            else if (pollutionValueNumber >= 10 && pollutionValueNumber < 25) {
                pollutionImg.style.backgroundColor = 'yellowgreen';
            }
            else if (pollutionValueNumber >= 25 && pollutionValueNumber < 50) {
                pollutionImg.style.backgroundColor = 'yellow';

            }
            else if (pollutionValueNumber >= 50 && pollutionValueNumber < 75) {
                pollutionImg.style.backgroundColor = 'orange';
            }
            else {
                pollutionImg.style.backgroundColor = 'red';
            }
        })

    }).catch((error) => {
        errMSG.textContent = `${error.response.data.message}`;
        [cityName, temperature, description, feels_like, wind_speed, humidity, visibility, coluds, pressure].forEach(el => {
            el.textContent = "";
        })
        weatherIMG.src = '';
    }).finally(() => {
        input.value = '';
    })
}

function getWeatherInfoByEnter(e) {
    if (e.key === 'Enter') {
        getWeatherInfo();
    }
}

button.addEventListener('click', getWeatherInfo);
input.addEventListener('keypress', getWeatherInfoByEnter);
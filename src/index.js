import './style.css';
import iconSrc from './logo_white_cropped.png';

const icon = new Image();
icon.src = iconSrc;
icon.setAttribute('id', 'icon');
const header = document.querySelector('header');
header.prepend(icon);

const onSubmit = function(event) {
    event.preventDefault();
    const search = searchInput.value;
    searchInput.value = '';
    weatherApi.queryCityName(search).then((data) => console.log(data));
};

const searchForm = document.querySelector('form#search');
searchForm.addEventListener('submit', onSubmit);
const searchInput = document.getElementById('search-box');


const weatherApi = (function() {
    const apiKey = 'a6fb94b0479663119d883f5691dcff36';

    const queryWeather = function(lat, lon, mode='forecast') {
        if (['forecast', 'current'].includes(mode)) {
            if (mode === 'current') mode = 'weather'
        } else throw Error(`Invalid argument: ${mode}`)

        const dataPr = fetch(
            `https://api.openweathermap.org/data/2.5/${mode}?lat=${lat}&lon=${lon}&appid=${apiKey}`,
            { mode: 'cors'}
        )
        .then((response) => response.json())
        .then((response) => response);
        return dataPr;
    };

    const queryCityName = function(locStr) {
        locStr = locStr || 'Guadalajara';
        const dataPr = fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${locStr}&appid=${apiKey}`,
            { mode: 'cors'}
        )
        .then((response) => response.json())
        .then((searchArray) => {
            return queryWeather(searchArray[0].lat, searchArray[0].lon);
        });

        return dataPr;
    }

    return { queryCityName };

})();

//const data = weatherApi.queryCityName().then((data) => console.log(data));
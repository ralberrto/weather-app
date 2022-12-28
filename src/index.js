import './style.css';

const apiKey = 'a6fb94b0479663119d883f5691dcff36';
const queryWeather = function(lat, lon, mode='current') {
    if (['forecast', 'current'].includes(mode)) {
        if (mode === 'current') mode = 'weather'
    } else throw Error(`Invalid argument: ${mode}`)

    fetch(
        `https://api.openweathermap.org/data/2.5/${mode}?lat=${lat}&lon=${lon}&appid=${apiKey}`,
        { mode: 'cors'}
    )
    .then((response) => response.json())
    .then((response) => console.log(response));
};

const queryCityName = function(locStr) {
    locStr = locStr || 'Guadalajara';
    fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${locStr}&appid=${apiKey}`,
        { mode: 'cors'}
    )
    .then((response) => response.json())
    .then((response) => {
        const lat = response[0].lat;
        const lon = response[0].lon;
        console.log(lat, lon);
        const coordinates = { lat: lat, lon: lon };
        queryWeather(coordinates.lat, coordinates.lon);
    });
}

queryCityName();
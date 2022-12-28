import './style.css';

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

const data = queryCityName().then((data) => console.log(data));
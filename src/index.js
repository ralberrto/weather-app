import './style.css';

const queryCityName = function(locStr) {
    const apiKey = 'a6fb94b0479663119d883f5691dcff36';
    locStr = locStr || 'Guadalajara';
    fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${locStr}&appid=${apiKey}`,
        { mode: 'cors'}
    )
    .then((response) => response.json())
    .then((response) => console.log(response));
}

queryCityName();
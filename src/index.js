import './style.css';
import iconSrc from './logo_white_cropped.png';

const icon = new Image();
icon.src = iconSrc;
icon.setAttribute('id', 'icon');
const header = document.querySelector('header');
header.prepend(icon);

const mainCont = document.getElementById('main-container');

const onSubmit = function(event) {
    event.preventDefault();
    const search = searchInput.value;
    searchInput.value = '';
    weatherApi.queryCityName(search).then((entryList) => {
        if (entryList.length > 1) {
            const domList = DomGenerator.createEntryList(entryList);
            mainCont.appendChild(domList);
        } else if (entryList.length == 1) {
            weatherApi.queryWeather(entryList[0].lat, entryList[0].lon, 'current')
                .then((response) => console.log(response));
        }
    });
};

const searchForm = document.querySelector('form#search');
searchForm.addEventListener('submit', onSubmit);
const searchInput = document.getElementById('search-box');

const DomGenerator = (function() {

    const _appendChildren = function(target, children) {
        const elements = Array.prototype.slice.call(arguments, 1);
        for (let element of elements) {
            target.appendChild(element);
        }
    };

    const createEntryList = function(entryList) {
        const list = document.createElement('ul');
        entryList.forEach((entry) => {
            const domEntry = createEntry(
                entry.name,
                entry.country,
                entry.lat,
                entry.lon
            );
            list.appendChild(domEntry);
        });
        return list;
    };

    const createEntry = function(city, country, lat, lon) {
        const entryCont = document.createElement('li');
        entryCont.className = 'search-entry';

        const entryCity = document.createElement('p');
        entryCity.className = 'entry-city';
        entryCity.textContent = city;

        const entryCountry = document.createElement('p');
        entryCountry.className = 'entry-country';
        entryCountry.textContent = country;

        const entryCoord = document.createElement('ul');
        entryCoord.className = 'entry-coordinates';

        const latitude = document.createElement('li');
        latitude.className = 'entry-latitude';
        latitude.textContent = lat;

        const longitude = document.createElement('li');
        longitude .className = 'entry-longitude';
        longitude .textContent = lon;

        _appendChildren(entryCoord, latitude, longitude);
        _appendChildren(entryCont, entryCity, entryCountry, entryCoord);

        return entryCont;
    };

    return {
        createEntryList,
    }
})();

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
            return searchArray;
        });

        return dataPr;
    }

    return { queryCityName, queryWeather };

})();

//const data = weatherApi.queryCityName().then((data) => console.log(data));
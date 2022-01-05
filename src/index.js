import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const countryNameEL = document.querySelector('#search-box');
const btn = document.querySelector('button');

let getCountryName = '';


function fetchCountries(name) {
    // console.log(`Запрос на https://restcountries.com/v3.1/name/${name} отправлен, ожижаем результат.`)
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(data => {
        return data.json()
    }).then(response => {
        console.log(response)
    });
    
}; 

function onInputChange (event) {
    getCountryName = event.target.value;
    console.log(getCountryName);
};



countryNameEL.addEventListener('input', onInputChange); 

btn.addEventListener('click', () => {
    fetchCountries(getCountryName);
});
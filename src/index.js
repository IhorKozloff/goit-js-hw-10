import './css/styles.css';
import template from './main.hbs'
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const countryNameEL = document.querySelector('#search-box');


function fetchCountries(name) {
    let countriesObject = {};
    fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
        return response.json();
    }).then(result => {
       console.log(result);
        
    });  
}; 

function onInputChange (event) {

    const countryName = event.target.value;

    console.log(countryName);

    fetchCountries(countryName);
};

countryNameEL.addEventListener('input', debounce(onInputChange, 2000)); 

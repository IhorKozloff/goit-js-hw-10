import { create } from 'lodash';
import './css/styles.css';
import countryTemplates from '../src/main.hbs'
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const countryNameEL = document.querySelector('#search-box');


const searchCountries = {

    countriesObject: {},

    startSearch(downloadName) {
        fetchCountries(downloadName);
    },

    generatePage: {
        
    },

};
function fetchCountries(name) {
    fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(response => {
        return response.json();
    }).then(result => {
       console.log(result);
result.forEach(item => {
    const newItem = item;
    newItem.stringOflanguages = Object.values(item.languages).join(", ")
    const murkUp = countryTemplates(newItem);
    console.log(murkUp)
})
    });  
}; 





function onInputChange (event) {

    const countryName = event.target.value;

    console.log(countryName);

    searchCountries.startSearch(countryName);
    
};

countryNameEL.addEventListener('input', debounce(onInputChange, 2000)); 

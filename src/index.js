import { create } from 'lodash';
import './css/styles.css';
import severalCountriesTemplates from '../src/several-countries.hbs'
import oneCountryTemplates from '../src/one-country.hbs'
import Notiflix from 'notiflix';
import apiCountriesInfoService from './fetchCountriesAPI-Service'

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const refs = {
    countryNameEL: document.querySelector('#search-box'),
    countryListEl: document.querySelector('.country-list'),
};

const fetchCountriesObjectFunction = {

    murkUp: '',
    newItem: {},

    start (nameForStart) {
        apiCountriesInfoService(nameForStart).then(this.distribution).catch(this.onCatchError)  
        
    },

    distribution (distributionObject) {
        console.log(distributionObject)
        if (distributionObject.length === 1) {

            fetchCountriesObjectFunction.singlePresentation(distributionObject); 

        } if (distributionObject.length > 1 && distributionObject.length < 10) {

            fetchCountriesObjectFunction.multiplePresentation(distributionObject);

        } if (distributionObject.length > 10) {
 
            fetchCountriesObjectFunction.exceedingResult();
        }
    },

    singlePresentation (distributionResult) {
        this.murkUp = '';
        distributionResult.forEach(item => {

            this.newItem = item;
            this.newItem.stringOflanguages = Object.values(item.languages).join(", ");
            this.murkUp = oneCountryTemplates(this.newItem);
        });
        this.innerFunction(this.murkUp);
    },
    

    multiplePresentation (distributionResult) {

        this.murkUp = '';
        distributionResult.forEach(item => {
            this.newItem = item;
            this.newItem.stringOflanguages = Object.values(item.languages).join(", ");
            this.murkUp += severalCountriesTemplates(this.newItem);
        });
        this.innerFunction(this.murkUp);
    },

    exceedingResult () {

        this.innerFunction('');
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    },

    innerFunction (innerMurkUp) {

        refs.countryListEl.innerHTML = innerMurkUp;

    },
    
    onCatchError () {
        // this.innerFunction('');
        Notiflix.Notify.failure("Oops, there is no country with that name");
    },

};



function onInputChange (event) {

    const countryName = event.target.value;

    if (countryName) {
        fetchCountriesObjectFunction.start(countryName);
    } else {
        fetchCountriesObjectFunction.innerFunction(''); 
    }
    
    
};

refs.countryNameEL.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY)); 

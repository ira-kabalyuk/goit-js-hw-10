import Notiflix from 'notiflix';
import './sass/main.scss';

import countryCardTpl from './templates/country-card.hbs';
import countryItemTpl from './templates/country-item.hbs';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';


const container = document.querySelector('.country-list')
const DEBOUNCE_DELAY = 300;
const INFO_MESSAGE = 'Too many matches found. Please enter a more specific name.'

const input = document.querySelector('#search-box');

input.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));


function renderCountryCard(country) {
  const cardMarkup = countryCardTpl(country);
  const itemMarkup = countryItemTpl(country);
 
  onLangeSearchValue(country, itemMarkup, cardMarkup);
}

function onSearchCountry(event) {
  const value = event.target.value;
  const inputValue = value.trim();
  console.log(inputValue);
  if (!inputValue) {
    return container.innerHTML = '';
  };


  fetchCountries(inputValue)
  .then(renderCountryCard)
  .catch(error => {console.log(error);
  }); 
};


function onLangeSearchValue(value, item, card) {
  if (value.length > 10) {
    Notiflix.Notify.info(INFO_MESSAGE);
    return container.innerHTML = '';
  } else if (value.length >=2 && value.length <= 10) {
    return container.innerHTML = item;
  } else if(value.length === 1) {
     return container.innerHTML = card;
  };
};


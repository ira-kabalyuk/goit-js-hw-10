import Notiflix from 'notiflix';

const COUNTRY_URL = 'https://restcountries.com/v3.1/name';
const FAIL_MESSAGE = 'Oops, there is no country with that name'

export const fetchCountries = function (name) {
  return fetch(`${COUNTRY_URL}/${name}?fields=name,capital,population,flags,languages`)
  .then(responce => {
    if (responce.ok) {
      return responce.json()
    }
    else {
      Notiflix.Notify.failure(FAIL_MESSAGE);
    }
  });
}

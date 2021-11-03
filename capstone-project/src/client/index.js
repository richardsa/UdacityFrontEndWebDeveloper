import { formSubmit } from './js/formHandler'
import { getCity } from './js/geoNames'
import { getWeather } from './js/weatherBit'
import { getImage } from './js/pixaBay'
import { getTrip } from './js/local-storage'
import { setTrip } from './js/local-storage'

import './styles/base.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/footer.scss'



export {
  formSubmit,
  getCity,
  getWeather,
  getImage,
  getTrip,
  setTrip
}


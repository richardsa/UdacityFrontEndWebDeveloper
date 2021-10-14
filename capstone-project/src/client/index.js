import { submitEventListener } from './js/formHandler'
import { urlValidator } from './js/urlChecker'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/form.scss'
import './styles/footer.scss'
import './styles/header.scss'

submitEventListener();

export {
    submitEventListener,
    urlValidator
}

import Authentiq from './lib/authentiq';
import PopupService from './lib/authentiq/services/popup';
export default Authentiq;

Authentiq.PopupService = PopupService;

window.Authentiq = Authentiq;

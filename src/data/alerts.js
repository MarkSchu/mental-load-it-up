import { ObservableVar } from 'utils/observable.js';

export const alerts = new ObservableVar();

alerts.creating = () => {
    alerts.set({type: 'creating', supertype: 'request'});
}

alerts.error = (msg) => {
    alerts.set({type: 'error', msg, supertype: 'response'});
}

alerts.success = (msg) => {
    alerts.set({type: 'error', msg, supertype: 'response'});
}

alerts.close = () => {
    alerts.set({type: 'close'})
}

import { ObservableVar } from 'utils/observable.js';

export const alerts = new ObservableVar();

alerts.creating = () => {
    alerts.set({type: 'creating'});
}

alerts.error = (msg) => {
    alerts.set({type: 'error', msg});
}

alerts.close = () => {
    alerts.set({type: 'close'})
}
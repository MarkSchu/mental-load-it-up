import { ObservableVar } from 'utils/observable.js';

export const alerts = new ObservableVar();

alerts.creating = () => {
    alerts.set({type: 'creating'});
}

alerts.loading = () => {
    alerts.set({type: 'loading'});
}

alerts.saving = () => {
    alerts.set({type: 'saving'});
}

alerts.error = (msg) => {
    alerts.set({type: 'error', msg});
}

alerts.success = (msg) => {
    alerts.set({type: 'error', msg});
}

alerts.close = () => {
    alerts.set({type: 'close'})
}

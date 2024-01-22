import { ObservableEvent } from 'utils/observable.js';

export const alerts = new ObservableEvent();

alerts.showSaving = () => {
    alerts.emit('saving', )
}
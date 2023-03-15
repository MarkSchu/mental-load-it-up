import { hasNoErrors } from 'utils/validation.js';

export class ObservableVar {

    constructor(value) {
        this.value = value;
        this.callbacks =[];
    }

    emit() {
        this.callbacks.forEach((callback) => {
            callback(this.value);
        });
    }

    onSet(callback) {
        this.callbacks.push(callback);
    }

    set(value) {
        this.value = value;
        this.emit();
    }
}

export class ObservableArray extends ObservableVar{
    push(value) {
        this.value.push(value);
        this.emit();
    }
}

export class ObservableBool extends ObservableVar{
    toggle() {
        this.value = !this.value;
        this.emit();
    }
}

export function observeAndCompute(observable, compute) {
    const newObservableVar = new ObservableVar();
    newObservableVar.set(compute(observable.value));
    observable.onSet((value) => {
        newObservableVar.set(compute(value));
    });
    return newObservableVar;
}

export function combineAndObserve() {
    const newObservableVar = new ObservableVar();
    const observableVars =  Array.from(arguments);
    observableVars.forEach((observable) => {
        observable.onSet(() => {
            const values = observableVars.map((observableVar) => {
                return observableVar.value;
            });
            newObservableVar.set(values)
        });
    });
    return newObservableVar;
}

export function combine(...observableVars) {
    const newObservableVar = new ObservableVar();
    observableVars.forEach((observable) => {
        observable.onSet(() => {
            const listOfValues = observableVars.map((observableVar) => {
                return observableVar.value;
            });
            newObservableVar.set(listOfValues)
        });
    });
    return newObservableVar;
}

export function combineAndCompute() {
    const newObservableVar = new ObservableVar();
    const observableVars =  Array.from(arguments);
    observableVars.forEach((observable) => {
        observable.onSet(() => {
            const values = observableVars.map((observableVar) => {
                return observableVar.value;
            });
            newObservableVar.set(values)
        });
    });
    return newObservableVar;
}

export function createFieldObservables(...validators) {
    const fieldObservables = [];
    const errorObservables = [];
    validators.forEach((validator) => {
        const field = new ObservableVar();
        const fieldErrors = observeAndCompute(field, validator);
        fieldObservables.push(field);
        errorObservables.push(fieldErrors);
    });
    const allErrors = combineAndObserve(...errorObservables);
    const isValid = observeAndCompute(allErrors, hasNoErrors);
    const result = fieldObservables.concat(errorObservables);
    result.push(isValid);
    return result;
}

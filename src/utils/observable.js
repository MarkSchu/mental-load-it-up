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

export class ObservableArray extends ObservableVar {
    push(value) {
        this.value.push(value);
        this.emit();
    }

    sort(callback) {
        this.value.sort(callback);
        this.emit();
    }

    replace(newItem) {
        const index = this.value.findIndex(item => item._id === newItem._id);
        if (index !== -1) {
            this.value.splice(index, 1, newItem);
            this.emit();
        }
    }
    
    remove(_id) {
        const index = this.value.findIndex(item => item._id === _id);
        if (index !== -1) {
            this.value.splice(index, 1);
            this.emit();
        }
    }
}

export class ObservableBool extends ObservableVar {
    toggle() {
        this.value = !this.value;
        this.emit();
    }
    true() {
        this.value = true;
        this.emit();
    }
    false() {
        this.value = false;
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

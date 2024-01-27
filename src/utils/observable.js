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

export class ObservableArray extends ObservableVar {
    push(value) {
        this.value.push(value);
        this.emit();
    }
    
    remove(_id) {
        const index = this.value.findIndex(item => item._id === _id);
        if (index !== -1) {
            this.value.splice(index, 1);
            this.emit();
        }
    }
}


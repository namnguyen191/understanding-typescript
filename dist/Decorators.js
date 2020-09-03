"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// DECORATORS IN THE END ARE JUST FUNCTIONS THAT RUN WHEN YOUR TARGET IS DEFINED
// CLASS DECORATOR
function Logger(logString) {
    console.log('LOGGER FACTORY');
    // Recommend to user upper case for naming
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    return function (_) {
        // We don't need constructor here so we just use _ for it
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
            hookEl.innerHTML = template;
        }
    };
}
function WithTemplate2(template, hookId) {
    console.log('TEMPLATE FACTORY');
    // ALTERING THE ORIGINAL CLASS USING THE RETURN STATEMENT
    return function (originalConstructor) {
        console.log('Rendering Template');
        return class extends originalConstructor {
            constructor(...args) {
                super();
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1').textContent = this.name;
                }
            }
        };
    };
}
// @Logger('LOGGING PERSON')
// The return function in the decorators opperate in the reverse order
let AnotherPerson = class AnotherPerson {
    constructor() {
        this.name = 'Max';
        console.log('Creating a person object!');
    }
};
AnotherPerson = __decorate([
    Logger('CREATING PERSON CLASS'),
    WithTemplate2('<h1>My name is Nam</h1>', 'root')
], AnotherPerson);
// const pers = new AnotherPerson();
// console.log(pers);
// PROPERTY DECORATOR
// HAS NO RETURN
function Log(target, propertyName) {
    console.log('Property decorator!');
    console.log(target, propertyName);
}
// ACCESSOR DECORATOR
function Log2(target, name, descriptor) {
    console.log('Accesor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
//METHOD DECORATOR
function Log3(target, name, descriptor) {
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
//PARAMETER DECORATOR
function Log4(target, name, position) {
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(title, price) {
        this.title = title;
        this._price = price;
    }
    set price(val) {
        if (val > 0)
            this._price = val;
        else
            throw new Error('Price cannot be less then 0');
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
const p1 = new Product('Book 1', 19);
const p2 = new Product('Book 2', 99);
function AutoBind(target, methodName, desc) {
    // Retrieve the orginal method
    const originalMethod = desc.value;
    const adjDesc = {
        configurable: true,
        enumerable: false,
        get() {
            // Since get will always and only trigger on the exact object this will make the this keyword always point to the right object
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    };
    // Replace the old descriptor
    return adjDesc;
}
class Printer {
    constructor() {
        this.message = 'This Work!';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    AutoBind
], Printer.prototype, "showMessage", null);
const p = new Printer();
p.showMessage();
const button = document.querySelector('button');
button.addEventListener('click', p.showMessage);
const registeredValidators = {};
function Required(msg) {
    console.log(msg);
    return function (target, propName) {
        registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['required', ...[propName]] });
    };
}
function PositiveNumber(target, propName) {
    console.log('PositiveNumber Decorator runs!');
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['positive'] });
}
function LengthGreaterThan(wantedLength) {
    return function (target, propName) {
        registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [wantedLength.toString(), ...[propName]] });
    };
}
function validate(obj) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    if (!!!obj[prop]) {
                        isValid = false;
                    }
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
            if (Number(validator)) {
                isValid = isValid && obj[prop].length > Number(validator);
            }
        }
    }
    return isValid;
}
class Course {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
}
__decorate([
    LengthGreaterThan(5),
    Required('This is required')
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('Invalid input, please try again!');
        return;
    }
    console.log(createdCourse);
});
//# sourceMappingURL=Decorators.js.map
// DECORATORS IN THE END ARE JUST FUNCTIONS THAT RUN WHEN YOUR TARGET IS DEFINED
// CLASS DECORATOR
function Logger(logString: string) {
    console.log('LOGGER FACTORY');

    // Recommend to user upper case for naming
    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

function WithTemplate(template: string, hookId: string) {
    return function (_: Function) {
        // We don't need constructor here so we just use _ for it
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
            hookEl.innerHTML = template;
        }
    };
}

function WithTemplate2(template: string, hookId: string) {
    console.log('TEMPLATE FACTORY');
    // ALTERING THE ORIGINAL CLASS USING THE RETURN STATEMENT
    return function <T extends { new (...args: any[]): { name: string } }>(
        originalConstructor: T
    ) {
        console.log('Rendering Template');
        return class extends originalConstructor {
            constructor(...args: any[]) {
                super();
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        };
    };
}

// @Logger('LOGGING PERSON')
// The return function in the decorators opperate in the reverse order
@Logger('CREATING PERSON CLASS')
@WithTemplate2('<h1>My name is Nam</h1>', 'root')
class AnotherPerson {
    name = 'Max';

    constructor() {
        console.log('Creating a person object!');
    }
}

// const pers = new AnotherPerson();
// console.log(pers);

// PROPERTY DECORATOR
// HAS NO RETURN
function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!');
    console.log(target, propertyName);
}

// ACCESSOR DECORATOR
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accesor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

//METHOD DECORATOR
function Log3(
    target: any,
    name: string | symbol,
    descriptor: PropertyDescriptor
) {
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

//PARAMETER DECORATOR
function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
        if (val > 0) this._price = val;
        else throw new Error('Price cannot be less then 0');
    }

    constructor(title: string, price: number) {
        this.title = title;
        this._price = price;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}

const p1 = new Product('Book 1', 19);
const p2 = new Product('Book 2', 99);

function AutoBind(target: any, methodName: string, desc: PropertyDescriptor) {
    // Retrieve the orginal method
    const originalMethod = desc.value;
    const adjDesc: PropertyDescriptor = {
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
    message = 'This Work!';

    @AutoBind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();
p.showMessage();
const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);

// DECORATORS FOR VALIDATION
interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[];
    };
}

const registeredValidators: ValidatorConfig = {};

function Required(msg: string) {
    console.log(msg);
    return function (target: any, propName: string) {
        registeredValidators[target.constructor.name] = {
            ...registeredValidators[target.constructor.name],
            [propName]: ['required']
        };
    };
}

function PositiveNumber(target: any, propName: string) {
    console.log('PositiveNumber Decorator runs!');

    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['positive']
    };
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @Required('This is required')
    title: string;
    @PositiveNumber
    price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this.price = price;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('Invalid input, please try again!');
        return;
    }
    console.log(createdCourse);
});

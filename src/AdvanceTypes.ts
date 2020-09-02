type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

// INTERSECTION TYPES
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
};

type Combinables = string | number;
type Numeric = number | boolean;
type Universal = Combinables & Numeric;

// TYPE GUARD
function addFn(a: Combinables, b: Combinables) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmpInfo(emp: UnknownEmployee) {
    console.log('Name: ', emp.name);
    if ('privileges' in emp) {
        console.log('Privileges: ', emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('Start Date: ', emp.startDate);
    }
}

printEmpInfo(e1);

class Car {
    drive() {
        console.log('Car is driving');
    }
}

class Truck {
    drive() {
        console.log('Truck is driving');
    }

    loadCargo() {
        console.log('Loading Cargo...');
    }
}

type Vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        // instanceof wont work on interface since vanilla js doesnt support js
        vehicle.loadCargo();
    }
}

useVehicle(v1);
useVehicle(v2);

// DISCRIMINATE UNION
interface Bird {
    type: 'bird'; // Literal type
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log('Moving speed: ', speed);
}

moveAnimal({
    type: 'bird',
    flyingSpeed: 300
});

moveAnimal({
    type: 'horse',
    runningSpeed: 120
});

// TYPE CASTING
// const userInputElemet = <HTMLInputElement>document.querySelector('#btn1');
// const userInputElemet = document.querySelector('#btn1') as HTMLInputElement;
// userInputElemet.value = 'Hi There!';

// INDEX TYPE
interface ErrorContainer {
    [prop: string]: string; // Not sure how many props we need and how to name them
}

const errorsBag: ErrorContainer = {
    email: 'Not a valid email',
    account: 'Wrong username or password'
};

// OPTIONAL CHAINING
const fetchedUserData = { // Assuming this is a fetch statement retrieving unknown data from a server
    id: 'u1',
    name: 'Max',
    // job: {
    //     title: 'CEO',
    //     desc: 'My own company'
    // }
};

//console.log(fetchedUserData?.job?.title);

// NULL HANDLING
const aNullValue = null;
const anotherValue = aNullValue ?? 'DEFAULT';
console.log(anotherValue);


"use strict";
const e1 = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
};
// TYPE GUARD
function addFn(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
function printEmpInfo(emp) {
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
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        // instanceof wont work on interface since vanilla js doesnt support js
        vehicle.loadCargo();
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
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
const errorsBag = {
    email: 'Not a valid email',
    account: 'Wrong username or password'
};
// OPTIONAL CHAINING
const fetchedUserData = {
    id: 'u1',
    name: 'Max',
};
//console.log(fetchedUserData?.job?.title);
// NULL HANDLING
const aNullValue = null;
const anotherValue = aNullValue !== null && aNullValue !== void 0 ? aNullValue : 'DEFAULT';
console.log(anotherValue);
//# sourceMappingURL=AdvanceTypes.js.map
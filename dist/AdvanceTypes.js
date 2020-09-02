"use strict";
var e1 = {
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
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.drive = function () {
        console.log('Car is driving');
    };
    return Car;
}());
var Truck = /** @class */ (function () {
    function Truck() {
    }
    Truck.prototype.drive = function () {
        console.log('Truck is driving');
    };
    Truck.prototype.loadCargo = function () {
        console.log('Loading Cargo...');
    };
    return Truck;
}());
var v1 = new Car();
var v2 = new Truck();
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
    var speed;
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
var errorsBag = {
    email: 'Not a valid email',
    account: 'Wrong username or password'
};
// OPTIONAL CHAINING
var fetchedUserData = {
    id: 'u1',
    name: 'Max',
};
//console.log(fetchedUserData?.job?.title);
// NULL HANDLING
var aNullValue = null;
var anotherValue = aNullValue !== null && aNullValue !== void 0 ? aNullValue : 'DEFAULT';
console.log(anotherValue);
//# sourceMappingURL=AdvanceTypes.js.map
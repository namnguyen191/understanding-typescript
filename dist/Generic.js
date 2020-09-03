"use strict";
// GENERIC TYPES HELP US LOCK-IN A TYPE
const names = [];
names.push('Nam');
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done!');
    }, 2000);
});
promise.then((data) => {
    console.log(data.split(' '));
});
function merge(objA, objB) {
    // Generic Object assign return an intersection
    return Object.assign(objA, objB);
}
const mergObj = merge({ name: 'Max' }, { age: 30 });
console.log(mergObj);
console.log(mergObj.name); // This would not have been possible without generic type assign
console.log(mergObj.age); // This would not have been possible without generic type assign
const mergObj2 = merge(98, { winner: 'Nam' }); // This is redundant cause TS can infer the type automatically
// TYPE CONSTRAINTS
function merg2(objA, objB) {
    return Object.assign(objA, objB);
}
const mergObj3 = merg2({ firstName: 'Nam' }, { lastName: 'Nguyen' });
function countAndPrint(element) {
    let description = 'Got no value';
    if (element.length > 0) {
        description = 'Got ' + element.length + ' elements!';
    }
    return [element, description];
}
console.log(countAndPrint(['Hi There!', 'My name is Nam']));
// AN EXAMPLE TO ENSURE THE RIGHT OBJECT STRUCTURE
function extractAndConvert(obj, key) {
    return 'Value: ' + obj[key];
}
console.log(extractAndConvert({ name: 'Nam Nguyen' }, 'name'));
// console.log(extractAndConvert({ name: 'Nam Nguyen' }, 'age')); not allow
// GENERIC CLASSES
class DataStorage {
    constructor() {
        // Storage for uniform primitive data
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1); // Return -1 if it can't find the index
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
// textStorage.addItem(23); not allow
textStorage.addItem('Nam');
textStorage.addItem('Nguyen');
textStorage.addItem('Chau');
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
// numberStorage.addItem('Name'); not allow
numberStorage.addItem(23);
function createCourseGoal(title, description, completeUntil) {
    let courseGoal = {}; // Basically makes all the props optional
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = completeUntil;
    return courseGoal;
}
const namesArray = ['Max', 'Anna'];
// namesArray.push('Manu'); not allow
//# sourceMappingURL=Generic.js.map
"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        //public name: string;
        //private id: string;
        this.employees = [];
        //this.name = name;
    }
    addEmployee(emp) {
        this.employees.push(emp);
    }
    changeId(newId) {
        // this.id = newId; not allow
    }
    static createEmployee(name) {
        const newEmp = {
            name,
            empId: this.nextUnusedId
        };
        Department.nextUnusedId++;
        return newEmp;
    }
}
Department.nextUnusedId = 0;
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT');
        this.admins = admins;
        this.reports = [];
    }
    get mostRecentReport() {
        return this.reports[this.reports.length - 1];
    }
    set mostRecentReport(report) {
        this.reports[this.reports.length - 1] = report;
    }
    addReport(report) {
        this.reports.push(report);
    }
    addEmployee(name) {
        this.employees.push('IT Dep: ' + name);
    }
    describe() {
        console.log('This is the IT department!');
    }
}
class HeadDepartment extends Department {
    constructor() {
        super('77777', 'HQ');
    }
    static getInstance() {
        if (HeadDepartment.instance) {
            return HeadDepartment.instance;
        }
        HeadDepartment.instance = new HeadDepartment();
        return HeadDepartment.instance;
    }
    describe() {
        console.log('This is the HQ!');
    }
}
class Person {
    constructor(name, nickName) {
        this.name = name;
        this.nickName = nickName;
    }
    greet(phrase) {
        console.log(phrase);
    }
}
// const dep1 = new Department('dasc88r1', 'Sale'); no longer allow due to abstract
// console.log(dep1);
// dep1.employees; not allow
//dep1.addEmployee('John');
const itDep1 = new ITDepartment('dasdasd2v3', ['Nam', 'BC Duong']);
console.log(itDep1);
itDep1.addEmployee('John');
console.log(itDep1);
itDep1.addReport('Report 1');
itDep1.addReport('Report 2');
console.log(itDep1.mostRecentReport);
itDep1.mostRecentReport = 'Report 3';
console.log(itDep1.mostRecentReport);
console.log(Department.createEmployee('Nam Vu Hoang Nguyen'));
console.log(ITDepartment.createEmployee('Another one!'));
console.log(HeadDepartment.getInstance()); // There will only be 1 instance of this class all the time (Singleton pattern)
let user1;
user1 = {
    name: 'Nam',
    greet: (phrase) => {
        console.log(phrase);
    }
};
user1.greet('Hi there I am Nam!');
user1 = new Person('Nam Nguyen');
console.log(user1);
user1.greet(`Hi my name is ${user1.name}`);
let addFunction;
addFunction = (n1, n2) => {
    return n1 + n2;
};
const anotherPerson = new Person('John Doe', 'Dodge');
console.log(anotherPerson);
//# sourceMappingURL=ClassesAndInterfaces.js.map
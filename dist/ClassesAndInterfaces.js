"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Department = /** @class */ (function () {
    function Department(id, name) {
        this.id = id;
        this.name = name;
        //public name: string;
        //private id: string;
        this.employees = [];
        //this.name = name;
    }
    Department.prototype.addEmployee = function (emp) {
        this.employees.push(emp);
    };
    Department.prototype.changeId = function (newId) {
        // this.id = newId; not allow
    };
    Department.createEmployee = function (name) {
        var newEmp = {
            name: name,
            empId: this.nextUnusedId
        };
        Department.nextUnusedId++;
        return newEmp;
    };
    Department.nextUnusedId = 0;
    return Department;
}());
var ITDepartment = /** @class */ (function (_super) {
    __extends(ITDepartment, _super);
    function ITDepartment(id, admins) {
        var _this = _super.call(this, id, 'IT') || this;
        _this.admins = admins;
        _this.reports = [];
        return _this;
    }
    Object.defineProperty(ITDepartment.prototype, "mostRecentReport", {
        get: function () {
            return this.reports[this.reports.length - 1];
        },
        set: function (report) {
            this.reports[this.reports.length - 1] = report;
        },
        enumerable: false,
        configurable: true
    });
    ITDepartment.prototype.addReport = function (report) {
        this.reports.push(report);
    };
    ITDepartment.prototype.addEmployee = function (name) {
        this.employees.push('IT Dep: ' + name);
    };
    ITDepartment.prototype.describe = function () {
        console.log('This is the IT department!');
    };
    return ITDepartment;
}(Department));
var HeadDepartment = /** @class */ (function (_super) {
    __extends(HeadDepartment, _super);
    function HeadDepartment() {
        return _super.call(this, '77777', 'HQ') || this;
    }
    HeadDepartment.getInstance = function () {
        if (HeadDepartment.instance) {
            return HeadDepartment.instance;
        }
        HeadDepartment.instance = new HeadDepartment();
        return HeadDepartment.instance;
    };
    HeadDepartment.prototype.describe = function () {
        console.log('This is the HQ!');
    };
    return HeadDepartment;
}(Department));
var Person = /** @class */ (function () {
    function Person(name, nickName) {
        this.name = name;
        this.nickName = nickName;
    }
    Person.prototype.greet = function (phrase) {
        console.log(phrase);
    };
    return Person;
}());
// const dep1 = new Department('dasc88r1', 'Sale'); no longer allow due to abstract
// console.log(dep1);
// dep1.employees; not allow
//dep1.addEmployee('John');
var itDep1 = new ITDepartment('dasdasd2v3', ['Nam', 'BC Duong']);
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
var user1;
user1 = {
    name: 'Nam',
    greet: function (phrase) {
        console.log(phrase);
    }
};
user1.greet('Hi there I am Nam!');
user1 = new Person('Nam Nguyen');
console.log(user1);
user1.greet("Hi my name is " + user1.name);
var addFunction;
addFunction = function (n1, n2) {
    return n1 + n2;
};
var anotherPerson = new Person('John Doe', 'Dodge');
console.log(anotherPerson);
//# sourceMappingURL=ClassesAndInterfaces.js.map
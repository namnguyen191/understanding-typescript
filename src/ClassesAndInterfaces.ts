abstract class Department {
    //public name: string;
    //private id: string;
    protected employees: string[] = [];
    static nextUnusedId = 0;

    constructor(private readonly id: string, public name: string) {
        //this.name = name;
    }

    addEmployee(emp: string) {
        this.employees.push(emp);
    }

    changeId(newId: string) {
        // this.id = newId; not allow
    }

    static createEmployee(name: string) {
        const newEmp = {
            name,
            empId: this.nextUnusedId
        };
        Department.nextUnusedId++;
        return newEmp;
    }

    abstract describe(): void;
}

class ITDepartment extends Department {
    private reports: string[] = [];

    constructor(id: string, public admins: string[]) {
        super(id, 'IT');
    }

    get mostRecentReport() {
        return this.reports[this.reports.length - 1];
    }

    set mostRecentReport(report: string) {
        this.reports[this.reports.length - 1] = report;
    }

    addReport(report: string) {
        this.reports.push(report);
    }

    addEmployee(name: string) {
        this.employees.push('IT Dep: ' + name);
    }

    describe() {
        console.log('This is the IT department!');
    }
}

class HeadDepartment extends Department {
    private static instance: HeadDepartment;

    private constructor() {
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

interface Greetable {
    readonly name: string;
    greet(phrase: string): void;
}

class Person implements Greetable {
    name: string;
    nickName?: string;

    constructor(name: string, nickName?: string) {
        this.name = name;
        this.nickName = nickName;
    }

    greet(phrase: string) {
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

let user1: Greetable;

user1 = {
    name: 'Nam',
    greet: (phrase: string) => {
        console.log(phrase);
    }
};

user1.greet('Hi there I am Nam!');

user1 = new Person('Nam Nguyen');
console.log(user1);

user1.greet(`Hi my name is ${user1.name}`);

interface AddFN {
    (a: number, b: number): number;
}

let addFunction: AddFN;

addFunction = (n1: number, n2: number) => {
    return n1 + n2;
};

const anotherPerson = new Person('John Doe', 'Dodge');
console.log(anotherPerson);

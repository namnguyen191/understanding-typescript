// GENERIC TYPES HELP US LOCK-IN A TYPE
const names: Array<string> = [];
names.push('Nam');

const promise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done!');
    }, 2000);
});

promise.then((data) => {
    console.log(data.split(' '));
});

function merge<T, U>(objA: T, objB: U) {
    // Generic Object assign return an intersection
    return Object.assign(objA, objB);
}

const mergObj = merge({ name: 'Max' }, { age: 30 });
console.log(mergObj);
console.log(mergObj.name); // This would not have been possible without generic type assign
console.log(mergObj.age); // This would not have been possible without generic type assign

const mergObj2 = merge<number, object>(98, { winner: 'Nam' }); // This is redundant cause TS can infer the type automatically

// TYPE CONSTRAINTS
function merg2<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

const mergObj3 = merg2({ firstName: 'Nam' }, { lastName: 'Nguyen' });
// const mergObj4 = merg2({ firstName: 'Nam' }, 35); not allow

// AN EXAMPLE TO CAPTURE ALL OBJECT WITH THE LENGTH PROP
interface Lengthy {
    length: number;
}

function countAndPrint<T extends Lengthy>(element: T): [T, string] {
    let description = 'Got no value';
    if (element.length > 0) {
        description = 'Got ' + element.length + ' elements!';
    }
    return [element, description];
}

console.log(countAndPrint(['Hi There!', 'My name is Nam']));

// AN EXAMPLE TO ENSURE THE RIGHT OBJECT STRUCTURE
function extractAndConvert<T extends object, U extends keyof T>(
    obj: T,
    key: U
) {
    return 'Value: ' + obj[key];
}
console.log(extractAndConvert({ name: 'Nam Nguyen' }, 'name'));
// console.log(extractAndConvert({ name: 'Nam Nguyen' }, 'age')); not allow

// GENERIC CLASSES
class DataStorage<T extends string | number | boolean> {
    // Storage for uniform primitive data
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1); // Return -1 if it can't find the index
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
// textStorage.addItem(23); not allow
textStorage.addItem('Nam');
textStorage.addItem('Nguyen');
textStorage.addItem('Chau');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
// numberStorage.addItem('Name'); not allow
numberStorage.addItem(23);

// TS Special Utilities TYPES that only exist in TS
interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(
    title: string,
    description: string,
    completeUntil: Date
): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {}; // Basically makes all the props optional
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = completeUntil;
    return courseGoal as CourseGoal;
}

const namesArray: Readonly<string[]> = ['Max', 'Anna'];
// namesArray.push('Manu'); not allow

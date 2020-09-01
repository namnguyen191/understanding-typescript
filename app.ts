// Num and sting type
function add(n1: number, n2: number, showRes: boolean, phrase: string) {
    if (showRes) {
        console.log(phrase + n1 + n2);
    } else {
        return n1 + n2;
    }
}

const number1 = 2;
const number2 = 5.8;
const showRes = true;
const resultPhrase = 'Result is: ';
add(number1, number2, showRes, resultPhrase);

let num1: number;
num1 = 5;
// num1 = '5'; not allow

let string1 = 'This is a string';
string1 = 'This is another string';
// string1 = 5; not allow

// Object, Array, Tupple type
const person2: {
    name: string;
    age: number;
} = {
    name: 'Nam',
    age: 30
};
console.log(person2.age);

// The following syntax is better
const person3: {
    name: string;
    age: number;
    hobbies: string[];
    role: [number, string]; // tupple
} = {
    name: 'Nam',
    age: 22,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author']
};
console.log(person3);
console.log(person3.name);

person3.role.push('admin'); // TS can't catch push
// person3.role[1] = 3; not allow
person3.role = [3, 'writer'];
// person3.role = [3, 'writer', 4]; not allow

let favAct: string[];
// favAct = 'sport'; not allow
favAct = ['sport'];

let anyArr: any[];
anyArr = [1, 2, 3];
anyArr = ['1', '2', '3'];

for (const hobby of person3.hobbies) {
    console.log(hobby.toUpperCase());
}

// ENUM type
enum Role {
    ADMIN,
    READ_ONLY,
    AUTHOR
} // By default it link a number to a string ADMIN = 0, READ_ONLY = 1...
const person4 = {
    name: 'Nam',
    age: 22,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN
};

// person4.role = 'NEW_ROLE'; not allow
if (person4.role === Role.ADMIN) {
    console.log('This user is an Admin!');
}
if (person4.role === 0) {
    console.log('This user is an Admin!');
}

// ANY type
// This is a disadvantage cause it by pass all TS check
let anyType: any;
(anyType = 5), (anyType = '5');
anyType = {
    name: 'Nam',
    age: 15
};

// UNION type
function combine(input1: number | string, input2: number | string) {
    let res;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        res = input1 + input2;
    } else {
        res = input1.toString() + input2.toString();
    }
    return res;
}

const combineAges = combine(30, 26);
console.log(combineAges);
const combineName = combine('Nam', 'Nguyen');
console.log(combineName);

// LITERAL TYPE
const PI = 3.14;
const MY_NAME = 'Nam Nguyen';
function combine2(
    input1: number | string,
    input2: number | string,
    resConv: 'as-num' | 'as-str'
) {
    let res;
    if (
        (typeof input1 === 'number' && typeof input2 === 'number') ||
        resConv === 'as-num'
    ) {
        res = +input1 + +input2;
    } else {
        res = input1.toString() + input2.toString();
    }
    return res;
}

const combineNum = combine2(11, 22, 'as-num');
console.log(combineNum);
const combineNumString = combine2('11', '22', 'as-num');
console.log(combineNumString);
// const combineNumString3 = combine2('11', '22', 'as-text'); not allow

// TYPE ALIAS FEATURE
type Combinable = number | string;
type ConStr = 'as-num' | 'as-str';
function combine3(
    input1: number | string,
    input2: number | string,
    resConv: 'as-num' | 'as-str'
) {
    let res;
    if (
        (typeof input1 === 'number' && typeof input2 === 'number') ||
        resConv === 'as-num'
    ) {
        res = +input1 + +input2;
    } else {
        res = input1.toString() + input2.toString();
    }
    return res;
}

// SPECIFY RETURN TYPE
// Usually you don't want to do this and just let TS infer the type automatically
function add2Num(n1: number, n2: number): number {
    return n1 + n2;
}

// Return type of void
// If you log the result of void it will return 'undefined'
function printRes(num: number) {
    console.log('Result: ' + num);
}

// But void is different from undefined in TS
function printRes2(num: number): undefined {
    console.log('Result: ' + num);
    return;
}

// FUNCTION TYPE
let addFunc: (num1: number, num2: number) => number;
// addFunc = 5; not allow
addFunc = (num1, num2) => {
    return num1 + num2;
};

// The callback is define as returning void but it actually doesn't have to, the parent function will just ignore the return value
function addAndHandle(num1: number, num2: number, cb: (num: number) => void) {
    const res = num1 + num2;
    cb(res);
}

addAndHandle(18, 22, (res) => {
    console.log(res);
    return 'A string';
});


// UNKNOWN TYPE
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = '5';
// userName = userInput; not allow but will allow for ANY TYPE
if (typeof userInput === 'string') {
    userName = userInput;
}

// THE NEVER TYPE: for infinite loop or throwing errors
function generateError(msg: string, errCode: number): never {
    throw {
        msg,
        errCode
    };
}

const res = generateError('An error has occured', 500);

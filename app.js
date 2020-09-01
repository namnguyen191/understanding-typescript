"use strict";
// Num and sting type
function add(n1, n2, showRes, phrase) {
    if (showRes) {
        console.log(phrase + n1 + n2);
    }
    else {
        return n1 + n2;
    }
}
var number1 = 2;
var number2 = 5.8;
var showRes = true;
var resultPhrase = 'Result is: ';
add(number1, number2, showRes, resultPhrase);
var num1;
num1 = 5;
// num1 = '5'; not allow
var string1 = 'This is a string';
string1 = 'This is another string';
// string1 = 5; not allow
// Object, Array, Tupple type
var person2 = {
    name: 'Nam',
    age: 30
};
console.log(person2.age);
// The following syntax is better
var person3 = {
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
var favAct;
// favAct = 'sport'; not allow
favAct = ['sport'];
var anyArr;
anyArr = [1, 2, 3];
anyArr = ['1', '2', '3'];
for (var _i = 0, _a = person3.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
// ENUM type
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {})); // By default it link a number to a string ADMIN = 0, READ_ONLY = 1...
var person4 = {
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
var anyType;
(anyType = 5), (anyType = '5');
anyType = {
    name: 'Nam',
    age: 15
};
// UNION type
function combine(input1, input2) {
    var res;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        res = input1 + input2;
    }
    else {
        res = input1.toString() + input2.toString();
    }
    return res;
}
var combineAges = combine(30, 26);
console.log(combineAges);
var combineName = combine('Nam', 'Nguyen');
console.log(combineName);
// LITERAL TYPE
var PI = 3.14;
var MY_NAME = 'Nam Nguyen';
function combine2(input1, input2, resConv) {
    var res;
    if ((typeof input1 === 'number' && typeof input2 === 'number') ||
        resConv === 'as-num') {
        res = +input1 + +input2;
    }
    else {
        res = input1.toString() + input2.toString();
    }
    return res;
}
var combineNum = combine2(11, 22, 'as-num');
console.log(combineNum);
var combineNumString = combine2('11', '22', 'as-num');
console.log(combineNumString);
function combine3(input1, input2, resConv) {
    var res;
    if ((typeof input1 === 'number' && typeof input2 === 'number') ||
        resConv === 'as-num') {
        res = +input1 + +input2;
    }
    else {
        res = input1.toString() + input2.toString();
    }
    return res;
}
// SPECIFY RETURN TYPE
// Usually you don't want to do this and just let TS infer the type automatically
function add2Num(n1, n2) {
    return n1 + n2;
}
// Return type of void
// If you log the result of void it will return 'undefined'
function printRes(num) {
    console.log('Result: ' + num);
}
// But void is different from undefined in TS
function printRes2(num) {
    console.log('Result: ' + num);
    return;
}
// FUNCTION TYPE
var addFunc;
// addFunc = 5; not allow
addFunc = function (num1, num2) {
    return num1 + num2;
};
// The callback is define as returning void but it actually doesn't have to, the parent function will just ignore the return value
function addAndHandle(num1, num2, cb) {
    var res = num1 + num2;
    cb(res);
}
addAndHandle(18, 22, function (res) {
    console.log(res);
    return 'A string';
});
// UNKNOWN TYPE
var userInput;
var userName;
userInput = 5;
userInput = '5';
// userName = userInput; not allow but will allow for ANY TYPE
if (typeof userInput === 'string') {
    userName = userInput;
}
// THE NEVER TYPE: for infinite loop or throwing errors
function generateError(msg, errCode) {
    throw {
        msg: msg,
        errCode: errCode
    };
}
var res = generateError('An error has occured', 500);

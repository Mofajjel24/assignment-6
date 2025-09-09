# JavaScript ES6 Concepts

## 1) Difference between var, let, and const

- **var** is function-scoped, can be redeclared and reassigned, and is hoisted with `undefined`.
- **let** is block-scoped, can be reassigned but cannot be redeclared in the same scope, and is hoisted but not initialized.
- **const** is block-scoped, cannot be redeclared or reassigned, and is hoisted but not initialized.

Example:

```javascript
var a = 10;
let b = 20;
const c = 30;

b = 25; // okay
// c = 35; // error

2) Difference between map(), forEach(), and filter()

map() returns a new array after applying a function to each element.

forEach() just runs a function on each element, but does not return anything.

filter() returns a new array with elements that pass a condition.

const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2); // [2,4,6,8,10]
numbers.forEach(n => console.log(n)); // prints each number
const even = numbers.filter(n => n % 2 === 0); // [2,4]

3) Arrow functions in ES6

Arrow functions are a shorter way to write functions and do not have their own this.

// normal function
function add(a, b) {
  return a + b;
}

// arrow function
const add = (a, b) => a + b;
If there’s only one parameter, parentheses can be omitted.

If the function just returns an expression, return can be omitted.

4) Destructuring assignment in ES6

Destructuring lets you extract values from arrays or objects into variables.

Example with arrays:

const arr = [1, 2, 3];
const [first, second] = arr;
console.log(first, second); // 1 2


Example with objects:

const obj = { name: 'Alice', age: 25 };
const { name, age } = obj;
console.log(name, age); // Alice 25


You can also give default values if a property doesn’t exist.
5) Template literals in ES6

Template literals let you create strings easily using backticks ` and embed variables using ${}.

Example:

const name = 'Bob';
const age = 30;

const message = `My name is ${name} and I am ${age} years old.`;


Easier to read than string concatenation.

Supports multi-line strings.

Can put expressions directly inside ${}.
```

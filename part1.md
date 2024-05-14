What is a potential pitfall with using typeof bar === "object" to determine if bar is an object? How can this pitfall be avoided?

I know that the typeof method returns a string and the proposed comparison is actually checking if the string returned is equal to the string offered. The only pitfall I can think of is if there's a typo of some sort in the string provided, like 'Object'. Because of this, you can use the 'instanceof' method: bar instanceof Object

Now that I've looked at the answer, I can still recognize that the type is a pitfall but recognize other more primitive pitfalls: 'null' is considered an object, so if 'bar' is null, it would pass the comparison. Our instanceof would still be effective in avoiding this pitfall.

The pitfall that instanceof can't avoid is if bar is an array. instanceof will yield true for that, since an array is also a JS specific type of object. To avoid this pitfall: bar.constructor === Object will yield false for arrays. Alternatively, we can add the conditional if (Array.isArray(bar)) return false;

What will the code below output to the console and why?
(function(){
  var a = b = 3;
})();

console.log("a defined? " + (typeof a !== 'undefined'));
console.log("b defined? " + (typeof b !== 'undefined'));

I think we'll have to logs:
'a defined? true'
'b defined? true'

This is an example of an Immediately Invoked Function Expression (IIFE) but it uses 'var', which makes the variables accessible even after they were run. I believe that typeof 'a' and 'b' will be 'number', not 'undefined'.

I was wrong. Variables declared by 'var' inside a IIFE are not accessible outside of it. In fact, an IIFE is used to add proper scope to the variables invoked by this function, preventing them from being accessed from outside the function.

So, 'var a = b = 3' is read as:
b = 3;
var a = b;
Hence, 'a' will be undefined because it can't be accessed from outside the IIFE scope. However, because 'b' was declared without any keyword such as 'var', 'let' or 'const', it becomes a global variable that can be accessed from anywhere, thus returning true, since 'b' is a type of 'number'.

If 'use strict' is implemented, the expression 'b = 3' will generate a runtime error of ReferenceError: b is not defined.

What will the code below output to the console and why?
var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
};
myObject.func();

I believe that the code will output:
"outer func: this.foo = bar"
"outer func: self.foo = bar"
"inner func: this.foo = undefined"
"inner func: self.foo = undefined"

Because the command starts with calling the properties of an object. This object has another property called 'foo' that is available to the outer function because it's part of the object. These variables are not available in the inner function because they're IIFE and their goal is to apply strict scoping. So, 'this' will be pointing out to the outer function that does not have any 'foo' property, resulting in undefined.

I guess I was right in my logic but did not take it to the last consequences. Since the inner 'this' refers to the outer function, and 'self' is declared there, pointing out to myObject, foo will be accessible to the last call, making it appear as 'bar'.

So, right answer:
"outer func: this.foo = bar"
"outer func: self.foo = bar"
"inner func: this.foo = undefined"
"inner func: self.foo = bar"

What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?

I guess that by doing this you can add scope to the contents of that function, thus protecting its content.

It seems that I was right, but we should qualify what 'protection' means: it avoids potential name clashes between different modules and libraries.

Additionally, it's also a way to make easily referenceable alias for a global variable, like thew '$' in jQuery.

What is the significance, and what are the benefits, of including 'use strict' at the beginning of a JavaScript source file?

'use strict' is a mode of running JavaScript that is more strict, less lenient and, thus, a way to handle errors more appropriately at runtime. This mode allows to detect unexpected bugs before the code is used in production.

I was right, but there are other reasons to use 'use strict':
- Prevents accidental globals (b = 3 yields an error)
- Eliminates 'this' coercion: if 'this' is referencing 'null' or 'undefined', without 'use strict', 'this' will then be coerced to the global object. With 'use strict' it'll throw an error.
- Disallows duplicate parameter values for functions
- Makes eval() safer
- Throws error on invalid usage of delete (eg deleting a non-configurable property of an object)

Consider the two functions below. Will they both return the same thing? Why or why not?
function foo1()
{
  return {
      bar: "hello"
  };
}

function foo2()
{
  return
  {
      bar: "hello"
  };
}

They won't return the same thing. This is because of how JavaScript automatically adds semicolons: on the second function, JavaScript will interpret that a semicolon is necessary after 'return': 'return;'. Hence, the second function will 'break' without effectively returning any content, while the first one will return the content within curly brackets.

What will the code below output? Explain your answer.
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 == 0.3);

The output is:
0.3000000004
false
The reason for this has to do with how JavaScript deals with floats under the hood: the first float is not exactly 0.3 but a rational number like 0.30000001. Thus, this number is not equal to 0.3, thus returning false.

In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?
(function() {
    console.log(1); 
    setTimeout(function(){console.log(2)}, 1000); 
    setTimeout(function(){console.log(3)}, 0); 
    console.log(4);
})();

I think this is the order: 1, 3, 4, 2. JavaScript executes code line by line. The first line prints 1. The second line sets a timer of 1 second to print 2 and does not halt code execution. The third line sets a timer of 0 seconds to print 3 and, for this reason, I believe 3 is printed immeditely. Then, the last line of 4 is finally printed. I may be wrong if the speed of runtime is quicker than 0 seconds, which then would print 4 before 3.
In fact I was wrong: once a setTimeout is initiated, JS puts that call on queue. This simple act already delays its execution, enough to print 4 before 3.

Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.

function isPalindrome(str) {
    let reverse = [];
    for (let letter of str) {
        reverse.unshift(letter);
    }
    return str === reverse.join('');
}

The suggested solution:
function isPalindrome(str) {
  str = str.replace(/\W/g, '').toLowerCase();
  return (str == str.split('').reverse().join(''));
}

The replace removes spaces and special characters.
The split turns the string into an array, which is reversed and joined back to a string.

Write a sum method which will work properly when invoked using either syntax below.
console.log(sum(2,3));   // Outputs 5
console.log(sum(2)(3));  // Outputs 5

function sum(a, b) {
    if (!b) {
        return function(b) {
            return a + b;
        }
    }
    return a + b;
}

for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}

(a) What gets logged to the console when the user clicks on “Button 4” and why?
What gets logged is the number '5', because 'i' is declared globally and, at the time of the click, 'i' has been added up to 5, which stops the loop.

(b) Provide one or more alternate implementations that will work as expected.
Use 'let' instead of 'var'.

Assuming d is an “empty” object in scope, say:
var d = {};
…what is accomplished using the following code?
[ 'zebra', 'horse' ].forEach(function(k) {
	d[k] = undefined;
});

d = {zebra: undefined, horse: undefined}

What will the code below output to the console and why?
var arr1 = "john".split('');
var arr2 = arr1.reverse();
var arr3 = "jones".split('');
arr2.push(arr3);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));

arr1 = ['j', 'o', 'h', 'n'];
arr2 = ['n', 'h', 'o', 'j', 'j', 'o', 'n', 'e', 's'];
arr3 = ['j', 'o', 'n', 'e', 's'];

"array 1: length=4 last=n"
"array 2: length=9 last=s"

Wrong, the right answer is:
"array 1: length=5 last=j,o,n,e,s"
"array 2: length=9 last=j,o,n,e,s"

To call arr1.reverse() not only returns arr1 reversed but actually changes the order of arr1. It does not return a copy.
arr1 = ['n', 'h', 'o', 'j'];

So, in 'arr2 = arr1.reverse()', arr2 is now referencing arr1. Hence, any change to arr2 will also reference arr1.
As a result, arr1 and arr2 have the same content, which is:
['n','h','o','j', ['j','o','n','e','s'] ]
The whole arr3 is pushed to be the last element of arr2, not just each element at a time. This is why all letters of 'jones' is returned on the negative slice.

What will the code below output to the console and why ?
console.log(1 +  "2" + "2");
console.log(1 +  +"2" + "2");
console.log(1 +  -"1" + "2");
console.log(+"1" +  "1" + "2");
console.log( "A" - "B" + "2");
console.log( "A" - "B" + 2);

"loosely typed language", which means it'll perform automatic type conversion on values to accommodate the operation.

JS's regular mo is to try to coerce everything into a string if the operation seems to be a concatenation, so the result of the first console is "122";

The second console has an explicit request to turn the string '2' into a number (use of '+' before the '2'). So, (1 + 2) will be able to be performed, resulting in an addition, 3. Then, 3 is turned into a string and concatenated with '2', resulting in '32'.

Third console follows the same logic: 1 - 1 = 0. 0 is turned into a string, resulting in '02'.

Fourth console, the string '1' is turned to number 1 but then is coerced back to a string, resulting in '112'.

Fifth console, because "A" or "B" can't be converted to numeric values, the operation will result in NaN, which then will be concatenated with "2", resulting "NaN2"

Sixth console will yield NaN because any numeric operation with NaN yields NaN.

The following recursive code will cause a stack overflow if the array list is too large. How can you fix this and still retain the recursive pattern?

var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        nextListItem();
    }
};

var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        setTimeout( nextListItem, 0);
    }
};

The stack overflow is eliminated because the event loop handles the recursion, not the call stack. When nextListItem runs, if item is not null, the timeout function (nextListItem) is pushed to the event queue and the function exits, thereby leaving the call stack clear. When the event queue runs its timed-out event, the next item is processed and a timer is set to again invoke nextListItem. Accordingly, the method is processed from start to finish without a direct recursive call, so the call stack remains clear, regardless of the number of iterations.

What is a “closure” in JavaScript? Provide an example.

A closure is an inner function that has access to the variables in the outer (enclosing) function’s scope chain. 

What would the following lines of code output to the console?

console.log("0 || 1 = "+(0 || 1));
console.log("1 || 2 = "+(1 || 2));
console.log("0 && 1 = "+(0 && 1));
console.log("1 && 2 = "+(1 && 2));

"0 || 1 = 1"
"1 || 2 = 1"
"0 && 1 = 0"
"1 && 2 = 2"

What will be the output when the following code is executed? Explain.

console.log(false == '0')
console.log(false === '0')

The first one will output 'true' because when '0' is type coerced to a boolean, it becomes false. The type coercion will happen because of the equality operator 
'=='. In a strict equality ('==='), type coercion does not happen, so it returns 'false'.
Triple-equal operator compares both type and value.

What is the output out of the following code? Explain your answer.

var a={},
    b={key:'b'},
    c={key:'c'};

a[b]=123;
a[c]=456;

console.log(a[b]);

The output of this code will be 456 (not 123).

The reason for this is as follows: When setting an object property, JavaScript will implicitly stringify the parameter value. In this case, since b and c are both objects, they will both be converted to "[object Object]". As a result, a[b] anda[c] are both equivalent to a["[object Object]"] and can be used interchangeably. Therefore, setting or referencing a[c] is precisely the same as setting or referencing a[b].

What will the following code output to the console:

console.log((function f(n){
    return ((n > 1) ? n * f(n-1) : n)
})(10));

3628800

This is a recursive console.log. The argument that is passed is 10. Since 10 is greater than 1, it executes 'n * f(10-1)', which will recursively execute the same function until it reaches 1, which will then return the second argument of the ternary, which is n (1). At this point, the call stack starts to be resolved, which it'll eventually yield the result of 10!, which is 3628800.

Consider the code snippet below. What will the console output be and why?
(function(x) {
    return (function(y) {
        console.log(x);
    })(2)
})(1);

"1"
This is a closure. Hence, the internal closure 'function(y)' has access to the outer variable 'x', which is set to 1 with the outer argument '(1)';

What will the following code output to the console and why:

var hero = {
    _name: 'John Doe',
    getSecretIdentity: function (){
        return this._name;
    }
};

var stoleSecretIdentity = hero.getSecretIdentity;

console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());

undefined
'John Doe'

The problem is that getSecretIdentity uses 'this', which is a contextual variable. When the variable stoleSecretIdentity is declared, it's making reference to the value of a property, which is a function that uses 'this'. However, when this function is executed, the context is the global object, which does not contain a property named '_name' and this is why it returns 'undefined'.
The second console keeps the context, so this refers to and returns 'John Doe'.

What is the issue with this code and how can it be fixed.

I think it can be fixed by adding a '()' to the end of the property 'getSecretIdentity'. This will make the variable to store the value that is returned when is executed with 'hero' as its context. And when console.log, remove the '()' from the call.

Create a function that, given a DOM Element on the page, will visit the element itself and all of its descendents (not just its immediate children). For each element visited, the function should pass that element to a provided callback function.

The arguments to the function should be:

a DOM element
a callback function (that takes a DOM element as its argument)

function allElementsChild(element, callback) {
    callback(element);
    for (let i = 0; i < element.children.length; i++) {
        allElementsChild(element.children[i], callback);
    }
}

Testing your this knowledge in JavaScript: What is the output of the following code?

var length = 10;
function fn() {
	console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};

obj.method(fn, 1);

I think the output will be:
5
5

But I was wrong. The output is:
10
2

In JS, the values of 'this' is determined by how a function is called, not where it's defined. So, the length inside obj is there just to confuse us. The first time that fn() is invoked, it has no particular context, so it defers to the global object, that has a defined length of 10. The second time it's called, is by using the 'arguments' object. So 'this' will refer to the arguments object. Since two arguments were passed in (fn, 1), the length of the object is 2.

Consider the following code. What will the output be, and why?

(function () {
    try {
        throw new Error();
    } catch (x) {
        var x = 1, y = 2;
        console.log(x);
    }
    console.log(x);
    console.log(y);
})();

1
undefined
2

The function is immediately invoked. It calls try and it immediately throws an error, which is catched. The catch has an argument 'x', which I assume will automatically refer to the Error. Inside the catch, x is globally redeclared to be equal to 1 and y is declared as 2 in the global object. The first console.log will access the value of x inside the catch scope, which was just declared as 1. The second console.log, since x has been hoisted (declared through var), still has access to the variable but not its value, so it'll print undefined. Then, it prints the globally defined y, which is 2.

What will be the output of this code?

var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};
girl ();

undefined
It returns undefined because the variable x is hoisted but its value has not yet been initialized.

for (let i = 0; i < 5; i++) {
  setTimeout(function() { console.log(i); }, i * 1000 );
}
What will this code print?

0
1
2
3
4

What do the following lines output, and why?
console.log(1 < 2 < 3); // true
console.log(3 > 2 > 1); // false

The first '1 < 2' evaluates to true which is coerced into a number, namely 1, which is indeed lesser than 3.

The first '3 > 2' evaluates to true, which is coerced into number 1, which is not greater than 1.

How do you add an element at the begining of an array? How do you add one at the end?

With a method named .unshift(). With a method named .push()
With ES6, the spread operator can be used:
myArray = ['start', ...myArray, 'end'];

Imagine you have this code:
var a = [1, 2, 3];
a. Will this result in a crash?
a[10] = 99;
No. It'll add number 99 to the index 10 of the array a.

b. What will this output?
console.log(a[6]);
I think it will output null.
No, it'll output undefined. The slots of the array continue to be empty, even though it returns undefined. This is an important distinction because if a slot's value was INDEED set to be undefined, it'd count as an item and would be responsive to a function like map, while an ACTUAL empty slot would continue empty in this situation. What's even weirder is that if you make a[3] === undefined it returns true.

What is the value of typeof undefined == typeof NULL?

I think that undefined is a primitive type and that NULL is an object, which will yield false.
No, it will yield true. I was right that undefined is a primitive type. But typeof undefined will return the string 'undefined'. I was right that null is an object in JS, however, it's null with all letters lower cased. Because in JS, NULL is not a built-in keyword, so it treats it as any unassigned constant/variable and, thus, also returns 'undefined'.

What would following code return?

console.log(typeof typeof 1);
Since I believe typeof is a method (built-in), it may return 'function'.
The typeof operator has an associativity property. So, when there are multiple typeofs, it'll be evaluated from right to left, unlike usual JS. Hence, typeof 1 returns the string 'number', which is a typeof 'string'.

What will be the output of the following code:
for (var i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}
Explain your answer. How could the use of closures help here?
1
5
5
5
5
The first time the loop runs it starts with i = 0, a command is sent to the callstack to be executed in the next available time (since 0 * 1000 is 0 miliseconds) but by then i has beend added 1 (i++). The other calls are queued to be executed in 1, 2, 3 and 4 seconds but by then the i has been added up to 5, which is what causes the loop to break, thus returning 5 four times. A closure can help by changing var to let, allowing the inner setTimeout to have access to the value of i in the outer function (the loop).
Actually, this is the output:
5
5
5
5
5
This is because of something called 'execution thread'. It seems that JS can only execute one thing at a time. So, when the loop starts running, all setTimeouts are set in a callstack to be executed as soon as the execution thread has been freed. In other words, once the loop has been executed. For this reason, once the loop has been executed, i has the value of 5 and will, thus, print 5 five times in the console.

What is NaN? What is its type? How can you reliably test if a value is equal to NaN?

NaN stands for Not a Number. It's what's returned from certain 'impossible' mathematical operations. I believe that NaN's type, oddly enough, is a number. To test if a value is a NaN, there's a built-in method Number.isNaN()
Another quirkness: console.log(NaN === NaN); // false
Anything compared with NaN yields false.

What will the following code output and why?
var b = 1;
function outer(){
   	var b = 2
    function inner(){
        b++;
        var b = 3;
        console.log(b)
    }
    inner();
}
outer();

When outer() is executed, var b is redeclared to the value 2, the inner functions is defined, and then inner is invoked: it adds 1 to b, but redeclares a second time b to the value 3, which is what will be consoled.
3

Lesson: It's not because you're executing a function that everything inside of it will be executed. If inside a function there's another function, the innermost needs to be invoked inside the outermost in order to run.

Discuss possible ways to write a function isInteger(x) that determines if x is an integer.
function isInteger(x) {
    return Number.isInteger(x);
}

Prior to ECMAScript-6 (which treated every number as a floating point number), the best implementation for the same function would be:
function isInteger(x) {
    return (x ^ 0) === x;
}

How do you clone an object?
In order to clone an object you need to iterate over each item of the original object and copy it to the clone.
There's a case that you can produce easier clones but that will fail if there are nested objects inside the original:
var obj = {a: 1, b: 2}
var objclone = Object.assing({}, obj);
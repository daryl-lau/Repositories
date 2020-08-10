function sum (...args) {
  console.log(args);      // [1, 2, 3]
  console.log(...args);   //  1, 2, 3
}


sum(1, 2, 3)


function sum1 (a, ...args) {
  console.log(a, args);    // 1, [2, 3]
  console.log(...args); // 2, 3
}

sum1(1, 2, 3)


function sum3 () {
  console.log(arguments);             // 伪数组
  console.log(Array.from(arguments)); // [1, 2, 3]
}

sum3(1, 2, 3)


console.log(typeof 123);
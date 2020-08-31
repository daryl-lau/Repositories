


let a = 10
function func1 (x) {
  x = 20
  console.log(x);
}
func1(a)       // 20
console.log(a);  // 10


let b = { a: 10, b: 20 }
function func2 (x) {
  x.a = 20
  console.log(x);
}
func2(b)      //  { a: 20, b: 20 }
console.log(b); //  { a: 20, b: 20 }


let c = { a: 10, b: 20 }
function func3 (x) {
  x = 20
  console.log(x);
}
func3(c)      // 20
console.log(c); // { a: 10, b: 20 }
export const add = (arr) => {
  console.log(arr);
  return arr.reduce((total, curr) => total + curr, 0)
}
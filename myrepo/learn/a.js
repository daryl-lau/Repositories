function randomNum(minNum, maxNum) {
  let a = parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
  if (a < 10) {
    return `0${a}`;
  }
  return a;
}

for (let index = 0; index < 95; index++) {
  console.log(`2018-${randomNum(1, 12)}-${randomNum(1, 28)} ${randomNum(10, 23)}:${randomNum(1, 59)}:${randomNum(1, 59)}`);
}

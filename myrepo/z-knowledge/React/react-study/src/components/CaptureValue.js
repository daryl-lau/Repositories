import React from 'react'
const CaptureValue = () => {
    const [temp, setTemp] = React.useState(5);
   
    const log = () => {
      setTimeout(() => {
        console.log("3 秒前 temp = 5，现在 temp =", temp);
      }, 3000);
    };
   
    return (
      <div
        onClick={() => {
          log(); // 第一次点击的时候，此时temp状态是5，则这里打印 3 秒前 temp = 5，现在 temp = 5
                 // 第二次点击的时候，此时，此时状态已经改成了3，则这里打印 3 秒前 temp = 5，现在 temp = 3
          setTemp(3);
        }}
      >
        xyz
      </div>
    );
};

export default CaptureValue
